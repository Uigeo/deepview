import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import reducers from './modules';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import storeSynchronize from 'redux-localstore';
import { createLogger } from 'redux-logger';

const logger = createLogger();

const store = createStore(reducers, applyMiddleware(ReduxThunk, logger), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
storeSynchronize(store);

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>
    
    , document.getElementById('root'));

const renderApp = () => {
    ReactDOM.hydrate((
            <App />
    ), document.getElementById('root'));
    };

if (module.hot) {
    module.hot.accept('./App', () => renderApp());
    }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
