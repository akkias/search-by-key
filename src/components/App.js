import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Search from './Search';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true
    }
  }
  render() {
    return (
      <BrowserRouter>
        <>
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/" component={Search} isAuthenticated={this.state.isAuthenticated} exact />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
