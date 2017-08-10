// src/containers/StudentEditor.js

import React, { PureComponent } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import createStudent from '../actions/batches/addStudent'
import { showError } from '../actions/loading'

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
    if (event.keyCode === 13) {
      event.preventDefault()
      this.refs.summary.medium.elements[0].focus()
    }
    this.setState({
      firstName: this.refs.firstName.value
    })
  }

  updateLastName(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      this.refs.summary.medium.elements[0].focus()
    }
    this.setState({
      lastName: this.refs.lastName.value
    })
  }

  updatePhoto(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      this.refs.summary.medium.elements[0].focus()
    }
    this.setState({
      photo: this.refs.photo.value
    })
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
  saveStudent() {
    const {
      firstName,
      lastName,
      photo,
    } = this.state
    const student = {
      firstName,
      lastName,
      photo,
    }

    if (this.validate(student)) {
      console.log(this.props.currentStudent)
      this.props.createStudent(this.props.currentStudent, student)
      this.props.push(`/students/${this.props.currentStudent}`)
    }
  }

  render() {
    const { errors } = this.state
    return (
      <div className="editor">
        <input
          type="text"
          ref="firstName"
          className="firstName"
          placeholder="Enter student first name"
          defaultValue={this.state.firstName}
          onChange={this.updateFirstName.bind(this)}
          onKeyDown={this.updateFirstName.bind(this)} />

        { errors.firstName && <p className="error">{ errors.firstName }</p> }

        <input
          type="text"
          ref="lastName"
          className="lastName"
          placeholder="Enter student last name"
          defaultValue={this.state.lastName}
          onChange={this.updateLastName.bind(this)}
          onKeyDown={this.updateLastName.bind(this)} />

        { errors.lastName && <p className="error">{ errors.lastName }</p> }

        <input
          type="text"
          ref="photo"
          className="photo"
          placeholder="Enter URL student photo"
          defaultValue={this.state.photo}
          onChange={this.updatePhoto.bind(this)}
          onKeyDown={this.updatePhoto.bind(this)} />

        { errors.photo && <p className="error">{ errors.photo }</p> }

        <div className="actions">
          <RaisedButton
            label="Save"
            secondary={true}
            onClick={this.saveStudent.bind(this)} />

        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ currentUser, currentStudent }) => ({
  currentStudent,
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { push, showError, createStudent })(StudentEditor)
