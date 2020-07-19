import React, { Component } from 'react';
import './Home.css';


import { Link } from 'react-router-dom';



class Home extends Component {

  render() {
    return (
      <div>
      <h1 className='h1'>Compound Registry</h1>

<Link to='/safeBorrow'><button type="submit" className="button">Open Compound Position</button></Link>

<Link to='/payOut'><button type="submit" className="buttonn">Pay Out and Withdraw</button></Link>


</div>
    );
  }
}

export default Home;   