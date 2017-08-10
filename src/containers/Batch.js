// src/containers/Batch.js

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
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
  console.log(this.prps.params)
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
const mapStateToProps = ({ batches }, { params }) => {
  const batch = batches.reduce((prev, next) => {
    if (next._id === params.batchId) {
      return next
    }
    return prev
  }, {})

  return {
    ...batch
  }
}

export default connect(mapStateToProps, {
  fetchBatches,
  subscribeToBatches,
  getBatch,
})(Batch)
