import React, { Component } from 'react';
import { withStripe } from './StripeApi'
import Tabs from './Tabs'
import Tab from './Tab'
import Checkouts from './components/Checkouts'
import Payments from './components/Payments'
import './App.css';

const { publicKey , secretKey} = require('./env.json');

const SuperCheckouts = withStripe(Checkouts, publicKey, secretKey);
const SuperPayments = withStripe(Payments, publicKey, secretKey);



class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tabs>
        <Tab name="Checkouts">
          <SuperCheckouts />
        </Tab>
        <Tab name="Payments">
          <SuperPayments />
        </Tab>
      </Tabs>
    );
  }
}
export default App;
