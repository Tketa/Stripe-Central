import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import PaymentRequestForm from './PaymentRequestForm';

import CardSection from './CardSection';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      'amount': 0,
      'currency': 'usd',
      'description': `Ly test charge on ${new Date()}`,
      'source': null
    }
  }
  async handleSubmit(ev) {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.updateStatus("Create token...")
    const tokenData = await this.props.stripe.createToken({ name: 'ly' });
    if (tokenData.error) {
      this.props.showError(tokenData.error.message);
      return
    }

    if (tokenData.token.id) {
      this.setState({
        'source': tokenData.token.id
      })
      const chargeDataDetails = {
        'amount': this.state.amount,
        'currency': this.state.currency,
        'description': this.state.description,
        'source': this.state.source
      }

      this.props.createCharge(chargeDataDetails);
    }
  }
  handleChange(e) {
    this.setState({
      amount: e.target.value
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <PaymentRequestForm />
        <div><input type='text' placeholder='Amount e.g 20$' onChange={this.handleChange} /></div>
        <button>PAY</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);