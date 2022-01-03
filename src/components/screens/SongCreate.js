import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import SongForm from './SongForm'
import MyLoader from '../MyLoader'

import { createSong, fetchSongs } from '../../actions/songActions'
import { stopPlaylist, toggleVisibility,  } from '../../actions/playlistActions'
import { onlyUnique } from '../../util'

class SongCreate extends React.Component {
    state = {
        loaded: false,
        colors: [],
    }

    componentDidMount() {
        this.props.fetchSongs()
        this.props.stopPlaylist()
        if (this.props.plVisible) {
            this.props.toggleVisibility()
        }
    }

    componentDidUpdate() {
        if (!this.state.loaded && !_.isEmpty(this.props.songs)) {
            this.setState({ loaded: true, colors: this.props.songs.map(song => song.color).filter(onlyUnique)})
        }
    }

    render() {
        if (this.props.biggestID > 0) {
            return (
                <div className="ui container">
                    <h2 className="ui header">
                        Új ének felvétele
                    </h2>
                    <SongForm onSubmit={this.props.createSong} initialValues={{ id: this.props.biggestID + 1}} colors={this.state.colors}/>
                </div>
            )
        } else {
            return <MyLoader />
        }
    }
}

const mapStateToProps = state => {
    return {
        plVisible: state.playlist.visible,
        biggestID: Math.max(...Object.values(state.songs).map(song => song.id)),
        songs: Object.values(state.songs),
    }
}

export default connect(mapStateToProps, { createSong, stopPlaylist, toggleVisibility, fetchSongs })(SongCreate)