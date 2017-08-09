// src/containers/BatchItem.js

import React, { PureComponent } from 'react'
import Title from '../components/Title'
import { Link } from 'react-router'
class BatchItem extends PureComponent {
  render() {
    const { title, students, startDate, endDate, _id } = this.props
    console.log(_id)
    return (
      <article className="batch">
        <Link to={`/batches/${_id}`}>
          <Title content={ title } />
        </Link>

        <div>
          <p>Start on { new Date(startDate).toDateString() }</p>
          <p>End on { new Date(endDate).toDateString() }</p>
          <p>{ students.length } Students</p>
        </div>
      </article>
    )
  }
}

export default BatchItem
