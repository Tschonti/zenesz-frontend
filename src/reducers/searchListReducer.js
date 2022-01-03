import _ from 'lodash'

import { UPDATE_WITH_ID, UPDATE_WITH_WRONG_ID, UPDATE_WITH_TERM, CANCEL_SEARCH } from "../actions/types"

const defaultState = {
    list: [],
    validSearch: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
    switch(action.type) {
        case UPDATE_WITH_ID:
            return { list: [action.payload.id], validSearch: true }
        case UPDATE_WITH_WRONG_ID:
            return { list: [], validSearch: true }
        case UPDATE_WITH_TERM:
            return { list: _.uniq(action.payload.map(song => song.id)), validSearch: true}
        case CANCEL_SEARCH:
            return defaultState
        default:
            return state
    }
}