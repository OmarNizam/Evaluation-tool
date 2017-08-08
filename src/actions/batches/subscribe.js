// src/actions/batches/subscribe.js
import API from '../../api'

export const SUBSCRIBED_TO_BATCHES_SERVICE = 'SUBSCRIBED_TO_BATCHES_SERVICE'
export const BATCHES_CREATED = 'BATCHES_CREATED'
export const BATCHES_UPDATED = 'BATCHES_UPDATED'
export const BATCHES_REMOVED = 'BATCHES_REMOVED'

const api = new API()
const batches = api.service('batches')

export default () => {
  return (dispatch) => {
    batches.on('created', (batch) => { dispatch(createdBatch(batch)) })
    batches.on('updated', (batch) => { dispatch(updatedBatch(batch)) })
    batches.on('patched', (batch) => { dispatch(updatedBatch(batch)) })
    batches.on('removed', (batch) => { dispatch(removedBatch(batch)) })

    dispatch({ type: SUBSCRIBED_TO_BATCHES_SERVICE })
  }
}

const createdBatch = (batch) => {
  return {
    type: BATCHES_CREATED,
    payload: batch
  }
}

const updatedBatch = (batch) => {
  return {
    type: BATCHES_UPDATED,
    payload: batch
  }
}

const removedBatch = (batch) => {
  return {
    type: BATCHES_REMOVED,
    payload: batch
  }
}
