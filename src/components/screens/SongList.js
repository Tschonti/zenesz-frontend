import React from 'react'
import { connect }  from 'react-redux'
import _ from 'lodash'
import { isMobileOnly } from 'react-device-detect'
import { Link } from 'react-router-dom'

import '../../styles.css'
import { sortSongs, onlyUnique, BASE_URL } from '../../util'

import MyTooltip from '../MyTooltip'
import Page from '../Page'
import MyLoader from '../MyLoader'
import SearchBar from '../SearchBar'
import MyButton from '../MyButton'

import { fetchSongs,  searchSongs, findId, cancelSearch } from '../../actions/songActions'
import { addToPlaylist, removeFromPlaylist, playlistNext, stopPlaylist, toggleVisibility } from '../../actions/playlistActions'
import { removeAlert } from '../../actions/alertActions'

class SongList extends React.Component {
    state = {
        loaded: false,
        sortById: true,
        colors: [],
    }
    componentDidMount() {
        this.props.removeAlert()
        this.props.fetchSongs()
        this.props.stopPlaylist()
    }

    componentDidUpdate() {
        if (!this.state.loaded && !_.isEmpty(this.props.songs)) {
            this.setState({ colors: this.props.songs.map(song => song.color).filter(onlyUnique), loaded: true})
        }
    }

    addToPlaylist = (event, id) => {
        event.preventDefault()
        this.props.addToPlaylist(id)
        event.stopPropagation()
    }
    removeFromPlaylist = (event, id) => {
        event.preventDefault()
        this.props.removeFromPlaylist(id)
        event.stopPropagation()
    }

    renderSmallButtons = song => {
        const modifiable = !this.props.playlist.loaded || this.props.signedIn
        if ((this.props.playlist.visible || isMobileOnly) && modifiable) {
            return this.props.playlist.songs.includes(song.id) ? (
                <i
                    data-tip="Eltávolítás a lejátszási listáról"
                    className="icon bigger-icon minus circle red"
                    onClick={(e) => this.removeFromPlaylist(e, song.id)}>
                </i>
            ) : (
                <i
                    data-tip="Hozzáadás a lejátszási listához"
                    className="icon bigger-icon plus circle green"
                    onClick={(e) => this.addToPlaylist(e, song.id)}>
                </i>
            )
        }
    }

    renderSong = (song, idx) => (
        <div style={{ backgroundColor: '#' + song.color }} className={`column pointer hover-grey my-bottom-border ${idx % 3 !== 0 && !isMobileOnly ? 'left-border' : ''}`} key={song.id} >
            <Link to={`${BASE_URL}/songs/${song.id}`} className="notLinkStyle">
                <div className="content right-left">
                    <div className='next-to'>
                        <h3 className="force-open-sans header my-header-text">{song.id}. {song.title}</h3>
                    </div>
                    {this.renderSmallButtons(song)}
                </div>
            </Link>
        </div>
    )

    render() {
        if (_.isEmpty(this.props.songs) && !this.state.loaded) {
            return (
                <MyLoader />
            )
        }

        if (!this.state.sortById) {
            sortSongs(this.props.songs, 'title')
        } else {
            sortSongs(this.props.songs, 'id')
        }

        const { searchList } = this.props
        let songs = []
        if (searchList.validSearch) {
            songs = searchList.list.map((id, idx) => this.renderSong(this.props.songs.find(song => song.id === id), idx))
        } else {
            songs = this.props.songs.map((song, idx) => this.renderSong(song, idx))
        }

        const empty = songs.length === 0 ? <p className="big-text centered-text">Nincs találat!</p> : null
        return (
            <Page path={this.props.location.pathname}>
                <div className="ui container">
                    <MyTooltip />
                    <div className={`ui ${isMobileOnly ? '' : 'stackable grid'}`}>
                        <div className="twelve wide column">
                            <SearchBar id={this.props.findId} term={this.props.searchSongs} cancel={this.props.cancelSearch} colors={this.state.colors}/>
                        </div>
                        <div className="four wide column ">
                            <div className="centered-container">
                                <MyButton color="blue" onClick={() => this.setState({ sortById: true})} icons={["sort numeric down"]} tip="Énekek rendezése sorszám szerint" disabled={this.state.sortById || this.props.searchList.validSearch}/>
                                <MyButton color="blue" onClick={() => this.setState({ sortById: false})} icons={["sort alphabet down"]} tip="Énekek rendezése cím szerint" disabled={!this.state.sortById || this.props.searchList.validSearch}/>
                                <MyButton color="green" onClick={this.props.toggleVisibility} icons={["play circle"]} text=" Lejátszási lista"/>
                            </div>
                        </div>
                    </div>
                    <div className="ui stackable three column grid">
                        {songs}
                    </div>
                    {empty}
                </div>
            </Page>
        )
    }

}

const mapStateToProps = state => {
    return {
        songs: Object.values(state.songs),
        searchList: state.searchList,
        playlist: state.playlist,
        signedIn: state.auth.signedIn
    }
}

export default connect(mapStateToProps, {
    fetchSongs,
    removeAlert,
    searchSongs,
    findId,
    addToPlaylist,
    removeFromPlaylist,
    playlistNext,
    stopPlaylist,
    cancelSearch,
    toggleVisibility
})(SongList)