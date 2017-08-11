// src/recipes/BatchesContainer.test.js
import React from 'react'
import chai, { expect } from 'chai'
import spies from 'chai-spies'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import { BatchesContainer } from './BatchesContainer'
import BatchItem from './BatchItem'
import batches from '../seeds/batches'

chai.use(spies)
chai.use(chaiEnzyme())

describe('<BatchesContainer />', () => {
  const fetchBatches = chai.spy()
  const subscribeToBatches = chai.spy()

  const container = shallow(
    <BatchesContainer
      batches={batches}
      fetchBatches={fetchBatches}
      subscribeToBatches={subscribeToBatches} />
  )
  it('is wrapped in a div with class name "container"', () => {
    expect(container).to.have.className('container')
  })

  it('renders all batches as a BatchItem', () => {
    expect(container).to.have.exactly(4).descendants(BatchItem)
    expect(container).to.have.exactly(batches.length).descendants(BatchItem)
  })

  it('calls fetchRecipes and subscribeToBatches in componentWillMount', () => {
    fetchBatches.reset()
    subscribeToBatches.reset()

    shallow(
      <BatchesContainer
        batches={batches}
        fetchBatches={fetchBatches}
        subscribeToBatches={subscribeToBatches}  />)

    expect(fetchBatches).to.have.been.called.exactly.once()
    expect(subscribeToBatches).to.have.been.called.exactly.once()

  })
})
