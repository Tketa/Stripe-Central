import React from 'react';
import './App.css';
import { TabList, Tab } from './Tabs'

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'Checkout',
            tabs: [],
            orgs: []
        };
    }

    select(item) {
        this.setState({
            selected: item.target.textContent
        });
      }
    
    componentDidMount() {

        this.setState({
            tabs: {
                "Checkout": <h1>This is Checkout</h1>,
                "Payment": <h1>This is Payment</h1>,
                "Disputes": <h1>This is Disputes</h1>
            }
        })
    }
    render() {
        const tabs = Object.keys(this.state.tabs).map((item, index) => {
            const className = (item === this.state.selected) ? "selected" : "unselected";
            return <h1 key={index} onClick={this.select.bind(this)} className={className}>{item}</h1>
        })
       
        const body = this.state.tabs[this.state.selected];

        return (
            <div className="holder">
                <div className="tabs">
                    {tabs}
                </div>
                <div className="body">
                    {body}
                </div>
            </div>
        )
    }
}