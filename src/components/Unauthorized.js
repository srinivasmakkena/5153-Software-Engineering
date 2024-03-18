import React from 'react';
import './Unauthorized.css';
import loginImage from "./assets/login.gif"
const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h2 className="unauthorized-title"> **** Please Login....! ****</h2>
      {/* <img src="https://i.pinimg.com/originals/7a/96/2f/7a962f85271b11310d961b24b28148c1.gif" alt="Unauthorized" className="unauthorized-image" /> */}
      <img src={loginImage} alt="Unauthorized" className="unauthorized-image" />
      <p className="unauthorized-message">
        You do not have permission to access this page. Please <a className="unauthorized-link" href="/login">log in</a> to view
        this content.
      </p>
      <p>
        If you don't have an account yet, you can <a className="unauthorized-link" href="/register">register here</a>.
      </p>
    </div>
  );
};

export default Unauthorized;
