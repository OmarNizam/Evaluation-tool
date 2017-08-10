// src/containers.BatchEditor.js

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { showError } from '../actions/loading'
import subscribeToBatches from '../actions/batches/subscribe'
import fetchBatches from '../actions/batches/fetch'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import createBatch from '../actions/batches/create'
import BatchItem from './BatchItem'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Title from '../components/Title'
import './batchEditor.css'

class BatchEditor extends PureComponent {
  constructor(props) {
    super()

    const {title, startDate, endDate} = props
    this.state = {
      title,
      startDate,
      endDate,
      errors: {}
    }
  }

  componentWillMount() {
    const {fetchBatches, subscribeToBatches, subscribed} = this.props
    fetchBatches()
    if (!subscribed) subscribeToBatches()
  }
  updateTitle(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      this.refs.summary.medium.elements[0].focus()
    }
    // we give title state value
    this.setState({
      title: event.target.value
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
  // render all batch for exact index
  renderBatch(batch, index) {
    return <BatchItem key={index} { ...batch } />
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
    const batchStyle = {
      width: '50%',
      margin: '20px auto',
      padding: '2em',
    }
    const { errors } = this.state
    console.log(this.state.title)
    console.log(this.state.controlledDate)
    return (
      <div>
        <Paper className="editor" style={batchStyle}>
          <Title content="Create Batch" level={2} />
          <form onSubmit={this.saveBatch.bind(this)}>

          <div className="input">
            <TextField
              type="text"
              ref="title"
              className="field"
              placeholder="Batch Title"
              defaultValue={this.state.title}
              onChange={this.updateTitle.bind(this)}
              onKeyDown={this.updateTitle.bind(this)} />

              {errors.title && <p className="error">{errors.title}</p>}

          </div>

          <div className="input">
            <DatePicker
             hintText="Starting Date"
             ref="startDate"
             autoOk={true}
             className="startDate"
             value={this.state.startDate}
             onChange={this.updateStartDate} />

             { errors.startDate && <p className="error">{ errors.startDate }</p> }
          </div>

          <div className="input">
            <DatePicker
              className="endDate"
              hintText="End Date"
              ref="endDate"
              autoOk={true}
              value={this.state.endDate}
              onChange={this.updateEndDate} />

              { errors.endDate && <p className="error">{ errors.endDate }</p> }
          </div>

          <div className="actions">
            <RaisedButton
              label="Save"
              secondary={true}
              onClick={this.saveBatch.bind(this)} />
          </div>
        </form>
      </Paper>
    </div>
    )
  }
}

const mapStateToProps = ({ batches, currentUser }) => ({
  batches,
  signedIn: !!currentUser && !!currentUser._id,
})
export default connect(mapStateToProps, {createBatch, push, showError})(BatchEditor)
