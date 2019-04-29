import React, {Component} from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';

const FEED_SEARCH_QUERY = gql`
    query FeedSearchQuery($filter: String!) {
        feed(filter: $filter) {
            links {
                id
                url
                description
                createdAt
                postedBy {
                    id
                    name
                }
                votes {
                    id
                    user {
                        id
                        name
                    }
                }
            }
        }
    }
`;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
          links: [],
          filter: ''
        };
    }

    executeSearch = async () => {
        const { filter } = this.state;
        const result = await this.props.client.query({
            query: FEED_SEARCH_QUERY,
            variables: { filter }
        });
        const links = result.data.feed.links;
        this.setState({ links });
    };

    render() {
        const { links } = this.state;
        return (
            <div>
                <div>
                    <input
                        type='text'
                        onChange={e => this.setState({ filter: e.target.value })}
                    />
                    <button onClick={() => this.executeSearch()}>Search</button>
                </div>
                {
                    links.map((link, index) => {
                        return (
                          <Link
                            key={link.id}
                            link={link}
                            index={index}
                          />
                        );
                    })
                }
            </div>
        );
    }
}

export default withApollo(Search);