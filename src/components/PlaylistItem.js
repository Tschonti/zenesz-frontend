import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { moveInPlaylist, removeFromPlaylist, playlistStep } from '../actions/playlistActions'
import { BASE_URL } from '../util'

const PlaylistItem = props => {
    const upDisabled = props.idx === 0
    const downDisabled = props.idx === props.length - 1
    const handleClick = () => {
        if (props.playlist) {
            props.playlistStep(props.idx)
        }
    }

    if (props.song) {
        return (
            <div className={`item my-item ${props.currentIndex === props.idx ? 'activeInPlaylist' : ''}`}>
                <h5 className="header">
                    {!props.unmodifiable && (
                        <>
                            <i className={`${upDisabled ? 'grey' : 'pointer'} icon caret up bigger-icon`} onClick={() => props.moveInPlaylist(props.idx, true, props.playlistId)}></i>
                            <i className={`${downDisabled ? 'grey' : 'pointer'} icon caret down bigger-icon`} onClick={() => props.moveInPlaylist(props.idx, false, props.playlistId)}></i>
                        </>
                    )}
                    <Link to={`${BASE_URL}/songs/${props.song.id}`} onClick={handleClick} className="notLinkStyle pointer">{props.song.id}. {props.song.title}</Link>

                    {!props.unmodifiable && (
                        <div className="right floated">
                            <i className="icon minus circle red pointer" onClick={() => props.removeFromPlaylist(props.song.id, props.playlistId)}></i>
                        </div>
                    )}
                </h5>
            </div>
        )
    } else {
        return (
            <div className={'item my-item redBackground'}>
                Ez a dal a zenészben nem található!
            </div>
        )
    }


}

export default connect(null, {moveInPlaylist, removeFromPlaylist, playlistStep})(PlaylistItem)