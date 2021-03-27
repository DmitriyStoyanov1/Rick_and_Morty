import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { Box } from '@material-ui/core';
import { Header } from './components';
import {
  StartPage,
  CharactersPage,
  EpisodesPage,
  LocationsPage,
  WatchListPage,
} from './pages';

import './index.css';

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <Box minHeight="100vh">
      <Header />

      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route exact path="/characters" component={CharactersPage} />
        <Route exact path="/episodes" component={EpisodesPage} />
        <Route exact path="/locations" component={LocationsPage} />
        <Route exact path="/list" component={WatchListPage} />
      </Switch>
    </Box>
  </Router>,
  document.getElementById('root')
);
