// src/c/BatchItem.test.js
import React from 'react'
import chai, { expect } from 'chai'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import BatchItem from './BatchItem'
import batch from '../seeds/batch'

chai.use(chaiEnzyme())

describe('BatchItem component', () => {
  const container = shallow(<BatchItem { ...batch } />
)

  it('contains a the start and end dates', () => {
    expect(container).to.contain('Wed Feb 03 2016')
    expect(container).to.contain('Sat Feb 20 2016')
  })


  it('displays the number of students', () => {
		expect(container).to.contain(<p>3 Students</p>)
  })

})
