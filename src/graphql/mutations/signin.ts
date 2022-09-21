import { gql } from "@apollo/client";

const SIGN_IN = gql`
mutation logIn($email: String!, $password: String!) {
    login(data: {
      email: $email
      password: $password
    }) {
      accessToken
      refreshToken
    }
  }
`;

export default SIGN_IN;
