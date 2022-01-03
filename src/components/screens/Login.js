import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { login } from '../../actions/authActions'

const renderInput = ({ input, label, meta, type }) => {
    return (
        <div className={`field ${meta.error && meta.touched ? 'error' : ''}`}>
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

const Login = (props) => {

    const onSubmit = (formValues) => {
        props.login(formValues)
    }

    return (
        <div className="ui container">
            <form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
                <Field name="username" component={renderInput} label="Felhasználónév" type="text" />
                <Field name="password" component={renderInput} label="Jelszó" type="password"/>
                <button className="ui button primary">Bejelentkezés</button>
            </form>
        </div>

    )
}

const validate = formValues => {
    const errors = {}
    if (!formValues.username) {
        errors.username = 'Add meg a felhasználónevet!'
    }
    if (!formValues.password) {
        errors.password = 'Add meg a jelszót!'
    }
    return errors
}

export default reduxForm({
    form: 'authForm',
    validate
})(connect(null, { login })(Login))