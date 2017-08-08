// src/containers/BatchItem.js

import React, { PureComponent } from 'react'

class BatchItem extends PureComponent {
  render() {
    const { title, students, startDate, endDate } = this.props
    return (
      <article className="batch">
        <h1>{ title }</h1>
        <div>
          <p>{ startDate }</p>
          <p>{ endDate }</p>
          <p>{ students.length } Students</p>
        </div>
      </article>
    )
  }
}

export default BatchItem
