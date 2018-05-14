import React from 'react';

export default class DataTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const columns = this.props.columns.map((column, index) =>
            <th key={index}>{column} </th>
        )
        const data = this.props.data.map((item, index) => {
            const tds = item.map((td, index) => {
                return <td key={index}>{td}</td>;
            })
            return <tr key={index}>
                {tds}
            </tr>
        })
        return (
            <table>
                <thead>
                    <tr>
                        {columns}
                    </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
            </table>
        )
    }
}