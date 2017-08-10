// src/containers/CreateStudentButton.js

// create button with Link to '/create-student'

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router'

class CreateStudentButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }
  render() {
    if (!this.props.signedIn) return null
    return(
      <div className="CreateStudentButton">
        <Link to="/create-student">
          <RaisedButton
          label="Add Student" />
          secondary={true}
        </Link>
      </div>
    )
  }
}
const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})
export default connect(mapStateToProps)(CreateStudentButton)
