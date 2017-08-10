// src/containers/Student.js

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchBatches from '../actions/batches/fetch'
import getBatch from '../actions/batches/get'
import subscribeToBatches from '../actions/batches/subscribe'

class Student extends PureComponent {
  static propTypes = {
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    photo: PropTypes.string,
    //evaluations: PropTypes.array,
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
  }

  render() {
    const {
      _id,
      firstName,
      lastName,
      photo,
      //evaluations
    } =this.props
    if(!_id) return null
    return (
      <article>
        <h2>{firstName} {lastName}</h2>
      </article>
    )
  }
}
const mapStateToProps = ({currentUser, currentBatch, batches, subscriptions}) => {
  const batch = batches.filter((p) => (p._id === currentBatch))[0]
  return {
    batch,
    currentUser,
  }
}

export default connect(mapStateToProps, {
  fetchBatches,
  getBatch,
  subscribeToBatches
})(Student)
