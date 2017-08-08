import React, { PureComponent } from 'react'
import BatchesContainer from './containers/BatchesContainer'
import Batches from './seeds/batches'
import './App.css'

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <BatchesContainer batches={ Batches } />
      </div>
    );
  }
}

export default App;
