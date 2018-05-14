import { Component } from 'react';

export default class Tab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.children
    }

}
