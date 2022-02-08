import React from 'react'
import Alert from '@material-ui/lab/Alert'
import { connect } from 'react-redux'
import { Button, Modal } from 'semantic-ui-react'

import '../styles.css'
import { removeAlert } from '../actions/alertActions'
import { openModal, closeModal } from '../actions/modalActions'

const MyModal = props => {
  const alert = props.alert.msg ?
    <Alert onClose={() => {props.removeAlert()}} severity={props.alert.type} >
        {props.alert.msg}
    </Alert>
    : null

  return (
    <Modal
      onClose={props.closeModal}
      onOpen={() => props.openModal(props.id)}
      open={props.modal.open && props.modal.id === props.id}
      trigger={props.generateTrigger()}
    >
      <Modal.Header>{props.header}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
            {props.children}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <div className="centered">
            {alert}
        </div>
        <Button onClick={props.closeModal}>
          {props.closeText}
        </Button>
        <Button
          content={props.approveText}
          onClick={() => {props.onApprove()}}
          negative={props.negative}
          primary={props.primary}
        />
      </Modal.Actions>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
      alert: state.alert,
      modal: state.modal
  }
}

export default connect(mapStateToProps, {removeAlert, openModal, closeModal})(MyModal)