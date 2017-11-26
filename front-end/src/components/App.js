import React, { Component } from 'react';
import Category from './View/Category';
import AddQuestion from './View/Add/AddQuestion';
import Game from './Game';
import { BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div id="main">
        <Router>
          <div id="content-container">
            <Route exact={true} path="/" component={Category} />
            <Route path="/add-question/:categoryName" component={AddQuestion}/>
            <Route path="/play-game" component={Game}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
