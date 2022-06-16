const INITIAL_STATE = { info: null }

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'INFO_FETCHED':
            return { ...state, info: action.payload.data }
        default:
            return state
    }
}