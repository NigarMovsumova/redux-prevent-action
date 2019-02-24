import {createStore, applyMiddleware, compose} from 'redux';
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';

const preventActionMiddleWare = store=> next=> action=>{

    if (store.getState().counter%2==0){
        let mutatedAction= action;
        console.log('type= '+mutatedAction.type);
        mutatedAction.type='IGNORED_ACTION';
        next(mutatedAction);
    }
    else {
        next(action);
    }
    console.log("Store condition after action: ");
    console.log(store.getState());
    console.log('\n');
    console.log("Middleware triggered this action:", action.type);
    //+1 is for initial condition
    console.log("Count of dispatched actions at " + new Date() + " = "+ (store.getState().counter))
    console.log('\n');
}

const composeEnhancers= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk, preventActionMiddleWare)));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector("#root")
);
