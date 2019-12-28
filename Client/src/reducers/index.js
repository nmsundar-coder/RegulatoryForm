import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import { loadingBarReducer } from 'react-redux-loading-bar'
import immediateRelativeReducer from './immediateRelativeReducer'
import otherPersonsReducer from './otherPersonReducer.js'
import annualDisclosureReducer from './annualDisclosureReducer'


export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    loadingBar: loadingBarReducer,
    immediateRelatives: immediateRelativeReducer,
    otherPersons:otherPersonsReducer,
    annualDisclosure:annualDisclosureReducer

});
