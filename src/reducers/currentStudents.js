// src/reducers/currentStudent

import { GOT_STUDENTS } from '../actions/batches/get'

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case GOT_STUDENTS :
      return payload.students

    default :
    return state
  }
}
