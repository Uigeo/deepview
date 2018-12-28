import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import reducers from './modules';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(ReduxThunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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
