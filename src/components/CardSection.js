import React from 'react';
import {CardElement, CardCVCElement, CardExpiryElement, CardNumberElement, PaymentRequestButtonElement, PostalCodeElement} from 'react-stripe-elements';

class CardSection extends React.Component {
  constructor(props){
    super(props);
  }
  
  
  render() {
    const chargeDataDetails = {
      'amount': '200',
      'currency': 'usd',
      'description': `Ly test charge 200$ on ${new Date()}`,
      'source': 'aaa',
      'canMakePayment':true
  }
    return (
      <label>
        Card details
        <CardElement style={{base: {fontSize: '18px'}}} onReady={(el) => el.focus()} onChange={this.props.handleChange}/>
      </label>
    );
  }
};

export default CardSection;