import React from 'react';
require( './style.scss' );

export default class Pagination extends React.Component {
    pagination() {
        let items = [];

        for(let i = 0; i < this.props.pages; i++){
            items.push(
                (
                    <li key={i}>
                        <button key={i} data-page={i + 1} onClick={(e) => this.props.updateArgs("page", e.target.dataset.page)}>{i + 1}</button>
                    </li>
                )
            );
        }

        return items;
    }

    render() {
        return (
            <ul className="pagination">
                {this.pagination()}
            </ul>
        );
    }
}