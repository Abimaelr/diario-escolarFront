import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Turmas from "./Screens/Turmas";
import Nav from "./Components/Nav"

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/turmas" component={Turmas} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    
    </div>
  );
}

export default App;
