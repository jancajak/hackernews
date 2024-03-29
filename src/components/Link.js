import React, {Component} from 'react';
import {AUTH_TOKEN} from '../constants';
import {timeDifferenceForDate} from '../utils';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';

const VOTE_MUTATION = gql`
    mutation VoteMutation($linkId: ID!) {
        vote(linkId: $linkId) {
            id
            link {
                votes {
                    id
                    user {
                        id
                    }
                }
            }
            user {
                id
            }
        }
    }
`;

class Link extends Component {
  render() {
    const { index, link } = this.props;
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return(
        <div className='flex mt2 items-start'>
            <div className='flex items-center'>
                <span className='gray'>{index + 1}.</span>
                {
                    authToken && (
                        <Mutation
                            mutation={VOTE_MUTATION}
                            variables={{ linkId: this.props.link.id }}
                            update={(store, { data: { vote } }) => this.props.updateSotreAfterVote(store, vote, this.props.link.id)}
                        >
                            {
                                voteMutation => (
                                    <div className='ml1 gray f11 pointer' onClick={voteMutation}>
                                        ▲
                                    </div>
                                )
                            }
                        </Mutation>
                    )
                }
            </div>
            <div className='ml1'>
                <div>
                    {link.description} ({link.url})
                </div>
            <div className='f6 lh-copy gray'>
                {link.votes.length} votes | by{' '}
                {
                    link.postedBy ?
                        link.postedBy.name
                        : 'Unknown'
                    }{' '}
                {timeDifferenceForDate(link.createdAt)}
            </div>
            </div>
        </div>
    );
  }
}

export default Link;
