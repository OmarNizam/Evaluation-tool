// src/containers/StudentEvaluation.js

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import editStudent from '../actions/batches/student'
import Paper from 'material-ui/Paper'
import Title from '../components/Title'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'

class Evaluation extends PureComponent {
  constructor(props) {
    super()
    const {
      total,
      evaluationDate,
      photo,
      evaluations
      } = props
    this.state = {
      total,
      evaluationDate,
      photo,
      evaluations,
      errors: {},
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.saveBatch = this.saveBatch.bind(this)
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
      color
    } = this.state

    const student = {
      total,
      evaluationDate,
      color,
      id: studentId,
      edit: true
    }
    // this.props.editStudent(batchId, student)
    if (value) this.props.push(`/batches/${batchId}`)
    if (!value) console.log("next student")
  }



render() {
  const green = "#70C67A"
  const yellow = "#FBD40B"
  const red= "#DE5454"

  return (
      <Paper>
        <Title content="Student Evaluation" level={2} />
        <article className="student-evaluation">
            <div className="evaluation">
              <FlatButton label="Green"
                className="button"
                backgroundColor= {green}
                onClick={() => {
                  this.setState({ color: green })
                }} />
              <FlatButton label="Yellow"
                className="button"
                backgroundColor={yellow}
                onClick={() => {
                  this.setState({ color: yellow })
                }} />
              <FlatButton label="Red"
                value="Red"
                className="button"
                onClick={() => {
                  this.setState({ color: red })
                }}
                backgroundColor={red}/>
            </div>
            <div className="remark">
              <div className="input">
                <DatePicker
                  value={this.state.evaluationDate}
                  onChange={this.updateEvaluationDate}
                  hintText="Portrait Dialog"
                  autoOk={true}
                  formatDate={new global.Intl.DateTimeFormat('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }).format} />
                <TextField
                  hintText="Enter the student summary"
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
                  onClick={()=>this.saveBatch()} />
              </div>
            </div>
        </article>
      </Paper>
    )
  }
}
const mapStateToProps = ({ batches, currentUser }) => ({
  batches,
  signedIn: !!currentUser && !!currentUser._id,
  })
export default connect(mapStateToProps, {
  push,
  editStudent,
})(Evaluation)
