import React from 'react'
import { connect }  from 'react-redux'
import _ from 'lodash'

import { fetchSongs } from '../actions/songActions'
import { playlistNext,
    startPlaylist,
    clearPlaylist,
    removeFromPlaylist,
    toggleVisibility,
    moveInPlaylist } from '../actions/playlistActions'

import MyButton from './MyButton'
import MyTooltip from './MyTooltip'
import MyModal from './MyModal'


class Playlist extends React.Component {
    state = {
        open: true,
    }

    componentDidMount() {
        this.props.fetchSongs()
    }

    renderSong = (song, idx) => {
        const upDisabled = idx === 0
        const downDisabled = idx === this.props.playlist.list.length - 1
        return (
            <div className={`item my-item ${this.props.playlist.currentIndex === idx ? 'active' : ''}`} key={idx}>
                <h5 className="header">
                    <i className={`${upDisabled ? 'grey' : 'pointer'} icon caret up bigger-icon`} onClick={() => this.props.moveInPlaylist(idx, true)}></i>
                    <i className={`${downDisabled ? 'grey' : 'pointer'} icon caret down bigger-icon`} onClick={() => this.props.moveInPlaylist(idx, false)}></i>
                    {song.id}. {song.title}

                    <div className="right floated">
                        <i className="icon minus circle red pointer" onClick={() => this.props.removeFromPlaylist(song.id)}></i>
                    </div>
                </h5>
            </div>
        )
    }

    renderSongList = () => {
        if (_.isEmpty(this.props.songs) || !this.state.open) {
            return null
        }
        const list = this.props.playlist.list.map((songId, idx) => {
            const song = this.props.songs.find(el => el.id === songId)
            return song ? this.renderSong(song, idx) : null
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
    onClear = () => {
        this.props.clearPlaylist()
        this.props.toggleVisibility()
    }

    onClose = (e) => {
        this.props.toggleVisibility()
        e.stopPropagation()
    }

    render() {
        //TODO dupla tool-tip
        if (!this.props.playlist.visible) {
            return null
        }

        const currentIndex = this.props.playlist.list.length === 0 ? 0 : this.props.playlist.currentIndex + 1
        const extraButtons = this.state.open ? (
            <div className="right-left pointer" onClick={() => this.setState({open: !this.state.open})}>
                <i className={`icon ${this.state.open ? 'minus' : 'plus'}`}></i>
                <i className="red icon close" onClick={this.onClose}></i>
            </div>
        ) : null
        return (
            <>
                <div className="playlist-container">
                    <MyTooltip />
                    <div className="right-left pointer" onClick={() => this.setState({open: !this.state.open})}>
                        <h3>Lejátszási lista {`${currentIndex}/${this.props.playlist.list.length}`}</h3>
                        <div>
                            <i className={`icon ${this.state.open ? 'minus' : 'plus'}`}></i>&nbsp;&nbsp;
                            <i className="red icon close" onClick={this.onClose}></i>
                        </div>
                    </div>
                    <div className="centered-container">
                        <MyButton disabled={!this.props.playlist.active} tip="Előző ének" color="blue" onClick={() => this.props.playlistNext(false, this.props.playlist)} icons={["backward"]} />
                        <MyButton disabled={this.props.playlist.active || this.props.playlist.list.length === 0} tip="Lejátszási lista indítása" color="green" onClick={() => this.props.startPlaylist(this.props.playlist)} icons={["play"]} />
                        <MyButton disabled={!this.props.playlist.active} tip="Következő ének" color="blue" onClick={() => this.props.playlistNext(true, this.props.playlist)} icons={["forward"]} />
                        <MyModal
                            header="Biztosan törlöd a lejátszási listát?"
                            content={'Biztosan törlöd a lejátszási listát? Ezt később nem tudod visszavonni!'}
                            closeText={'Mégse'}
                            approveText={'Törlés'}
                            onApprove={this.onClear}
                        >
                            <MyButton disabled={this.props.playlist.list.length === 0} tip="Lejátszási lista törlése" color="negative" icons={["trash alternate"]} />
                        </MyModal>
                    </div>
                    {this.renderSongList()}
                    {extraButtons}
                </div>
            </>

        )
    }
}

const mapStateToProps = state => {
    return {
        songs: Object.values(state.songs),
        playlist: state.playlist
    }
}

export default connect(mapStateToProps, {
    fetchSongs,
    playlistNext,
    startPlaylist,
    clearPlaylist,
    removeFromPlaylist,
    toggleVisibility,
    moveInPlaylist
})(Playlist)