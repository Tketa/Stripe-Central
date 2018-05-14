// MyStoreCheckout.js
import React from 'react';
import {Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from './CheckoutForm';

class MyStoreCheckout extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm   {...this.props}/>
      </Elements>
    );
  }
}

export default MyStoreCheckout;