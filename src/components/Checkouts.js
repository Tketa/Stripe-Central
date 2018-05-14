import React from 'react';

import { StripeProvider } from 'react-stripe-elements';

import MyStoreCheckout from './MyStoreCheckout';


export default class Checkouts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            latestCharge: "None",
            stripe: null,
            publicKey: this.props.publicKey

        };
        this.showError = this.showError.bind(this);
        this.updateStatus = this.showError.bind(this);
        this.createCharge = this.createCharge.bind(this);
    }
    showError(error) {
        this.setState({
            loading: false,
            latestCharge: `${error}`
        })
        return;
    }

    updateStatus(status) {
        this.setState({
            latestCharge: `${status}`
        })
        return;
    }

    async createCharge(creditCardDetails) {

        this.setState({
            loading: true,
            latestCharge: "Creating charge..."
        })

        const chargeData = await this.props.postSecret('charges', creditCardDetails);

        if (chargeData.ok == false) {
            this.showError(chargeData.statusText);
            return;
        }

        this.setState({
            latestCharge: chargeData.id,
            loading: false
        })



    }
    componentWilldMount() {
        if (window.Stripe) {
            this.setState({ stripe: window.Stripe(this.props.publicKey) });
        } else {
            document.querySelector('#stripe-js').addEventListener('load', () => {
                // Create Stripe instance once Stripe.js loads
                this.setState({ stripe: window.Stripe(this.props.publicKey) });
            });
        }
    }

    render() {
        return (
            <div>
                <StripeProvider apiKey={this.props.publicKey} >
                    <MyStoreCheckout updateStatus={this.updateStatus} showError={this.showError} createCharge={this.createCharge} stripe={this.state.stripe} />
                </StripeProvider>
                <h2>Status: {this.state.latestCharge}</h2>
            </div>
        )
    }
}