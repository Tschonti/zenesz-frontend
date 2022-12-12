import React, { useState, useEffect } from 'react'

import ColorSelector from './ColorSelector'

const SearchBar = props => {
    const [value, setValue] = useState('')
    const [debouncedValue, setDebouncedValue] = useState('')
    const [lyricsToo, setLyricsToo] = useState(false)
    const [chosenColor, setChosenColor] = useState('')

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setDebouncedValue(value)
        }, 350)
        return () => {
            clearTimeout(timeOut)
        }
    }, [value])

    useEffect(() => {
        if (debouncedValue) {
            if (isNaN(debouncedValue)) {
                props.term(debouncedValue, lyricsToo, chosenColor)
            } else {
                props.id(debouncedValue)
            }
        } else {
            if (chosenColor) {
                props.term(debouncedValue, lyricsToo, chosenColor)
            } else {
                props.cancel()
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue])

    useEffect(() => {
        if (value) {
            if (isNaN(value)) {
                props.term(value, lyricsToo, chosenColor)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lyricsToo])

    useEffect(() => {
        props.term(value, lyricsToo, chosenColor)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chosenColor])

    const cancelSearch = () => {
        setValue('')
        setLyricsToo(false)
        setChosenColor('')
        props.cancel()
    }

    return (
        <div className="ui form">
            <div className="inline fields centered-container">
                <div className="ten wide field">
                    <label>Keresés</label>
                    <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Sorszámot vagy teljes szavakat írj"/>
                </div>
                <div className="three wide field">
                    <div className="ui checkbox my-check">
                        <input id="lyricsCheckbox" type="checkbox" tabIndex="0" checked={lyricsToo} onChange={() => setLyricsToo(!lyricsToo)} />
                        <label htmlFor="lyricsCheckbox">dalszövegben is</label>
                    </div>
                </div>
                <div className="three wide field">
                    <ColorSelector val={chosenColor} setter={setChosenColor} defaultText="Minden dal" colors={props.colors} firstDisabled={false} />
                    <i data-tip="Keresés elvetése" className="icon bigger-icon times circle gray pointer" onClick={cancelSearch}></i>
                </div>

            </div>
        </div>
    )
}

export default SearchBar