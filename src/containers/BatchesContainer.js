// src/containers/BatchesContainer.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BatchItem from './BatchItem'
import Title from '../components/Title'
import subscribeToBatches from '../actions/batches/subscribe'
import fetchBatches from '../actions/batches/fetch'
import './BatchesContainer.css'
import CreateBatchButton from './CreateBatchButton'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

class BatchesContainer extends PureComponent {

  componentWillMount() {
    const {fetchBatches, subscribeToBatches, subscribed} = this.props
    fetchBatches()
    if (!subscribed) subscribeToBatches()
  }

  renderBatch(batch, index) {
    return <BatchItem key={index} { ...batch } />
  }

  render() {
    return(
      <main className="container">
        <Link to="/create-batch">
          <RaisedButton
            label="Create Batch"
            secondary={true}
            fullWidth={true} />
        </Link>
        <div className="batches">
          { this.props.batches.map(this.renderBatch) }
        </div>
      </main>
    )
  }
}


const mapStateToProps = ({ batches, subscriptions }) => ({
  batches,
  subscribed: subscriptions.includes('batches'),
})


export default connect(mapStateToProps, {
  fetchBatches,
  subscribeToBatches,
})(BatchesContainer)
