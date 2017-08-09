// src/containers/CreateBatchButton.js

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

class CreateBatchButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }
  render() {
   if (!this.props.signedIn) return null
   return (
     <div className="CreateBatchButton">
       <Link to="/create-batch">
         <RaisedButton
          label="Create Batch"
          secondary={true}
          fullwidth={true} />
       </Link>
     </div>
   )
 }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})
export default connect(mapStateToProps)(CreateBatchButton)
