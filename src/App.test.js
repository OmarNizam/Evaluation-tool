// src/App.test.js
import React from 'react'
import { shallow } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import App from './App'
import BatchesContainer from './containers/BatchesContainer'

chai.use(chaiEnzyme())

describe('<App />', () => {
  const app = shallow(<App />)

  it('wraps everything in a div tag', () => {
    expect(app).to.have.tagName('div')
  })

  it('contains the RecipesContainer', () => {
    expect(app).to.have.descendants(BatchesContainer)
  })
})
