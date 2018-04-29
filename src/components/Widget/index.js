import React from 'react';
import Posts from '../Posts/index.js';

require( './style.scss' );

export default class Admin extends React.Component {
    render() {
        return (
            <div className="zephyr">
                <Posts />
			</div>
        );
    }
}