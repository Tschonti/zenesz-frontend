import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import { connect } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'

import '../styles.css'
import { removeAlert } from '../actions/alertActions'
import { logout } from '../actions/authActions'
import { BASE_URL } from '../util'


const Header = (props) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const alert = props.alert.msg ?
        <Alert onClose={() => {props.removeAlert()}} severity={props.alert.type} >
            {props.alert.msg}
        </Alert>
        : null
        const authLink = props.signedIn
        ? <p className="item header-link" onClick={() => {props.logout();setMenuOpen(!menuOpen)}}>Kijelentkezés</p>
        : <Link to={`${BASE_URL}/login`} className="item header-link" onClick={() => setMenuOpen(!menuOpen)}>Admin bejelentkezés</Link>

    const newSong = props.signedIn ? <Link to={`${BASE_URL}/songs/new`} className="item header-link" onClick={() => setMenuOpen(false)}>Új ének</Link> : null

    if (isMobileOnly) {
        return (
            <div className="ui secondary vertical menu my-mobile-header">
                <div className="right-left">
                    <Link to={`${BASE_URL}`} className="item" onClick={() => setMenuOpen(false)}>
                        <h2>ÖKGY akkordos dicsik</h2>
                    </Link>
                    <div className='vert-centered'>
                        <i className="icon bars" onClick={() => setMenuOpen(!menuOpen)}></i>
                    </div>
                </div>
                {menuOpen && (
                    <div >
                        <Link to={`${BASE_URL}`} className="item header-link" onClick={() => setMenuOpen(false)}>Énekek listája</Link>
                        {newSong}
                        <Link to={`${BASE_URL}/playlists`} className="item header-link" onClick={() => setMenuOpen(false)}>Lejátszási listák</Link>
                        {authLink}
                    </div>
                )}
                <div className="centered">
                    {alert}
                </div>
            </div>
        )
    }
    return (
        <div className="ui secondary pointing menu my-header">
            <Link to={`${BASE_URL}`} className="item ">
                <h2>ÖKGY akkordos dicsik</h2>
            </Link>
            <Link to={`${BASE_URL}`} className="item header-link">Énekek listája</Link>
            {newSong}
            <Link to={`${BASE_URL}/playlists`} className="item header-link">Lejátszási listák</Link>
            <div className="centered">
                {alert}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        alert: state.alert,
        signedIn: state.auth.signedIn
    }
}

export default connect(mapStateToProps, { removeAlert, logout })(Header)