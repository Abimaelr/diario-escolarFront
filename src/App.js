import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Turmas from "./Screens/Turmas";
import Nav from "./Components/Nav"
import Gerenciar from "./Screens/Gerenciar";
import Boletim from './Screens/Boletim';
import Settings from "./Screens/Settings";

import Provider from './Context/provider';

function App() {
  return (
    <div className="App">
      <Router>
        <Provider>
          <Nav />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/turmas" component={Turmas} />
            <Route exact path="/diario" component={Gerenciar} />
            <Route exact path="/boletim" component={Gerenciar} />
            <Route exact path="/config" component={Settings} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Provider>
      </Router>
    
    </div>
  );
}

export default App;
