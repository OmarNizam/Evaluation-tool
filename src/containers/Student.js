// src/containers/Student.js

import React, { PureComponent } from 'react'
class Student extends PureComponent {
  render() {
    const { firstName, lastName, evaluations, photo } = this.props
    return (
      <article className="student">
        <h3>{firstName} {lastName}</h3>
        <div>
          <img src={photo} alt="student" />
        </div>
      </article>
    )
  }
}
export default Student
