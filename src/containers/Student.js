// src/containers/Student.js

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchBatches from '../actions/batches/fetch'
import getBatch from '../actions/batches/get'
import subscribeToBatches from '../actions/batches/subscribe'
import Title from '../components/Title'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import './Student.css'

class Student extends PureComponent {

  componentWillMount() {
    const {
      batch,
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

  render() {
    return (
      <main id="student">
        <header className="student-header">
          <div className="photo">
            <img src="http://media-dmg.assets-cdk.com/teams/repository/export/v/1/553/9ff109bb110058aa60050568bfc31/5539ff109bb110058aa60050568bfc31.png" alt="Student" />
          </div>
          <div className="Student-Info">
            <p>Batch Number 1</p>
            <p>Evaluation Colors</p>
          </div>
        </header>
        <article className="student-evaluation">
          <p className="evaluation-history">Evaluations History</p>
            <div className="evaluation">
              <FlatButton className="button" backgroundColor="green" />
              <FlatButton className="button" backgroundColor="yellow" />
              <FlatButton className="button" backgroundColor="red" />
            </div>
            <div className="totch">
              <div className="input">
                <TextField
                  hintText="Enter student summary"
                  fullWidth={true}/>
              </div>
              <div className="submit">
                <FlatButton label="Save" />
                <FlatButton label="Save and Next" />
              </div>

            </div>
            </article>
      </main>
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
})(Student)
