/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

import UserLogin from '../models/User/UserLogin';
import Token from '../models/User/Token';

interface AuthContextData {
  user: Token;
  signIn(credentials: UserLogin): Promise<void>;
  signOut(): void;
  updateUser(newToken: Token): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [dataToken, setDataToken] = useState<Token>(() => {
    const accessToken = localStorage.getItem('@IHunger:accessToken');
    const expiresIn = Number(localStorage.getItem('@IHunger:expiresIn'));
    const userToken = JSON.parse(
      localStorage.getItem('@IHunger:userToken') as string,
    );

    if (accessToken && expiresIn && userToken) {
      api.defaults.headers.authorization = `Bearer ${accessToken}`;
      const result: Token = {
        data: {
          accessToken,
          expiresIn,
          userToken,
        },
        success: true,
      };

      return result;
    }
    return {} as Token;
  });

  const signOut = useCallback(() => {
    localStorage.removeItem('@IHunger:accessToken');
    localStorage.removeItem('@IHunger:expiresIn');
    localStorage.removeItem('@IHunger:userToken');

    setDataToken({} as Token);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('auth/login', {
      email,
      password,
    });

    const result: Token = response.data;

    localStorage.setItem('@IHunger:accessToken', result.data.accessToken);
    localStorage.setItem(
      '@IHunger:expiresIn',
      result.data.expiresIn.toString(),
    );
    localStorage.setItem(
      '@IHunger:userToken',
      JSON.stringify(result.data.userToken),
    );

    api.defaults.headers.authorization = `Bearer ${result.data.accessToken}`;

    setDataToken(result);
  }, []);

  const updateUser = useCallback(
    (newToken: Token) => {
      localStorage.setItem('@IHunger:accessToken', newToken.data.accessToken);
      localStorage.setItem(
        '@IHunger:expiresIn',
        newToken.data.expiresIn.toString(),
      );
      localStorage.setItem(
        '@IHunger:userToken',
        JSON.stringify(newToken.data.userToken),
      );

      setDataToken(newToken);
    },
    [setDataToken, dataToken],
  );

  return (
    <AuthContext.Provider
      value={{
        user: dataToken,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
