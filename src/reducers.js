import {combineReducers} from 'redux'

import AuthReducer from './auth/authReducer'
import SongReducer from './main/songs/songReducer'

const rootReducer = combineReducers({
    auth: AuthReducer,
    info: SongReducer
})

export default rootReducer