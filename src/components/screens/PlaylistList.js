import React from 'react'
import { connect } from 'react-redux'
import { Accordion, Icon } from 'semantic-ui-react'
import _ from 'lodash'
import { isMobileOnly } from 'react-device-detect'

import { fetchSongs } from '../../actions/songActions'
import { fetchPlaylists, loadPlaylist, clearPlaylist } from '../../actions/playlistActions'
import MyLoader from '../MyLoader'
import MyTooltip from '../MyTooltip'
import MyModal from '../MyModal'
import PlaylistItem from '../PlaylistItem'
import MyButton from '../MyButton'
import { newAlert } from '../../actions/alertActions'

class PlaylistList extends React.Component {
    state = {
        activePlaylist: -1,
    }

    componentDidMount() {
        this.props.fetchSongs()
        this.props.fetchPlaylists()
    }

    handleClick(idx) {
        this.setState({ activePlaylist: this.state.activePlaylist === idx ? -1 : idx })
    }

    copyLink(id) {
        navigator.clipboard.writeText(`https://okgy.hu/dicsi/playlists/${id}`)
        this.props.newAlert('A lejátszási lista linkje a vágólapra másolva', 'success')
    }

    generateDateAdded(date) {
        return (
            <p>Létrehozva: {new Date(Date.parse(date)).toLocaleDateString('hu-HU')}</p>
        )
    }

    render() {
        if (this.props.playlistList.loaded) {
            return (
                <div className="ui container">
                    <MyTooltip />
                    <h2>Lejátszási listák</h2>
                    {(this.props.playlistList.list && this.props.playlistList.list.length > 0 && !_.isEmpty(this.props.songs)) ? (
                    <Accordion fluid styled>
                        {this.props.playlistList.list.map(playlist => (
                            <div key={playlist.id}>
                                <Accordion.Title
                                    active={this.state.activePlaylist === playlist.id}
                                    onClick={() => this.handleClick(playlist.id)}
                                >
                                    <div className='right-left'>
                                        <h3>
                                            <Icon name='dropdown' />
                                            {playlist.name}
                                        </h3>
                                        { !isMobileOnly && this.generateDateAdded(playlist.created_at) }
                                    </div>
                                </Accordion.Title>
                                <Accordion.Content active={this.state.activePlaylist === playlist.id}>
                                    { isMobileOnly && this.generateDateAdded(playlist.created_at) }
                                    <MyButton tip="Betöltés" color="green" onClick={() => this.props.loadPlaylist(playlist.id, true)} icons={["play circle"]} />
                                    <MyButton tip="Megosztás" color="purple" onClick={() => this.copyLink(playlist.id)} icons={["share alternate"]} />
                                    <MyButton tip="Duplikálás" color="blue" onClick={() => this.props.loadPlaylist(playlist.id, false)} icons={["copy"]} />
                                    {this.props.signedIn && (
                                        <MyModal
                                            header="Biztosan törlöd a lejátszási listát?"
                                            generateTrigger={() => <MyButton tip="Törlés" color="red" icons={["trash alternate"]} />}
                                            closeText="Mégse"
                                            approveText="Törlés"
                                            onApprove={() => this.props.clearPlaylist(playlist.id)}
                                            negative
                                            id={playlist.id}
                                        >
                                            Biztosan törlöd a lejátszási listát az adatbázisból? Ezt később nem tudod visszavonni! 
                                        </MyModal>
                                    )}
                                    <div className="ui relaxed divided ordered list">
                                        {playlist.songs.length > 0 ? playlist.songs.map((songId, idx) => (
                                            <PlaylistItem key={idx} song={this.props.songs[songId]} idx={idx} length={playlist.songs.length} unmodifiable={!this.props.signedIn} />
                                        )) : <p className="centered-text">A lejátszási lista üres</p>}
                                    </div>
                                </Accordion.Content>
                            </div>
                        ))}
                    </Accordion>
                    ) : (
                        <p className="big-text centered-text">Nincs találat!</p>
                    )}
                </div>
            )
        }
        return <MyLoader />
    }
}

const mapStateToProps = (state) => {
    return {
        songs: state.songs,
        playlistList: state.playlistList,
        signedIn: state.auth.signedIn,
    }
}

export default connect(mapStateToProps, {fetchPlaylists, fetchSongs, loadPlaylist, newAlert, clearPlaylist})(PlaylistList)