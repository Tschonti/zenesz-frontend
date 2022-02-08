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


class App extends React.Component {
    componentDidMount() {
        const c = new Cookies()
        const tokenCookie = c.get('token')
        if (tokenCookie) {
            this.props.loginFromCookie(tokenCookie)
        }
        this.props.recoverState()
    }

    render() {
        return (
            <div>
                <Router history={history}>
                    <Header />
                    <Switch>
                        <Route path="/zenesz/" exact component={SongList} />
                        <Route path="/zenesz/songs/new" exact component={SongCreate} />
                        <Route path="/zenesz/songs/edit/:id" exact component={SongEdit} />
                        <Route path="/zenesz/songs/:id" exact component={SongShow} />
                        <Route path="/zenesz/login" exact component={Login} />
                        <Route path="/zenesz/playlists" exact component={PlaylistList} />
                        <Route path="/zenesz/playlists/:id" exact render={({match}) => {
                            this.props.loadPlaylist(match.params.id, true)
                            history.push('/zenesz/')
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