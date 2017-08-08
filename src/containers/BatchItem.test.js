// src/c/BatchItem.test.js

import React from 'react'
 import chai, { expect } from 'chai'
 import { shallow } from 'enzyme'
 import chaiEnzyme from 'chai-enzyme'
 import BatchItem from './BatchItem'

 chai.use(chaiEnzyme())

 const batch = {
   _id: '1234',
   title: 'Batch 1',
   startDate: "August 7",
   endDate: "September 7",
   students: ["Mat", "Tania", "Omar", "Mojgan", "Benmar"],
 }
 describe('<BatchItem />', () => {
  const container = shallow(<BatchItem { ...batch } />)

  it('is wrapped in a article tag with class name "batch"', () => {
    expect(container).to.have.tagName('article')
    expect(container).to.have.className('batch')
  })

  it('contains a the title', () => {
    expect(container.find('h1')).to.have.text(batch.title)
  })

})
