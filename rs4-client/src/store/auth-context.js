import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createContextualCan } from '@casl/react';
import { defineAbility } from '@casl/ability';
import { useNavigate } from 'react-router-dom';
//import { useHistory } from "react-router-dom";

export const AbilityContext = React.createContext();
export const Can = createContextualCan(AbilityContext.Consumer);

const AuthContext = React.createContext({
  tokens: {},
  isLoggedIn: false,
  login: (tokens) => {},
  logout: () => {},
  profile: {},
  profileHandler: (profile) => {},
  ability: [],
  abilityHandler: (ability) => {}
});

export const AuthContextProvider = (props) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const [tokens, setTokens] = useState({ accessToken, refreshToken });

  const [profile, setProfile] = useState();
  const [ability, setAbility] = useState();

  const userIsLoggedIn = !!accessToken;
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  //const history = useHistory();
  //const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/central/auth/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        console.log(response.data);
        setProfile(response?.data?.user);
        abilityHandler(response?.data?.ability);
      })
      .catch((err) => {
        if (
          err.response?.data?.error?.statusCode == 401 ||
          err.response?.data?.error?.message === 'Unauthorized'
        ) {
          //history.push("/login");
          //navigate('/login'); // react router 6

          logoutHandler();
        }
      });
  }, []);

  const logoutHandler = () => {
    setTokens(null);
    setIsLoggedIn(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const loginHandler = (tokens, profile, ability) => {
    setTokens(tokens);
    setProfile(profile);
    abilityHandler(ability);
    setIsLoggedIn(true);
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  };

  const profileHandler = (data) => {
    setProfile(data);
  };
  const abilityHandler = (data) => {
    const generatedAbility = defineAbility((can, cannot) => {
      data.forEach(({ action, subject }) => {
        can(action, subject);
      });
    });
    setAbility(generatedAbility);
  };

  const contextValue = {
    tokens: tokens,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    profile,
    profileHandler,
    ability,
    abilityHandler
  };
  return (
    <AuthContext.Provider value={contextValue}>
      <AbilityContext.Provider value={ability}>{props.children}</AbilityContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthContext;
