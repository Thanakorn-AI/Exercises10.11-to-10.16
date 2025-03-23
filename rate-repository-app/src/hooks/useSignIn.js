// src/hooks/useSignIn.js
const { useMutation, useApolloClient } = require('@apollo/client');
const { AUTHENTICATE } = require('../graphql/queries');
const useAuthStorage = require('./useAuthStorage');

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });

    const accessToken = data?.authenticate?.accessToken;
    if (accessToken) {
      await authStorage.setAccessToken(accessToken);
      apolloClient.resetStore();
    }

    return data;
  };

  return [signIn, result];
};

module.exports = useSignIn;