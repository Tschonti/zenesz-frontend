import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { isMobileOnly } from 'react-device-detect'

import '../../styles.css'

import { fetchSong } from '../../actions/songActions'
import { addToPlaylist, toggleVisibility } from '../../actions/playlistActions'
import { removeAlert } from '../../actions/alertActions'

import MyLoader from '../MyLoader'
import MyButton from '../MyButton'
import Page from '../Page'
import MyTooltip from '../MyTooltip'
import { BASE_URL, mod } from '../../util'

const SMALL_FONT_SIZE = 18
const BIG_FONT_SIZE = 60
const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'H']

class SongShow extends React.Component {
    state = {
        fontSize: SMALL_FONT_SIZE,
        deleteModalActive: false,
        deletePassword: '',
        oneVerseModeActive: false,
        currentVerse: 0,
        showButtons: !isMobileOnly,
        twoColumnMode: false,
        showDesc: false,
        tuneOffset: 0,
    }

    componentDidMount() {
        this.props.removeAlert()
        this.props.fetchSong(this.props.match.params.id)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.song && this.props.song) {
            if (prevProps.song.id !== this.props.song.id) {
                this.setState({ currentVerse: 0})
            }
        }
    }

    handleKeyDown = (e) => {
        switch(e.code) {
            case 'ArrowRight':
                this.handleVerseChange(true)
                break
            case 'ArrowLeft':
                this.handleVerseChange(false)
                break
            default:
        }
    }

    onSizeChange = (increase) => {
        if (increase && this.state.fontSize < 70) {
            this.setState({fontSize: this.state.fontSize + 3})
        } else if (!increase && this.state.fontSize > 8) {
            this.setState({fontSize: this.state.fontSize - 3})
        }
    }

    onTune = (offset) => {
        this.setState({ tuneOffset: mod((this.state.tuneOffset + offset), NOTES.length)})
    }

    resetTune = () => {
        this.setState({ tuneOffset: 0 })
    }

    onDescChange = () => {
        this.setState({ showDesc: !this.state.showDesc})
    }

    handleModeSwitch = () => {
        if (this.state.oneVerseModeActive) {
            this.setState({oneVerseModeActive: false, fontSize: SMALL_FONT_SIZE})
        } else {
            this.setState({oneVerseModeActive: true, fontSize: BIG_FONT_SIZE})
        }
    }

    handleVerseChange = forward => {
        if (forward) {
            this.setState({currentVerse: (this.state.currentVerse + 1) % this.props.song.verses.length})
        } else {
            if (this.state.currentVerse === 0) {
                this.setState({currentVerse: (this.props.song.verses.length - 1)})
            } else {
                this.setState({currentVerse: (this.state.currentVerse - 1) % this.props.song.verses.length})
            }
        }
    }

    handleFontSizeReset = () => {
        if (this.state.oneVerseModeActive) {
            this.setState({ fontSize: BIG_FONT_SIZE })
        } else {
            this.setState({ fontSize: SMALL_FONT_SIZE })
        }
    }

    onPlaylistAdd = () => {
        this.props.addToPlaylist(parseInt(this.props.match.params.id))
        if (!this.props.plVisible) {
            this.props.toggleVisibility()
        }
    }

    renderLine = (line, idx) => {
        const numberOfSpaces = (line.match(/ {3}/g) || []).length
        if (numberOfSpaces === 0) {
            return <span key={idx}>{line}<br/></span>
        }
        if (this.state.tuneOffset === 0) {
            return <span className="blue" key={idx}>{line}<br/></span>
        }
        let newLine = ''
        let i = 0
        let skipSpace = false
        while (i < line.length) {
            if (/^[A-Z]$/.test(line[i])) {
                let note = line[i]
                if (line[i + 1] === '#' || line[i + 1] === 'b') {
                    note = line[i] + line[i + 1]
                    i++
                }
                const newNote = NOTES[mod((NOTES.indexOf(note) + this.state.tuneOffset), NOTES.length)]
                if (newNote.length > 1) {
                    skipSpace = true
                } else {
                    skipSpace = false
                }
                newLine = newLine + newNote
                i++
            } else {
                if (line[i] === ' ' && skipSpace){
                    skipSpace = false
                } else {
                    newLine = newLine + line[i]
                }
                i++
            }
        }
        return <span className="blue" key={idx}>{newLine}<br/></span>
    }

    renderVerse = (verse, idx) => {
        const lines = verse.split('\n').map((line, idx) => this.renderLine(line, idx))
        return (
            <p style={{fontSize: `${this.state.fontSize}px`}} className="my-p" key={idx}>
                {lines}
            </p>
        )
    }

    renderTransposeButtons = () => (
    <>
        <div className="next-to">
            <MyButton tip="Transzponálás -" color="orange" onClick={() => this.onTune(-1)} icons={["music note", "arrow down" ]} />
            <MyButton tip="Transzponálás +" color="orange" onClick={() => this.onTune(1)} icons={["music note", "arrow up" ]} />
            <MyButton tip="Transzponálás visszaállítása" color="orange" onClick={() => this.resetTune()} icons={["music note", "undo" ]} />
        </div>
        {this.state.tuneOffset !== 0 && <p>Transzponálás: {this.state.tuneOffset > NOTES.length / 2 ? -(NOTES.length - this.state.tuneOffset) : this.state.tuneOffset}</p>}
    </>
    )

    renderVerses = () => {
        if (!this.state.oneVerseModeActive) {
            if (this.state.twoColumnMode) {
                const firstColumn = this.props.song.verses.map((verse, idx) => {
                    if (idx + 1 <= Math.ceil(this.props.song.verses.length / 2)) {
                        return this.renderVerse(verse, idx)
                    } else {
                        return null
                    }
                })
                const secondColumn = this.props.song.verses.map((verse, idx) => {
                    if (idx + 1 > Math.ceil(this.props.song.verses.length / 2)) {
                        return this.renderVerse(verse, idx)
                    } else {
                        return null
                    }
                })
                return (
                    <>
                        <div className="ui container grid nowrap roboto">
                            <div className="eight wide column">
                                {firstColumn}
                            </div>
                            <div className="eight wide column nowrap roboto">
                                {secondColumn}
                            </div>
                        </div>
                        {this.renderTransposeButtons()}
                    </>

                )
            } else {
                return (
                    <>
                        <div className="ui container nowrap roboto"> {this.props.song.verses.map((verse, idx) => {
                            return this.renderVerse(verse, idx)
                        })}
                        </div>
                        {this.renderTransposeButtons()}
                    </>

                )
            }
        }
        if (!this.props.song.verses[this.state.currentVerse]) {
            return <MyLoader />
        }
        const lines = this.props.song.verses[this.state.currentVerse].split('\n').map((line, idx) => this.renderLine(line, idx))
        return (
            <div>
                <p style={{fontSize: `${this.state.fontSize}px`}}>
                    {lines}
                </p>
            </div>
        )

    }

    renderButtons = () => {
        const editButton = this.props.signedIn ? <Link data-tip="Ének szerkeztése vagy törlése" className="ui button my-button icon yellow" to={`${BASE_URL}/songs/edit/${this.props.match.params.id}`}><i className="icon edit"></i></Link> : null
        const descButton = this.props.song.desc ? <MyButton tip="Megjegyzés megjelenítése" color="olive" onClick={() => this.onDescChange()} icons={["sticky note outline" ]} /> : null
        const desktopButton = !isMobileOnly && this.state.showButtons ? /*(
            <>
                <MyButton tip="Előző versszak" disabled={!this.state.oneVerseModeActive} color="teal" onClick={() => this.handleVerseChange(false)} icons={[" step backward icon" ]} />
                <MyButton tip="Egyversszak mód be- és kikapcsolása" color="green" onClick={this.handleModeSwitch} icons={["play" ]} />
                <MyButton tip="Következő vesszak" disabled={!this.state.oneVerseModeActive} color="teal" onClick={() => this.handleVerseChange(true)} icons={[" step forward icon" ]} />
                <MyButton tip="Betűméret visszaállítása" color="primary" onClick={this.handleFontSizeReset} icons={["font", "undo" ]} />
            </>
        )*/null : null
        const optionalButtons = this.state.showButtons ? (
            <>
                <Link data-tip="Vissza a kereséshez" className="ui button my-button icon grey" to={BASE_URL}><i className="icon search"></i></Link>
                {editButton}
                <MyButton tip={`${this.state.twoColumnMode ? "Egy" : "Két"} hasáb`} color="primary" onClick={() => this.setState({twoColumnMode: !this.state.twoColumnMode})} disabled={this.state.oneVerseModeActive} icons={[`${this.state.twoColumnMode ? 'align justify' : 'columns'}`]} />
                {descButton}
                <MyButton tip="Betűméret csökkentése" color="primary" onClick={() => this.onSizeChange(false)} icons={["font", "arrow down" ]} />
                <MyButton tip="Betűméret növelése" color="primary" onClick={() => this.onSizeChange(true)} icons={["font", "arrow up " ]} />
                <MyButton tip="Hozzáadás a lejátszási listához" color="green" onClick={this.onPlaylistAdd } icons={["plus" ]} />
                <MyButton color="green" onClick={this.props.toggleVisibility} icons={["play circle"]} text=" Lejátszási lista"/>
            </>
        ) : null
        return (
            <>
                {optionalButtons}
                {desktopButton}
            </>
        )
    }

    renderTitle = () => {
        if (isMobileOnly) {
            return (
                <>
                    {this.renderButtons()}
                    <div className="right-left">
                        <div>
                            <h2 className="vert-centered">{this.props.song.id}. {this.props.song.title} </h2>
                            <div style={{marginLeft:'10px', height: '30px', width: '30px', borderRadius: '100%', backgroundColor: '#' + this.props.song.color}}></div>
                        </div>
                        <MyButton color="gray" onClick={()=>this.setState({showButtons: !this.state.showButtons})} icons={["bars"]} tip="Gombok elrejtése/előhozása"/>
                    </div>
                    <div className="ui divider"></div>
                </>
            )
        }
        return (
            <>
                <div className="right-left m-top">
                <div className='next-to'>
                            <h2 className="vert-centered">{this.props.song.id}. {this.props.song.title} </h2>
                            <div style={{marginLeft:'10px', height: '30px', width: '30px', borderRadius: '100%', backgroundColor: '#' + this.props.song.color}}></div>
                        </div>
                    <h2 className="vert-centered">{this.state.oneVerseModeActive ? `${this.state.currentVerse + 1}/${this.props.song.verses.length}` : ''}</h2>
                    <div>
                        <MyButton color="gray" onClick={()=>this.setState({showButtons: !this.state.showButtons})} icons={["bars"]} tip="Gombok elrejtése/előhozása"/>
                        {this.renderButtons()}
                    </div>
                </div>
                <div className="ui divider"></div>
            </>

        )
    }


    renderDesc = () => {
        const lines = this.props.song.desc.split('\n').map((line, idx) => <span key={idx}>{line}<br/></span>)
        return this.state.showDesc ? (
                <div className="comment">
                    <div className="right-left">
                        <h3>Megjegyzések</h3>
                        <i className="red icon close pointer" onClick={() => this.setState({showDesc: false})}></i>
                    </div>
                    <p>{lines}</p>
                </div>
            ) : null
    }

    render() {
        if (this.props.song) {
            return (
                <Page path={this.props.location.pathname}>
                    <MyTooltip />
                    <div className="ui container" onKeyDown={this.handleKeyDown}>
                            {this.renderTitle()}
                            {this.renderVerses()}
                            {this.renderDesc()}
                    </div>
                </Page>
            )
        }
        return <MyLoader />
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        song: state.songs[ownProps.match.params.id],
        plVisible: state.playlist.visible,
        signedIn: state.auth.signedIn
    }
}

export default connect(mapStateToProps, { fetchSong, removeAlert, addToPlaylist, toggleVisibility })(SongShow)