import { gql } from '@apollo/client';

const VOTE_HERO = gql`
  mutation VoteHero($heroId: String!) {
    voteHero(heroId: $heroId) {
      id
    }
  }
`;

const CREATE_HERO = gql`
  mutation CreateHero($realName: String!, $alterEgo: String!) {
    createHero(data: { realName: $realName, alterEgo: $alterEgo }) {
      id
      realName
      alterEgo
      image
      published
    }
  }
`;

const REMOVE_HERO = gql`
  mutation RemoveHero($heroId: String!) {
    removeHero(heroId: $heroId) {
      id
    }
  }
`;
export { VOTE_HERO, CREATE_HERO, REMOVE_HERO };
