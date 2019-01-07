import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import './assets/styles/app.scss';
import {mcuCharacters} from './reducers'
import App from './components/App';

const rootReducer = combineReducers({mcuCharacters});
export const store = createStore(rootReducer);


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
