import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
// import { UserIsAuthenticated } from './util/wrappers.js'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

// import ReactGA from 'react-ga';

// Layouts
import App from './App'
// import Home from './layouts/home/Home'
// import DashboardContainer from './layouts/dashboard/DashboardContainer'
// import CreateAssetContainer from './layouts/create-asset-process/CreateAssetContainer'

// Redux Store
// import store from './store'

// import MarketplaceListing from './layouts/marketplace-listing/MarketplaceListing';
// import MarketplaceCheckout from './layouts/marketplace-checkout/MarketplaceCheckout';

// Model
// import AssetsManager from './model/AssetsManager'
// import MyStoresManager from './model/MyStoresManager'
// import UserProfileManager from './model/UserProfileManager'

import * as reducers from './store/reducers';
import ShowCampaign from './components/show-campaign/ShowCampaign';
// import CreateEventContainer from './components/create-event/CreateEventContainer';
// import MyEventsContainer from './components/my-events/MyEventsContainer';
// import CreateTicketContainer from './components/create-ticket/CreateTicketContainer';
// import MyCatalogContainer from './layouts/my-catalog/MyCatalogContainer';


const initStore = (reducer, initialState) => {
    if (typeof window === 'undefined') {
        return createStore(combineReducers(reducers), composeWithDevTools(applyMiddleware(thunk)));
    } else {
        if (!window.store) {
            window.store = createStore(combineReducers(reducers), composeWithDevTools(applyMiddleware(thunk)));
        }
        return window.store
    }
}
const store = initStore();


const history = syncHistoryWithStore(browserHistory, store)

// google analytics
// ReactGA.initialize('UA-116298591-2');
// ReactGA.pageview(window.location.pathname + window.location.search);
ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={ShowCampaign} />
                {/* <Route path="create-event" component={CreateEventContainer} />
                <Route path="my-events" component={MyEventsContainer} />
                <Route path="create-ticket" component={CreateTicketContainer} /> */}
            </Route>
        </Router>
    </Provider>
),
    document.getElementById('root')
)
