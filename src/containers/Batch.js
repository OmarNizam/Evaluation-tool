// src/containers/Batch.js

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchBatches from '../actions/batches/fetch'
import StudentItem from './Student'
import Title from '../components/Title'
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
    this.props.fetchBatches()
  }

  renderStudent(student, index) {
    return <StudentItem key={index} { ...student } />
  }

  render() {
    const {
      _id,
      title,
      startDate,
      endDate,
      students,
    } = this.props

    if (!_id) return null
    return(
      <article className="batch">
        <header>
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

export default connect(mapStateToProps, { fetchBatches })(Batch)
