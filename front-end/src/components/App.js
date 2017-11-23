import React, { Component } from 'react';
import Category from './Category';
import Questions from './Questions';
import { BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div id="main">
        <Router>
          <div id="content-container">
            <Route exact={true} path="/" component={Category} />
            <Route path="/category-questions/:categoryId" component={Questions} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
