import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Dashboard from './components/dashboard/Dashboard';
import Events from './components/events/Events';
import Orders from './components/orders/Orders';
import Customers from './components/customers/Customers';
import Reviews from './components/reviews/Reviews';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif'
    ].join(','),
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Dashboard></Dashboard>
          </Route>
          <Route path="/events">
            <Events></Events>
          </Route>
          <Route path="/orders">
            <Orders></Orders>
          </Route>
          <Route path="/customers">
            <Customers></Customers>
          </Route>
          <Route path="/reviews">
            <Reviews></Reviews>
          </Route>
        </Switch>      
    </div>
    </ThemeProvider>
  );
}

export default withRouter((App));
