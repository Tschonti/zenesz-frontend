import React from 'react'
import { connect }  from 'react-redux'
import _ from 'lodash'

import { fetchSongs } from '../actions/songActions'
import {
    playlistNext,
    startPlaylist,
    clearPlaylist,
    removeFromPlaylist,
    toggleVisibility,
    moveInPlaylist,
    savePlaylist,
    unloadPlaylist,
} from '../actions/playlistActions'
import { newAlert } from '../actions/alertActions'

import MyButton from './MyButton'
import MyTooltip from './MyTooltip'
import MyModal from './MyModal'
import PlaylistItem from './PlaylistItem'
import PlaylistForm from './PlaylistForm'

class Playlist extends React.Component {
    state = {
        open: true,
    }

    componentDidMount() {
        this.props.fetchSongs()
    }

    renderSongList = (modifiable) => {
        if (_.isEmpty(this.props.songs) || !this.state.open || !this.props.playlist.songs) {
            return null
        }
        const list = this.props.playlist.songs.map((songId, idx) => {
            const song = this.props.songs.find(el => el.id === songId)
            return <PlaylistItem key={idx} song={song} idx={idx} length={this.props.playlist.songs.length} currentIndex={this.props.playlist.currentIndex} unmodifiable={!modifiable} playlist playlistId={this.props.playlist.loaded} />
        })

        const empty = list.length > 0 ? '' : (<p className="centered-text">A lejátszási lista üres</p>)
        return (
            <>
                <div className="ui relaxed divided ordered list">
                    {list}
                </div>
                {empty}
            </>
        )
    }

    onClose = (e) => {
        this.props.toggleVisibility()
        e.stopPropagation()
    }

    copyLink(id) {
        navigator.clipboard.writeText(`https://okgy.hu/dicsi/playlists/${id}`)
        this.props.newAlert('A lejátszási lista linkje a vágólapra másolva', 'success')
    }

    render() {
        //TODO dupla tool-tip
        if (!this.props.playlist.visible || !this.props.playlist.songs) {
            return null
        }

        const currentIndex = this.props.playlist.songs.length === 0 ? 0 : this.props.playlist.currentIndex + 1
        const extraButtons = this.state.open ? (
            <div className="right-left pointer" onClick={() => this.setState({open: !this.state.open})}>
                <i className={`icon ${this.state.open ? 'minus' : 'plus'}`}></i>
                <i className="red icon close" onClick={this.onClose}></i>
            </div>
        ) : null
        const modifiable = !this.props.playlist.loaded || this.props.signedIn
        return (
            <>
                <div className="playlist-container">
                    <MyTooltip />
                    <div className="right-left pointer" onClick={() => this.setState({open: !this.state.open})}>
                        <h3>{this.props.playlist.loaded ? this.props.playlist.loadedName : 'Lejátszási lista'} {`${currentIndex}/${this.props.playlist.songs.length}`}</h3>
                        <div>
                            <i className={`icon ${this.state.open ? 'minus' : 'plus'}`}></i>&nbsp;&nbsp;
                            <i className="red icon close" onClick={this.onClose}></i>
                        </div>
                    </div>
                    <div className="centered-container">
                    {this.props.signedIn && !this.props.playlist.loaded && (
                            <PlaylistForm onSubmit={(formData) => this.props.savePlaylist(formData)} disabled={this.props.playlist.songs.length === 0} />
                        )}
                        {this.props.playlist.loaded ? (
                            <>
                                <MyButton tip="Üres listára váltás" color="orange" onClick={this.props.unloadPlaylist} icons={["file outline"]} />
                                <MyButton tip="Megosztás" color="purple" onClick={() => this.copyLink(this.props.playlist.loaded )} icons={["share alternate"]} />
                            </>

                        ) : (
                            <MyModal
                                header="Biztosan törlöd a lejátszási listát?"
                                generateTrigger={() => <MyButton disabled={this.props.playlist.songs.length === 0 && !this.props.playlist.loaded} tip="Lejátszási lista törlése" color="negative" icons={["trash alternate"]} />}
                                closeText="Mégse"
                                approveText="Törlés"
                                onApprove={this.props.clearPlaylist}
                                negative
                                id={1}
                            >
                                Biztosan üríted a lejátszási listát? Ezt később nem tudod visszavonni!
                            </MyModal>
                        )}
                        <MyButton disabled={!this.props.playlist.active} tip="Előző ének" color="blue" onClick={() => this.props.playlistNext(false, this.props.playlist)} icons={["backward"]} />
                        <MyButton disabled={this.props.playlist.active || this.props.playlist.songs.length === 0} tip="Lejátszási lista indítása" color="green" onClick={() => this.props.startPlaylist(this.props.playlist)} icons={["play"]} />
                        <MyButton disabled={!this.props.playlist.active} tip="Következő ének" color="blue" onClick={() => this.props.playlistNext(true, this.props.playlist)} icons={["forward"]} />
                    </div>
                    {this.renderSongList(modifiable)}
                    {extraButtons}
                </div>
            </>

        )
    }
}

const mapStateToProps = state => {
    return {
        songs: Object.values(state.songs),
        playlist: state.playlist,
        signedIn: state.auth.signedIn
    }
}

export default connect(mapStateToProps, {
    fetchSongs,
    playlistNext,
    startPlaylist,
    clearPlaylist,
    removeFromPlaylist,
    toggleVisibility,
    moveInPlaylist,
    savePlaylist,
    unloadPlaylist,
    newAlert,
})(Playlist)