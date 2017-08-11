// src/containers/Student.js

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import fetchBatches from '../actions/batches/fetch'
import getBatch from '../actions/batches/get'
import subscribeToBatches from '../actions/batches/subscribe'
import Title from '../components/Title'
import RaisedButton from 'material-ui/RaisedButton'
import './Student.css'
import Evaluation from './Evaluation'

class Student extends PureComponent {
  constructor(props) {

    super()
    const {
      total,
      color,
      evaluationDate,
      } = props
      this.state = {
        total,
        color,
        evaluationDate,
        errors: {},
        value: ''
      }
    }

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

  // rendering the student evaluations
  renderEvaluations(evaluation, index) {
    const backGroundColor = evaluation.color
    return (
      <RaisedButton
        className="evalucation-color"
        key={index}
        onClick={()=> {this.editStudent(evaluation)}}
        backgroundColor={backGroundColor}>

        {new Date(evaluation.evaluationDate).getDate()}
        </RaisedButton>
    )
  }
  editStudent(evaluation) {
    console.log(evaluation.total)
    this.setState({total: evaluation.total})
  }

  render() {
    // const { batchId, studentId } = this.props.params
    //
    // const {currentStudents, batches} = this.props
    // if(!!!currentStudents || !!!batches) return null
    const {batch} = this.props
    const {studentId } = this.props.params
    if(!!!batch) return null


    // find the student who belonge to exact batch
    const student = batch.students.find(p => p._id.toString() === studentId.toString())

    // // declare Colors
    // const green = "#70C67A"
    // const yellow = "#FBD40B"
    // const red= "#DE5454"
    //
    // console.log(student.evaluations)

    return (
      <main id="student">
        <header className="student-header">
          <div className="photo">
            <img src={student.photo} alt="student" />
          </div>
          <div className="Student-Info">
            <Title content={student.firstName + " " + student.lastName} />
            <p>{batch.title}</p>
            <div>
              { student.evaluations.map(this.renderEvaluations.bind(this)) }
            </div>

          </div>
        </header>
      </main>
    )
  }
}
const mapStateToProps = ({ batches, currentStudents, subscriptions }, {params}) => ({
  batch: batches.find(p => p._id.toString() === params.batchId.toString()),
  batches,
  currentStudents,
  subscribed: subscriptions.includes('batches'),
  })

export default connect(mapStateToProps, {
  fetchBatches,
  subscribeToBatches,
  getBatch,
})(Student)
