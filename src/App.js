import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Turmas from "./Screens/Turmas";
// import Nav from "./Components/Nav"
import Gerenciar from "./Screens/Gerenciar";
// import Boletim from './Screens/Boletim';
import Settings from "./Screens/Settings";

import './App.css'
import Turma from "./Screens/Turma";
import Student from "./Screens/Student";
import Navegacao from "./Components/Nav";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <div className="bg">
              <Navegacao />
              <Route exact path="/turmas" component={Turmas} />
              <Route exact path="/turmas/:id" component={Turma} />
              <Route exact path="/turmas/:id/:alunoId" component={Student} />
              <Route exact path="/diario" component={Gerenciar} />
              <Route exact path="/boletim" component={Gerenciar} />
              <Route exact path="/config" component={Settings} />
              <Route exact path="/" component={Home} />
              <Footer />
            </div>
          </Switch>
        </Router>  
    </div>
  );
}

export default App;
