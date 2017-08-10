// src/reducers/index.js

import loading from './loading'
import loadError from './loadError'
import subscriptions from './subscriptions'
import currentUser from './currentUser'
import batches from './batches'
import currentBatch from './currentBatch'
import currentStudents from './currentStudents'

export default {
  loading,
  loadError,
  batches,
  currentUser,
  currentBatch,
  subscriptions,
  currentStudents,
}


// don't forget to import currentStudent and export it
