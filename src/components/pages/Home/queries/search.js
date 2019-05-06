import { gql } from 'apollo-boost';

// eslint-disable-next-line import/prefer-default-export
export const SEARCH_ITEMS = gql`
    query getSearchResults($query: String!, $entities: [SearchEntity], $cursor: String) {
        search(query: $query, entities: $entities, first: 10, after: $cursor) {
            edges {
                node {
                    displayLabel
                    imageUrl
                    href
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
`;
