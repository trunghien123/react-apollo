import { gql } from '@apollo/client';

const GET_PROFILE = gql`
  query Me {
    me {
      id
      email
      firstname
      lastname
      heroes {
        id
        realName
        alterEgo
      }
    }
  }
`;
export default GET_PROFILE;
