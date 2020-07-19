import React, { Component } from 'react';

import Home from './Home.js';

import { Route ,Switch } from 'react-router-dom';
import OpenPosition from './OpenPosition.js';
import PayOut from './PayOut.js';

class App extends Component {

  render() {
    return (
      <div>
        <Switch>
         <Route path='/' exact component={Home}/> 
         <Route path='/safeBorrow' exact component={OpenPosition}/>
         
          <Route path='/payOut' exact component={PayOut}/>

         </Switch>
      </div>
      
    );
      }
}
export default App;