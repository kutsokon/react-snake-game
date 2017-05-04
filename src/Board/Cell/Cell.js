import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Cell extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <div className={"board-cell " +
            (this.props.snake ? 'snake ' : '') +
            (this.props.head ? 'head ' : '') +
            (this.props.food ? 'food ' : '')}></div>
    };
}

export default Cell;
