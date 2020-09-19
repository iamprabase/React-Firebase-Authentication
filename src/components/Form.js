import React, { useState, useEffect } from 'react'
import firebaseInit from "../firebaseConfig";
import "firebase/auth";

export default function Form({ isAuhtenticated, setIsAuthenticated }) {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [globalError, setGlobalError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn();
  }

  const signIn = () => {
    clearErrors();
    firebaseInit
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
            setGlobalError(err.message);
            break;
        }
      });
  };

  const signUp = () => {
    clearErrors();
    firebaseInit
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.codes) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
            setGlobalError(err.message);
            break;
        }
      });
  };

  const signOut = () => {
    firebaseInit.auth().signOut();
  };

  const authListener = () => {
    firebaseInit.auth().onAuthStateChanged((usr) => {
      if (usr) {
        setUser(usr);
        setIsAuthenticated(true);
        clearInputs();
      } else {
        setUser({});
        setIsAuthenticated(false);
      }
    });
  };

  useEffect(() => {
    authListener();
    return () => {
      authListener();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  return (
    <>
      {!isAuhtenticated ? (
        ''
       ) : (
         <div className="container-login100-form-btn">
             <button onClick={signOut} type="submit" className="login100-form-btn">
             Logout
           </button>
         </div>
      )}
      <form className="login100-form validate-form" onSubmit={handleSubmit}>
          <div className="wrap-input100 validate-input m-b-26">
            <span className="label-input100">Username</span>
            <input
              className="input100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="Enter email"
            />
            {emailError && <span className="focus-input100"> {emailError} </span>}
          </div>

          <div className="wrap-input100 validate-input m-b-18">
            <span className="label-input100">Password</span>
            <input
              className="input100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="pass"
              placeholder="Enter password"
            />
            {passwordError && (
              <span className="focus-input100">{passwordError}</span>
            )}
          </div>

          <div className="flex-sb-m w-full p-b-30">
            <div className="contact100-form-checkbox">
              <input
                className="input-checkbox100"
                id="ckb1"
                type="checkbox"
                name="remember-me"
              />
              <label className="label-checkbox100" htmlFor="ckb1">
                Remember me
              </label>
            </div>

            <div>
              <a href="www.youtube.com" className="txt1">
                Forgot Password?
              </a>
            </div>
          </div>

          <div className="container-login100-form-btn">
            <button type="submit" className="login100-form-btn">
              Login
            </button>
            <div>
              <a href="www.youtube.com" className="txt1">
                Don't have an account?
              </a>
            </div>
          </div>
          {globalError && <span className="focus-input100">{globalError}</span>}
        </form>
    </>
  );
}
