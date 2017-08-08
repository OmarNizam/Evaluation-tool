// src/containers/BatchesContainer.js

import React, { PureComponent } from 'react'
import BatchItem from './BatchItem'
import Title from '../components/Title'

class BatchesContainer extends PureComponent {
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
          { this.props.batches.map(this.renderBatch)}
        </main>
      </div>
    )
  }
}
export default BatchesContainer
