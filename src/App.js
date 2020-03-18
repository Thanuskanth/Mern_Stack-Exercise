import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExersiceList from "./compnent/exercise-list-component";
import EditExercise from "./compnent/edit-exercise-component";
import CreateExercise from "./compnent/create-exercise-component";
import CreateUser from "./compnent/user-component";
import Navbar from "./compnent/navbar-component";
import './App.css';

function App() {
  return (
    <div >
      <Router>
        <Navbar />
        <br />
        <Route path="/" exact component={ExersiceList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </Router>
    </div>
  );
}

export default App;
