import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { get } from './utils/cookie';

const httpLink = createHttpLink({
  uri: 'https://nestjs-example-app.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = get('react_apollo_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const client = new ApolloClient({
  // uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
  // uri: 'https://nestjs-example-app.herokuapp.com/graphql',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
