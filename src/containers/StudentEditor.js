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

  validate(student) {
    const {
      firstName,
      lastName,
      photo
    } = student
    let errors = {}
    if (!firstName || firstName === '') errors.firstName = 'Enter student fist name ..'
    if (!lastName || lastName === '') errors.lastName = 'Enter student last name ..'
    if (!photo || photo === '') errors.photo = 'Please Add photo ..'
    this.setState({
      errors,
    })

    return Object.keys(errors).lenght === 0
  }

  // save student function
  saveStudent(event) {
    event.preventDefault()
    const {
      firstName,
      lastName,
      photo,
    } = this.state
    const student = {
      firstName,
      lastName,
      photo,
      create: true,
    }

    if (this.validate(student)) {
      console.log(this.props.currentStudent)
      this.props.createStudent(this.props.currentStudent, student)
      this.props.push(`/students/${this.props.currentStudent}`)
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

  <form onSubmit={this.saveStudent.bind(this)}>
    <div className="input">
      <TextField
        type="text"
        ref="firstName"
        className="firstName"
        placeholder="First Name"
        defaultValue={this.state.firstName}
        onChange={this.updateFirstName.bind(this)}
        onKeyDown={this.updateFirstName.bind(this)} />
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
    </div>
        <RaisedButton
          onClick={this.saveStudent.bind(this)}
          label="Create "
          primary={true} />
      </form>
    </Paper>
    )
  }
}
const mapStateToProps = ({ currentUser, currentStudent }) => ({
  currentStudent,
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { push, showError, createStudent })(StudentEditor)
