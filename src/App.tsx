import Home from './pages/home';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={Home}/>
      </Switch>
    </BrowserRouter>
  )
}