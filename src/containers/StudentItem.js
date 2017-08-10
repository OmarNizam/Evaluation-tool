// src/containers/StudentItem.js

import React, { PureComponent } from 'react'
import { Link } from 'react-router'

class StudentItem extends PureComponent {
  render() {
    const {
      firstName,
      lastName,
      //evaluations,
      photo
    } = this.props
    const defaultColor = {
      backgroundColor: 'gray',
    }
    return (
      <article className="student" style={defaultColor}>
        <Link to={`/students/${_id}`}>
          <p>{firstName} {lastName}</p>
        </Link>
        <div>
          <img className="photo" src={photo} alt="student" />
        </div>
      </article>
    )
  }
}
export default StudentItem
