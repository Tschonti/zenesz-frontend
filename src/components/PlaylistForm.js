import React from 'react'
import { Field, reduxForm } from 'redux-form'

import MyButton from './MyButton'
import MyModal from './MyModal'

const renderInput = ({ input, label, meta, type }) => {
    return (
        <div className={`${meta.error && meta.touched ? 'error' : ''}`}>
            <label>{label}</label>
            <input {...input} type={type} autoComplete="off" />
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

const PlaylistForm = props => {
    const onSubmit = formValues => {
        props.onSubmit(formValues)
    }

    return (
        <MyModal
            header="Lejátszási lista mentése"
            generateTrigger={() => <MyButton disabled={props.disabled} tip="Lejátszási lista mentése" color="purple" icons={["save"]} />}
            closeText={'Mégse'}
            approveText={'Mentés'}
            onApprove={props.handleSubmit(onSubmit)}
            primary
            id={2}
        >
            <form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
                <Field label="Lejátszási lista neve" name="name" type="text" component={renderInput} />
            </form>
        </MyModal>
    )

}

const validate = formValues => {
    const errors = {}
    if (!formValues.name) {
        errors.name = 'Add meg a lejátszási lista nevét!'
    }
    return errors
}

export default reduxForm({
    form: 'playlistForm',
    validate
})(PlaylistForm)