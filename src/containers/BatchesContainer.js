// src/containers/BatchesContainer.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BatchItem from './BatchItem'
import Title from '../components/Title'
import subscribeToBatches from '../actions/batches/subscribe'
import fetchBatches from '../actions/batches/fetch'

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
      <div className="batches wrapper">
        <header>
          <Title content="Batches" />
        </header>

        <main>
          { this.props.batches.map(this.renderBatch) }
        </main>
      </div>
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
