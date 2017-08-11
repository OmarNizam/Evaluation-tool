// src/containers/Student.js

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchBatches from '../actions/batches/fetch'
import getBatch from '../actions/batches/get'
import subscribeToBatches from '../actions/batches/subscribe'
import Title from '../components/Title'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import './Student.css'

class Student extends PureComponent {

  componentWillMount() {
    const {
      batch,
      fetchBatches,
      getBatch,
      subscribed,
      subscribeToBatches
    } = this.props
    const { batchId } = this.props.params
    if (!batch) fetchBatches()
    getBatch(batchId)
      if (!subscribed) subscribeToBatches()
  }
  saveStudent() {
    console.log("Save current student")
  }
  saveNextStudent() {
    console.log("Save and go to the next student")
  }
  // rendering the student evaluations
  renderEvaluations(evaluation, index) {
    const backGroundColor = evaluation.color
    return (
      <RaisedButton
        className="evalucation-color"
        key={index}
        onTouchTap={() => {console.log("Evaluation Date pressed")}}
        backgroundColor={backGroundColor}>

        {new Date(evaluation.evaluationDate).getDate()}
        </RaisedButton>
    )
  }

  render() {
    const { batchId, studentId } = this.props.params

    const {currentStudents, batches} = this.props
    if(!!!currentStudents || !!!batches) return null
    // find exact batch
    const batch = batches.find(p => p._id.toString() === batchId.toString())
    // find the student who belonge to exact batch
    const student = batch.students.find(p => p._id.toString() === studentId.toString())

    // declare Colors
    const green = "#70C67A"
    const yellow = "#FBD40B"
    const red= "#DE5454"

    console.log(student.evaluations)

    return (
      <main id="student">
        <header className="student-header">
          <div className="photo">
            <img src={student.photo} alt="student" />
          </div>
          <div className="Student-Info">
            <Title content={student.firstName + " " + student.lastName} />
            <p>{batch.title}</p>
            <p>{student.evaluations.map(this.renderEvaluations)}</p>

            <div className="evaluation-history">
              <div className="date-picker">
                <DatePicker
                  defaultDate={new Date()}
                  hintText="Portrait Dialog"
                  formatDate={new global.Intl.DateTimeFormat('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    }).format} />
              </div>
            </div>
          </div>
        </header>
        <article className="student-evaluation">

            <div className="evaluation">
              <FlatButton label="Green" className="button" backgroundColor={green} />
              <FlatButton label="Yellow" className="button" backgroundColor={yellow} />
              <FlatButton label="Red" className="button" backgroundColor= {red} />
            </div>
            <div className="totch">
              <div className="input">
                <TextField
                  hintText="Enter student summary"
                  fullWidth={true}
                  defaultValue={student.evaluations.total}/>
              </div>
              <div className="submit">
                <FlatButton
                  label="Save"
                  onClick={this.saveStudent.bind(this)} />

                <FlatButton
                  label="Save and Next"
                  onClick={this.saveNextStudent.bind(this)}
                  primary={true} />
              </div>

            </div>
            </article>
      </main>
    )
  }
}
const mapStateToProps = ({ batches, currentStudents, subscriptions }) => ({
  batches,
  currentStudents,
  subscribed: subscriptions.includes('batches'),
  })

export default connect(mapStateToProps, {
  fetchBatches,
  subscribeToBatches,
  getBatch,
})(Student)
