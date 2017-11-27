import React, { Component } from 'react';
import Category from './View/Category';
import Home from './Home';
import Score from './Score';
import AddQuestion from './View/Add/AddQuestion';
import Game from './Play/Game';
import { BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div id="main">
        <Router>
          <div id="content-container">
            <Route exact={true} path="/" component={Home} />
            <Route path="/add-question/:categoryName" component={AddQuestion}/>
            <Route path="/play-game" component={Game}/>
            <Route path="/view-scores" component={Score}/>
            <Route path="/category" component={Category}/>

          </div>
        </Router>
      </div>
    );
  }
}

export default App;
