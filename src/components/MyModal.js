import React, { useState } from 'react'
import Alert from '@material-ui/lab/Alert'
import { connect } from 'react-redux'
import { Button, Modal } from 'semantic-ui-react'

import '../styles.css'
import { removeAlert } from '../actions/alertActions'

const MyModal = props => {
  const alert = props.alert.msg ?
    <Alert onClose={() => {props.removeAlert()}} severity={props.alert.type} >
        {props.alert.msg}
    </Alert>
    : null

  const [open, setOpen] = useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={props.children}
    >
      <Modal.Header>{props.header}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
            {props.content}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <div className="centered">
            {alert}
        </div>
        <Button color='lightgrey' onClick={() => setOpen(false)}>
          {props.closeText}
        </Button>
        <Button
          content={props.approveText}
          onClick={() => {props.onApprove()}}
          negative
        />
      </Modal.Actions>
    </Modal>
  )
}

const mapStateToProps = state => {
    return {
        alert: state.alert
    }
}

export default connect(mapStateToProps, {removeAlert})(MyModal)