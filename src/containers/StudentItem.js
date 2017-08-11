// src/containers/StudentItem.js

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import IconButton from 'material-ui/IconButton'
import { showError } from '../actions/loading'
import RemoveStudent from '../actions/batches/addStudent'
import DeleteIcon from 'react-icons/lib/fa/user-times'

class StudentItem extends PureComponent {
  render() {
    const {
      firstName,
      lastName,
      evaluations,
      photo,
      _id,
    } = this.props

    const backColor = evaluations[evaluations.length - 1].color // get the evaluation color using index
    const defaultColor = {
      backgroundColor: backColor,
    }
    return (
      <article className="student" style={defaultColor}>
        <IconButton
          iconClassName="material-icons"
          tooltip="Delete Student"
          onTouchTap={() => {this.props.RemoveStudent(this.props.currentBatchId, {_id, remove: true})}} >
            <DeleteIcon />
          </IconButton>
        <Link to={'/batches/' + this.props.currentBatchId + '/students/' + _id}>
          <p>{firstName} {lastName}</p>
        </Link>
        <div>
          <img className="photo" src={photo} alt="student" />
        </div>
      </article>
    )
  }
}
const mapStateToProps = ({currentBatchId }) => ({ currentBatchId })
export default connect(mapStateToProps, { RemoveStudent, showError })(StudentItem)
