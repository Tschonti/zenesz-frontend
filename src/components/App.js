import React from 'react'
import { connect }  from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import { Cookies } from 'react-cookie'

import SongList from './screens/SongList'
import SongCreate from './screens/SongCreate'
import SongEdit from './screens/SongEdit'
import SongShow from './screens/SongShow'
import Login from './screens/Login'
import PlaylistList from './screens/PlaylistList'

import Footer from './Footer'
import Header from './Header'
import Playlist from './Playlist'

import history from '../history'
import { loadPlaylist, recoverState} from '../actions/playlistActions'
import { loginFromCookie } from '../actions/authActions'
import { BASE_URL } from '../util'


class App extends React.Component {
    componentDidMount() {
        const c = new Cookies()
        const dicsiCookie = c.get('dicsiToken')
        const zeneszCookie = c.get('zeneszToken')
        if (dicsiCookie && zeneszCookie) {
            this.props.loginFromCookie(dicsiCookie, zeneszCookie)
        }
        this.props.recoverState()
    }

    render() {
        return (
            <div>
                <Router history={history}>
                    <Header />
                    <Switch>
                        <Route path={`${BASE_URL}/`} exact component={SongList} />
                        <Route path={`${BASE_URL}/songs/new`} exact component={SongCreate} />
                        <Route path={`${BASE_URL}/songs/edit/:id`} exact component={SongEdit} />
                        <Route path={`${BASE_URL}/songs/:id`} exact component={SongShow} />
                        <Route path={`${BASE_URL}/login`} exact component={Login} />
                        <Route path={`${BASE_URL}/playlists`} exact component={PlaylistList} />
                        <Route path={`${BASE_URL}/playlists/:id`} exact render={({match}) => {
                            this.props.loadPlaylist(match.params.id, true)
                            history.push(BASE_URL)
                        }} />
                    </Switch>
                    <Footer />
                    <Playlist />
                </Router>
            </div>
        )
    }
}

export default connect(null, { loadPlaylist, recoverState, loginFromCookie })(App)