// src/containers/StudentEditor.js

import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import createStudent from '../actions/batches/addStudent'
import { showError } from '../actions/loading'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Title from '../components/Title'

class StudentEditor extends PureComponent {
  constructor(props) {
    super()
    const {firstName, lastName, photo, evaluations } = props

    this.state = {
        firstName,
        lastName,
        photo,
        evaluations,
        errors: {}
    }
  }

  updateFirstName(event) {
    this.setState({
      firstName: this.target.value
    })
    console.log(this.state.firstName)
  }

  updateLastName(event) {
    this.setState({
      lastName: this.target.value
    })
    console.log(this.state.lastName)
  }

  updatePhoto(event) {
    this.setState({
      photo: this.target.value
    })
    console.log(this.state.photo)
  }
  // errors messages and validations

  validate(batch) {
    const {
      firstName,
      lastName,
      photo
    } = batch
    let errors = {}
    if (!firstName || firstName === '') errors.firstName = 'Enter student fist name ..'
    if (!lastName || lastName === '') errors.lastName = 'Enter student last name ..'
    if (!photo || photo === '') errors.photo = 'Please Add photo ..'
    this.setState({
      errors,
    })

    return Object.keys(errors).lenght === 0
  }

  // save batch function
  saveBatch(event) {
    event.preventDefault()
    const {
      firstName,
      lastName,
      photo,
    } = this.state
    const batch = {
      firstName,
      lastName,
      photo,
      create: true,
    }

    if (this.validate(batch)) {
      console.log(this.props.currentBatch)
      this.props.createBatch(this.props.currentBatch, batch)
      this.props.push(`/batches/${this.props.currentBatch}`)
    }
  }

  conferm(event) {
    event.preventDefault()
    const user = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
    }
      this.props.signIn(user)
  }

  render() {
    const PaperStyle = {
      width: '400px',
      margin: '50px auto',
      padding: '2em',
    }

    const { errors } = this.state

    return (
      <Paper style={ PaperStyle }>

      <Title content="Create Student" level={2} />

  <form onSubmit={this.saveBatch.bind(this)}>
    <div className="input">
      <TextField
        type="text"
        ref="firstName"
        className="firstName"
        placeholder="First Name"
        defaultValue={this.state.firstName}
        onChange={this.updateFirstName.bind(this)}
        onKeyDown={this.updateFirstName.bind(this)} />
      { errors.firstName && <p className="error">{ errors.firstName }</p> }

    </div>
    <div className="input">
      <TextField
        type="text"
        ref="lastName"
        className="lastName"
        placeholder="Last Name"
        defaultValue={this.state.lastName}
        onChange={this.updateLastName.bind(this)}
        onKeyDown={this.updateLastName.bind(this)} />
      { errors.lastName && <p className="error">{ errors.lastName }</p> }
    </div>
    <div className="input">
      <TextField
        type="text"
          ref="photo"
          className="photo"
          placeholder="Enter URL photo"
          defaultValue={this.state.photo}
          onChange={this.updatePhoto.bind(this)}
          onKeyDown={this.updatePhoto.bind(this)} />
        { errors.photo && <p className="error">{ errors.photo }</p> }
    </div>
        <RaisedButton
          onClick={this.saveBatch.bind(this)}
          label="Create "
          primary={true} />
      </form>
    </Paper>
    )
  }
}
const mapStateToProps = ({ currentUser, currentBatch }) => ({
  currentBatch,
  
})

export default connect(mapStateToProps, { push, showError, createStudent })(StudentEditor)
