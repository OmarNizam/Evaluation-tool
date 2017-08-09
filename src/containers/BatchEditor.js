// src/containers.BatchEditor.js

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { showError } from '../actions/loading'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import createBatch from '../actions/batches/create'
import './batchEditor.css'

class BatchEditor extends PureComponent {
  constructor(props) {
    super()

    const {title, startDate, endDate} = this.props
    this.state = {
      title,
      startDate,
      endDate,
      errors: {}
    }
  }

  updateTitle(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      this.refs.summary.medium.elements[0].focus()
    }
    // we give title state value
    this.setState({
      title: this.refs.title.value
    })
  }
  // we give the batch startDate value date
  updateStartDate = (event, date) => {
    this.setState({
      startDate: date,
    })
  }
  // we give the batch endDate value date
  updateEndDate = (event, date) => {
    this.setState({
      endDate: date,
    })
  }

  //errors validation
  validate(batch) {
    const { title, startDate, endDate} = batch
    let errors = {}
    if (!title || title === '') errors.title = 'Title needed ...'
    if (!endDate || endDate === '') errors.endDate = 'Choose end date for the batch ..'
    if(!startDate || startDate === '') errors.startDate = 'Choose start date for the batch ..'
    this.setState({
      errors,
    })
    return Object.keys(errors).lenght === 0
  }
  // save batch function
  saveBatch() {
    const batch = {title, startDate, endDate}
    const {title, startDate, endDate} = this.state
    // if there is no error this batch props create new batch then go back to root
    if (this.validate(batch)) {
      this.props.createBatch(batch)
      this.props.push('/')
    }
  }

  render() {
    const { errors } = this.state
    console.log(this.state.title)
    console.log(this.state.controlledDate)
    return (
      <div className="editor">
        <input
          type="text"
          ref="title"
          className="title"
          placeholder="Title"
          defaultValue={this.state.title}
          onChange={this.updateTitle.bind(this)}
          onKeyDown={this.updateTitle.bind(this)} />

        {errors.title && <p className="error">{errors.title}</p>}

        <DatePicker
          className="startDate"
          hintText="Start Date"
          ref="startDate"
          autoOk={true}
          value={this.state.startDate}
          onchange={this.updateStartDate} />

        { errors.startDate && <p className="error">{ errors.startDate }</p> }

        <DatePicker
          className="endDate"
          hintText="End Date"
          ref="endDate"
          autoOk={true}
          value={this.state.endDate}
          onChange={this.updateEndDate} />

        { errors.endDate && <p className="error">{ errors.endDate }</p> }

        <div className="actions">
          <RaisedButton
            label="Save"
            secondary={true}
            onClick={this.saveBatch.bind(this)} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})
export default connect(mapStateToProps, {createBatch, push, showError})(BatchEditor)
