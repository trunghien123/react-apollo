import { gql } from '@apollo/client';

const GET_LIST_HEROS = gql`
  query GetFeed {
    searchHeroes(
      query: ""
      after: ""
      first: 10
      orderBy: { direction: desc, field: usersVoted }
      skip: 0
    ) {
      edges {
        cursor
        node {
          id
          realName
          alterEgo
          image
          published
          usersVoted {
            firstname
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;

const GET_HERO_DETAILS = gql`
  query Hero($heroId: String!) {
    hero(heroId: $heroId) {
      id
      realName
      alterEgo
      image
      published
      usersVoted {
        firstname
      }
    }
  }
`;

export { GET_LIST_HEROS, GET_HERO_DETAILS };
