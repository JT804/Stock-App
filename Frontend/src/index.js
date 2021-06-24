import React from 'react';
import ReactDOM from 'react-dom';
import Watchlist from './pages/watchlist/Watchlist';
import Details from './pages/details/Details';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

ReactDOM.render(
<div className="container">
    <div className="row justify-content-md-center">
      <div className="col-8">
        <div className="card-1">
          <Router>
            <Switch>
              <Route path="/watchlist">
                <Watchlist></Watchlist>
              </Route>

              <Route path="/details/:stockSymbol" children={<Details/>} />

              <Route path="/">
                <Watchlist></Watchlist>
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  </div>
  
  ,
  document.getElementById('root')
);

