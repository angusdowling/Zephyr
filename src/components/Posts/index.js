import React from 'react';
import Pagination from '../Pagination/index.js';
import Filter from '../Filter/index.js';
import { formatUrl, getData } from '../Request/index.js';
import List from '../List/index.js';

require( './style.scss' );

export default class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            total_count: 0,
            total_pages: 0,
            url: {
                protocol: "http",
                resource: "wp.local/wp-json/wp/v2",
                taxonomy: "posts",
                args: new Map([
                    ["per_page", 10],
                    ["page", 1],
                ]),
            },
        };

        this.getPosts = this.getPosts.bind(this);
        this.setPosts = this.setPosts.bind(this);
    }

    componentDidMount() {
        getData(formatUrl(this.state.url), this.setPosts);
    }

    setPosts(posts, headers) {
        this.setState({ posts: posts });
        this.setState({ total_count: +headers['x-wp-total'] });
        this.setState({ total_pages: +headers['x-wp-totalpages'] });
    }

    getPosts(event = null) {
        getData(formatUrl(this.state.url), this.setPosts);

        if(event){
            event.preventDefault();
        }
    }

    updateArgs(prop, value) {
        let url = this.state.url;

        if(value){
            url.args.set(prop, value);
        } else {
            url.args.delete(prop);
        }

        this.setState({ url: url });
    }
    
    render() {
        const paginationProps = {
            updateArgs : this.updateArgs.bind(this),
            pages      : this.state.total_pages,
        }

        const filterProps = {
            updateArgs : this.updateArgs.bind(this),
            getPosts   : this.getPosts,
            args       : this.state.url.args,
        }

        const listProps = {
            items : this.state.posts
        }

        return (
            <div className="posts">
                <form className="App" onSubmit={this.getPosts}>
                    <Filter {...filterProps} />
                    <List {...listProps} />
                    <Pagination {...paginationProps} />
                </form>
            </div>
        );
    }
}