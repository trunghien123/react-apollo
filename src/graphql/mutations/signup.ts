import { gql } from "@apollo/client";

const SIGN_UP = gql`
mutation signUp($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
    signup(data: {
      email: $email
      firstname: $firstName
      lastname: $lastName
      password: $password
    }) {
      accessToken
      refreshToken
    }
  }
`;

export default SIGN_UP;
