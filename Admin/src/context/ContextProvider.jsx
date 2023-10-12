import { createContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
export const appContext = createContext();

export function ContextProvider({ children }) {
  const [isLoggedin, setIsLoggedin] = useState(false);

  const value = {
    isLoggedin,
    setIsLoggedin,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
