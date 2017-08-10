import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store, { history } from './store'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import injectTapEventPlugin from 'react-tap-event-plugin'
import BatchEditor from './containers/BatchEditor'
import StudentEditor from './containers/StudentEditor'
import { Router, Route, IndexRoute } from 'react-router'
import BatchesContainer from './containers/BatchesContainer'
import Batch from './containers/Batch'
import Student from './containers/Student'
import SignIn from './components/SignIn'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={BatchesContainer} />
        <Route path="/batches/:batchId" component={Batch} />
        <Route path="/batches/:batchId/students/:studentId" component={Student} />
        <Route path="/create-batch" component={BatchEditor} />
        <Route path="/batches/:batchId/create-student" component={StudentEditor} />
        <Route path="/sign-in" component={SignIn} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()


// we will use later path="batches/:batchId" component={Batch}
// we will use later path for component={Student}
