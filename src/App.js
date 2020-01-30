import React from 'react';
import Login from "./components/login/login";
import {Switch, Route} from "react-router-dom";
import Signup from "./components/signup/signup";
import AllBreeds from "./components/allBreead/allBread";

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/all-breeds/:breedName" component={AllBreeds}/>        
        <Route path="/all-breeds" component={AllBreeds}/>        
        <Route path="/" component={Login}/>        
        
      </Switch>
    </div>
  );
}

export default App;
