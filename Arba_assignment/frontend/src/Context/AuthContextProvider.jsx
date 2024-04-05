


// import React, { useState, createContext, useEffect } from "react";

// export const AuthContext = createContext();

// const AuthContextProvider = ({ children }) => {
//   const [isAuth, setIsAuth] = useState(false);

//   useEffect(() => {
//     // Check if the token exists in local storage
//     const token = localStorage.getItem("token");
//     if (token) {
//       // If token exists, set isAuth to true
//       setIsAuth(true);
//     } else {
//       // If token doesn't exist, set isAuth to false
//       setIsAuth(false);
//     }
//   }, []); // Run this effect only once when the component mounts

//   const login = () => {
//     setIsAuth(true);
//     // Additional logic for storing token if needed
//   };

//   const logout = () => {
//     setIsAuth(false);
//     // Additional logic for clearing token if needed
//     localStorage.removeItem("token"); // Remove token from local storage on logout
//   };

//   return (
//     <AuthContext.Provider value={{ isAuth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContextProvider;




import React, { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    }
  }, []);

  const login = () => {
    setIsAuth(true);
    // Additional logic for storing token if needed
    localStorage.setItem("token", "your_token_here");
  };

  const logout = () => {
    setIsAuth(false);
    // Additional logic for clearing token if needed
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
