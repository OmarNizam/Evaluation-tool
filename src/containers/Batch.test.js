// src/containers/Batch.test.js


import React from 'react'
import chai, { expect } from 'chai'
import spies from 'chai-spies'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
// import muiTheme from '../styles/theme'

import { BatchPage } from './BatchPage'
import RaisedButton from 'material-ui/RaisedButton'
import StudentItem from './StudentItem'
import batch from '../seeds/batch'

chai.use(spies)
chai.use(chaiEnzyme())

describe('<BatchPage />', () => {

  const batchId =  batch._id
  const fetchBatches = chai.spy()
  const subscribeToBatches = chai.spy()
  const getBatch = chai.spy()

  const container = shallow(
    <BatchPage {...batch}
      params={{batchId: batchId}}
      batch={batch}
      fetchBatches={fetchBatches}
      getBatch={getBatch}
      subscribeToBatches={subscribeToBatches}/>
  )
  it('is wrapped in a div with class name "batch"', () => {
    expect(container).to.have.className('batch')
  })

  it('renders random student button', () => {
    expect(container).to.have.descendants(RaisedButton)
  })

  it('renders the colours percentage boxes', () => {
    expect(container).to.have.exactly(3).descendants(".percentage-students")
  })

  it('renders all students in batch as StudentItem', () => {
    expect(container).to.have.exactly(3).descendants(StudentItem)
    expect(container).to.have.exactly(batch.students.length).descendants(StudentItem)
  })

  it('calls getBatch componentWillMount', () => {
    getBatch.reset()

    shallow(<BatchPage {...batch}
        params={{batchId: batchId}}
        batch={batch}
        fetchBatches={fetchBatches}
        getBatch={getBatch}
        subscribeToBatches={subscribeToBatches}/>)

    expect(getBatch).to.have.been.called.exactly.once()

  })

})
