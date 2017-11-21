import React, { Component } from 'react';
import View from './View';
import { BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div id="main">
        <Router>
          <div id="content-container">
            <Route exact={true} path="/" component={View} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
