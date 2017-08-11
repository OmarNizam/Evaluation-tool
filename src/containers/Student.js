// src/containers/Student.js

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches from '../actions/batches/fetch'
import getBatch from '../actions/batches/get'
import subscribeToBatches from '../actions/batches/subscribe'
import Title from '../components/Title'
import RaisedButton from 'material-ui/RaisedButton'
import './Student.css'
import Evaluation from './Evaluation'
import FlatButton from 'material-ui/FlatButton'
import DatePicker from 'material-ui/DatePicker'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import { Link } from 'react-router'
import editStudent from '../actions/batches/student'
class Student extends PureComponent {
  constructor(props) {
    super()
    const { evaluationDate } = props
    this.state = { evaluationDate }
    this.handleChange = this.handleChange.bind(this)
    this.saveBatch = this.saveBatch.bind(this)
    }

    componentWillMount() {
    const {

      fetchBatches,
      getBatch,
      subscribed,
      subscribeToBatches
    } = this.props
    const { batchId } = this.props.params
    fetchBatches()
    getBatch(batchId)
      if (!subscribed) subscribeToBatches()
  }
  handleChange(event) {
    this.setState({total: event.target.value})
  }
  updateEvaluationDate = (event, date) => {
    this.setState({
      evaluationDate: date,
    })
  }
  saveBatch(value) {
    const { batchId, studentId } = this.props.params
    const {
      total,
      evaluationDate,
      color,
    } = this.state
    const student = {
      total,
      evaluationDate,
      color,
      id: studentId,
      edit: true
    }
    this.props.editStudent(batchId, student)

    if (value) this.props.push(`/batches/${batchId}`)
    if (!value) {
      const {batch} = this.props
      const {studentId} = this.props.params
      const currentStudentIndex = batch.students.findIndex(p =>(p._id === studentId))
      let nextStudentIndex = currentStudentIndex + 1
      console.log(nextStudentIndex)

      if (nextStudentIndex >= batch.students.length)
      nextStudentIndex = 0

      const nextStudent = batch.students[nextStudentIndex]._id
      this.props.push(`/batches/${batchId}/students/${nextStudent}`)
    }
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
  editStudent(evaluation, event) {
    this.setState({
      evaluationDate: new
      Date(evaluation.evaluationDate),
      total: evaluation.total
    })
  }

  render() {
    // const { batchId, studentId } = this.props.params
    //
    // const {currentStudents, batches} = this.props
    // if(!!!currentStudents || !!!batches) return null
    const {batch} = this.props
    const {studentId, batchId } = this.props.params
    if(!!!batch) return null


    // find the student who belonge to exact batch
    const student = batch.students.find(p => p._id.toString() === studentId.toString())

    // declare Colors
    const green = "#70C67A"
    const yellow = "#FBD40B"
    const red= "#DE5454"

    if(!this.props.batch) return null
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
            <Link to={`/batches/${batchId}`}>
            <p>{batch.title}</p>
            </Link>
            <div>
              { student.evaluations.map(this.renderEvaluations.bind(this)) }
            </div>

          </div>
        </header>
        <Paper className="evaluation-form">
          <h1 style={{color:this.state.color}}>Student Evaluation</h1>
          <article className="student-evaluation">
              <div className="evaluation">
                <FlatButton label="Red"
                  className="button"
                  backgroundColor= {red}
                  onClick={() => { this.setState({ color: red })}} />
                <FlatButton label="Yellow"
                  className="button"
                  backgroundColor={yellow}
                  onClick={() => { this.setState({ color: yellow }) }} />
                <FlatButton label="Green"
                  value="Green"
                  className="button"
                  onClick={() => { this.setState({ color: green })}}
                  backgroundColor={green}/>
              </div>
              <div className="totch">
                <div className="input">
                  <DatePicker
                    value={this.state.evaluationDate}
                    onChange={this.updateEvaluationDate}
                    hintText=""
                    autoOk={true}
                    formatDate={new global.Intl.DateTimeFormat('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }).format} />
                  <TextField
                    hintText={"Fill in the students summary here"}
                    multiLine={true}
                    value={this.state.summary}
                    onChange={this.handleChange}
                    fullWidth={true}/>
                </div>
                <div className="submit">
                  <FlatButton
                    label="Save"
                    value="save"
                    onClick={()=>this.saveBatch(this.value=true)} />
                  <FlatButton
                    label="Save and Next"
                    primary={true}
                    onClick={()=>this.saveBatch(this.value=false)} />
                </div>
              </div>
          </article>
        </Paper>
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
  editStudent,
  push
})(Student)
