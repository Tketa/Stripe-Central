import React from 'react';
import DataTable from './DataTable'
export default class Payments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: []
        };
    }
    componentDidMount() {
        this.getPayments();
    }
    async getPayments() {
        this.setState({
            loading: true,
        })

        const chargesData = await this.props.getSecret("charges");

        this.setState({
            loading: false,
            data: chargesData.data
        })
    }
    render() {
        const columns = ['Id', 'Amount', 'Description', 'Refunded', 'Disputes', 'Refund'];
        const data = this.state.data.map((item) => {
            return [
                item.id,
                item.amount,
                item.description,
                item.refunded,
                item.disputes,
                item.refund
            ]
        })
        return (
            <Payment columns={columns} data={data} loading={this.state.loading} />
        )
    }
}

export class Payment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            {this.props.loading ? <div>Loading...</div> : 
                <DataTable columns={this.props.columns} data={this.props.data} />
            }
            </div>
            )
    }
}