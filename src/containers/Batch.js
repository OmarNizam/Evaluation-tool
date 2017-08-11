// src/containers/Batch.js

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches from '../actions/batches/fetch'
import getBatch from '../actions/batches/get'
import subscribeToBatches from '../actions/batches/subscribe'
import StudentItem from './StudentItem'
import RaisedButton from 'material-ui/RaisedButton'
import Title from '../components/Title'
import { Link } from 'react-router'
import './Batch.css'

export class Batch extends PureComponent {
  static propTypes = {
    _id: PropTypes.string,
    title: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    students: PropTypes.array,
  }

  componentWillMount() {
    const { batch,
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
 randomStudent(event) {
   const { batchId } = this.props.params
   const {students} = this.props
   // do random on students array * by the array length
   const randomStudent = students[Math.floor(Math.random() * students.length)]
   // and the id result of the random func give it as index for the next student
   const randomStudentIndex = randomStudent._id
   console.log(this.props.currentStudents)
   // this.props.push(`/batches/${batchId}/students/${randomStudentIndex}`)
 }
  renderStudent(student, index) {
    return <StudentItem key={index} { ...student } />
  }

  render() {
    const {
      _id,
      title,
      //startDate,
      //endDate,
      students,
    } = this.props

    const { batchId } = this.props.params // to use it in the Link

    if (!_id) return null
    return(
      <article className="batch">
        <header>
          <Link to={'/batches/' + batchId + '/create-student'}>
            <RaisedButton
              label="Create Student"
              secondary={true}
              fullWidth={true} />
          </Link>
          <Title content={ title } />
          <RaisedButton
            label="Random Student"
            secondary={true}
            fullWidth={true}
            onClick={()=>this.randomStudent()} />
        </header>
        <main>
          <div className="students">
            {students.map(this.renderStudent)}
          </div>
        </main>

      </article>
    )
  }
}
const mapStateToProps = ({ batches, subscriptions, currentStudents }, {params }) => {
  const batch = batches.reduce((prev, next) => {
    if (next._id === params.batchId) {
      return next
    }
    return prev
  }, {})

  return {
    ...batch,
    batches,
    currentStudents,
    subscribed: subscriptions.includes('batches'),
  }
}

export default connect(mapStateToProps, {
  fetchBatches,
  subscribeToBatches,
  push,
  getBatch,
})(Batch)
