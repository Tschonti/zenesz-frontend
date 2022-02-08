import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { isMobileOnly } from 'react-device-detect'

import MyTooltip from '../MyTooltip'
import MyModal from './../MyModal'
import ColorSelector from './../ColorSelector'

const renderInput = ({ input, label, meta, type, disabled, wide, tip }) => {
    return (
        <div className={`${wide} field ${meta.error && meta.touched ? 'error' : ''}`}>
            <label>{label}</label>
            <input {...input} type={type} autoComplete="off" disabled={disabled} data-tip={tip} />
            {renderError(meta)}
        </div>
    )
}

const renderColorPicker = ({ type, disabled, val, setter, change }) => (
    <input value={val} type={type} autoComplete="off" disabled={disabled} id="colorPicker" onChange={(e) => {setter(e.target.value); change('color', e.target.value)}} />
)

const renderTextArea = ({ input, label, meta, tip, rows }) => {
    return (
        <div className={`field ${meta.error && meta.touched ? 'error' : ''}`}>
            <label>{label}</label>
            <textarea className="roboto" {...input} autoComplete="off" data-tip={tip} rows={rows}/>
            {renderError(meta)}
        </div>
    )
}

const renderError = ({ error, touched }) => {
    if (touched && error) {
        return (
            <div className="ui error message">
                <div className="header">
                    {error}
                </div>
            </div>
        )
    }
}

const SongForm = props => {
    const onSubmit = formValues => {
        props.onSubmit(formValues)
    }

    const buttons = () => {
        if (!props.edit) {
            return <button className="ui button primary">Mentés</button>
        }
        return (
            <div className="ui segment">
                <div className="ui two column very relaxed grid">
                    <div className="column">
                        <button className={`ui button primary ${isMobileOnly ? 'my-bigger-button' : ''}`}>Mentés</button>
                        <Link to={`/zenesz/songs/${props.id}`} className={`ui button grey ${isMobileOnly ? 'my-bigger-button' : ''}`}>Mégse</Link>
                    </div>
                    <div className="column jobbra">
                        <MyModal
                            header="Biztosan törlöd ezt az éneket?"
                            generateTrigger={() => <button type="button" className={`ui button negative ${isMobileOnly ? 'my-bigger-button' : ''}`}>Ének törlése</button>}
                            closeText="Mégse"
                            approveText="Törlés"
                            onApprove={props.onDeleteClick}
                            negative
                            id={3}
                        >
                            {`Biztosan törlöd a(z) ${props.initialValues.title} éneket? Ezt később nem tudod visszavonni!`}
                        </MyModal>
                    </div>
                </div>
                <div className="ui vertical divider">
                    vagy
                </div>
            </div>
        )
    }
    const [colorOption, setColorOption] = useState(props.initialValues.color ? 'existing' : 'none')
    const [selectedColorDropdown, setSelectedColorDropdown] = useState(props.initialValues.color ? props.initialValues.color.slice(1) : '')
    const [selectedColorPicker, setSelectedColorPicker] = useState(props.initialValues.color ? props.initialValues.color : '')

    const renderSecondField = () => {
        switch(colorOption) {
            case 'existing': return <Field name='color' component={ColorSelector} colors={props.colors} val={selectedColorDropdown} setter={(v) => {setSelectedColorDropdown(v); props.change('color', '#' + v)}} defaultText="Válassz egy színt" firstDisabled={true} />
            case 'new': return <Field name="color" component={renderColorPicker} change={props.change} type="color" val={selectedColorPicker} setter={setSelectedColorPicker} />
            default: return
        }
    }

    const changeColorOption = opt => {
        switch(opt) {
            case 'existing': props.change('color', '#' + selectedColorDropdown); break
            case 'new': props.change('color', selectedColorPicker); break
            default: props.change('color', '')
        }
        setColorOption(opt)
    }

    return (
        <>
            <form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
                <MyTooltip />
                <div className="fields">
                    <Field wide="three wide" tip="Az ének sorszáma. Egyedi, később nem változtatható" name="id" component={renderInput} label="Sorszám" type="number" props={{ disabled: props.edit}}/>
                    <Field wide="thirteen wide" name="title" component={renderInput} label="Cím" type="text"/>
                </div>
                <label>Szín</label>
                <div className='fields'>
                    <div className='three wide field'>
                        <div className="ui form">
                            <div className="grouped fields">
                                <div className="field">
                                    <div className="ui radio checkbox" >
                                        <input type="radio" name="color" checked={colorOption === 'none'} id="none" onChange={() => changeColorOption('none')} />
                                        <label className='pointer' htmlFor="none">Nincs szín</label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui radio checkbox">
                                        <input type="radio" name="color" checked={colorOption === 'existing'} id="existing" onChange={() => changeColorOption('existing')} />
                                        <label className='pointer' htmlFor="existing">Létező szín</label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui radio checkbox">
                                        <input type="radio" name="color" checked={colorOption === 'new'} id="new" onChange={() => changeColorOption('new')} />
                                        <label className='pointer' htmlFor="new">Új szín</label>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className='thirteen wide field'>
                        {renderSecondField()}
                    </div>
                </div>
                <Field tip="Az alkalmazás dupla sorközöknél bontja versszakokra a szöveget." rows={10} name="lyrics" component={renderTextArea} label="Dalszöveg"/>
                <Field name="desc" component={renderTextArea} label="Megjegyzés (opcionális)" rows={2}/>
                {buttons()}
            </form>
            {props.children}
        </>
    )
}

const validate = formValues => {
    const errors = {}
    if (!formValues.id) {
        errors.id = 'Add meg az ének sorszámát!'
    }
    if (!formValues.title) {
        errors.title = 'Add meg az ének címét!'
    }
    if (!formValues.lyrics) {
        errors.lyrics = 'Add meg a dalszöveget!'
    }
    return errors
}

export default reduxForm({
    form: 'songForm',
    validate
})(SongForm)