import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import SongList from './screens/SongList'
import SongCreate from './screens/SongCreate'
import SongEdit from './screens/SongEdit'
import SongShow from './screens/SongShow'
import Login from './screens/Login'

import Footer from './Footer'
import Header from './Header'
import Playlist from './Playlist'

import history from '../history'


const App = () => {
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
                </Switch>
                <Footer />
                <Playlist />
            </Router>
        </div>
    )
}


export default App