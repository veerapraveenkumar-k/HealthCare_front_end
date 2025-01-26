import { Switch } from 'react-router-dom/cjs/react-router-dom.min'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import Patient from './components/Patient'
import Admin from './components/Admin'
import Doctor from './components/Doctor'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Unauthorized from './components/Unauthorized'
import NotFound from './components/NotFound'
import Redirection from './components/Redirection'
import Staff from './components/Staff'
import './App.css';

const App  = () => {
  return (
    <Switch>
      <Route exact path='/login' component={Login}/>
      <Route exact path="/" component={Home} />
      <Route exact path="/unauthorized" component={Unauthorized}/>
      <Route exact path="/create-account" component={CreateAccount}/>
      <ProtectedRoute exact path="/patient-acc" component={Patient} />
      <ProtectedRoute exact path="/admin" component={Admin}/>
      <ProtectedRoute exact path="/doctor" component={Doctor}/>
      <ProtectedRoute exact path="/staff" component={Staff}/>
      <Route exact path="/not-found" component={NotFound}/>
      <Route path="" component={Redirection}/>
    </Switch>
  )
}
export default App;
