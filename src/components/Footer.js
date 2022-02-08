import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import '../styles.css'
import { logout } from '../actions/authActions'

const Footer = (props) => {

    const authLink = props.signedIn
    // eslint-disable-next-line
    ? <a className="header-link pointer" onClick={() => props.logout()}>Kijelentkezés</a>
    : <Link to="/zenesz/login" className="header-link centered-text">Admin bejelentkezés</Link>

    return (
        <div className="footer-container centered-container two-column small-text">
            <p className="centered-text">Készítette: Fekete Sámuel&nbsp;
            <a target="_blank" rel="noreferrer" href="https://github.com/Tschonti/zenesz-frontend"><i aria-label="Forráskód a Github-on" className="icon github"></i></a><br/>&nbsp;az&nbsp;
            <a target="_blank" rel="noreferrer" href="https://okgy.hu/">Örömhír Keresztény Gyülekezet</a> számára</p>
            {authLink}
        </div>
    )
}

const mapStateToProps = state => {
    return { signedIn: state.auth.signedIn }
}

export default connect(mapStateToProps, { logout })(Footer)