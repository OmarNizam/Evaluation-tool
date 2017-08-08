import React, { PureComponent } from 'react';
import BatchesContainer from './containers/BatchesContainer'

class App extends PureComponent {
  updatebatch(id, update) {
    // We will clean this up later
  }
  render() {
    return (
      <div className="App">
        <BatchesContainer
          updatebatch={ this.updatebatch.bind(this) } />
      </div>
    );
  }
}

export default App;
