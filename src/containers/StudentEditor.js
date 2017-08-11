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
  componentWillMount() {
    if (this.props.router.location.state) {
      console.log(this.props.router.location.state)
      this.setState({
        firstName: this.props.router.location.state.firstName,
        lastName: this.props.router.location.state.lastName,
        avatar: this.props.router.location.state.avatar,
        _id: this.props.router.location.state._id,
        edit: true,
      })
    }
  }

  updateFirstName(event) {
    this.setState({
      firstName: event.target.value
    })

  }

  updateLastName(event) {
    this.setState({
      lastName: event.target.value
    })

  }

  updatePhoto(event) {
    this.setState({
      photo: event.target.value
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
      console.log(student)
      const { batchId } = this.props.params
      this.props.createStudent(batchId, student)
      this.props.push(`/batches/${batchId}`)
    }
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
        id="firstName"
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
        id="lastName"
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
          id="photo"
          placeholder="Enter URL photo"
          defaultValue={this.state.photo}
          onChange={this.updatePhoto.bind(this)}
          onKeyDown={this.updatePhoto.bind(this)} />
        { errors.photo && <p className="error">{ errors.photo }</p> }
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
const mapStateToProps = ({ currentUser, currentBatchId }) => ({
  currentBatchId,
  currentUser,

})

export default connect(mapStateToProps, {
  push,
  showError,
  createStudent
})(StudentEditor)
