import React from 'react';
import { formatUrl, getData } from '../Request/index.js';

require( './style.scss' );

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories : [],
            url: {
                protocol: "http",
                resource: "wp.local/wp-json/wp/v2",
                taxonomy: "categories",
                args: new Map([
                    // ["per_page", 10],
                    // ["page", 1],
                ]),
            },
        };

        this.setCategories = this.setCategories.bind(this);
        this.updatePosts   = this.updatePosts.bind(this);
    }

    componentDidMount() {
        getData(formatUrl(this.state.url), this.setCategories);
    }

    setCategories(categories, headers) {
        this.setState({ categories: categories });
    }

    updatePosts(event) {
        let categories = new Set(this.props.args.has("categories") && this.props.args.get("categories").split(",") || []);

        if(event.target.checked){
            categories.add(event.target.value);
        } else {
            categories.delete(event.target.value);
        }

        categories = [...categories].join(",");

        this.props.updateArgs("categories", categories);
        this.props.getPosts();
    }

    render() {
        return (
            <div className="filter">
                <ul>
                {
                    this.state.categories.map((category, index) => 
                        <li key={index}>
                            <input value={category.id} type="checkbox" name={category.slug} onChange={this.updatePosts}/>
                            <label htmlFor={category.slug}>{category.name}</label>
                        </li>
                    )
                }
                </ul>
            </div>
        );
    }
}