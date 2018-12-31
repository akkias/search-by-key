import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/search" component={Search} />
        </>
      </BrowserRouter>
    );
  }
}

export default App;
