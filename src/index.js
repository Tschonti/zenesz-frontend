import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import { save, load } from "redux-localstorage-simple"
import 'semantic-ui-css/semantic.min.css'

import combinedReducer from './reducers'
import App from './components/App'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware  =composeEnhancers(applyMiddleware(save({ states: ["playlist"], debounce: 500}), reduxThunk))(createStore)
const store = createStoreWithMiddleware(combinedReducer, load({ states: ["playlist"]}))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))