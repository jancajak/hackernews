import React, {Component} from 'react';
import LinkList from '../components/LinkList';
import '../styles/App.css';
import CreateLink from '../components/CreateLink';
import {Route, Switch} from 'react-router';
import Header from '../components/Header';
import Login from '../components/Login';

class App extends Component {
  render() {
    return (
        <div className='center w85'>
          <Header/>
          <div className='ph3 pv1 background-gray'>
            <Switch>
              <Route exact path='/' component={LinkList} />
              <Route exact path='/create' component={CreateLink} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </div>
        </div>
    );
  }
}

export default App;
