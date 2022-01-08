import React from 'react'
import { connect } from 'react-redux'

import SongForm from './SongForm'

import { editSong, fetchSongs, fetchSong, deleteSong } from '../../actions/songActions'
import { stopPlaylist, toggleVisibility } from '../../actions/playlistActions'
import MyLoader from '../MyLoader'
import { onlyUnique } from '../../util'


class SongEdit extends React.Component {
    state = {
        loaded: false,
        colors: [],
    }

    componentDidMount() {
        this.props.fetchSong(this.props.match.params.id)
        this.props.fetchSongs()
        this.props.stopPlaylist()
        if (this.props.plVisible) {
            this.props.toggleVisibility()
        }
    }

    componentDidUpdate() {
        if (!this.state.loaded && this.props.songs.length > 1) {
            this.setState({ loaded: true, colors: this.props.songs.map(song => song.color).filter(onlyUnique)})
        }
    }

    render() {
        if (!this.props.song) {
            return <MyLoader />
        }
        const song = this.props.song
        return (
            <div className="ui container">
                <h2 className="ui header">
                    Ének szerkesztése
                </h2>
                <SongForm
                    onSubmit={(formValues) => this.props.editSong(this.props.match.params.id, formValues)}
                    initialValues={{id: song.id, title: song.title, lyrics: song.verses.join('\n\n'), desc: song.desc, color: song.color ? song.color : ''}}
                    edit id={song.id} onDeleteClick={() => this.props.deleteSong(this.props.match.params.id)} colors={this.state.colors}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        song: state.songs[ownProps.match.params.id],
        songs: Object.values(state.songs),
        plVisible: state.playlist.visible,
    }
}

export default connect(mapStateToProps, { editSong, fetchSongs, fetchSong, stopPlaylist, toggleVisibility, deleteSong })(SongEdit)