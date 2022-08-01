import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { logUserOut } from "../auth/authSlice";

const User = () => {
  const dispatch = useDispatch();

  const { username, userPhone, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  return (
    <div className="container">
      <section className="row justify-content-md-center">
        <h1>User name: {username}</h1>
        <h1>Phone number: {userPhone}</h1>
      </section>

      {isLoggedIn && (
        <div className="form-group row">
          <div className="col-6">
            <button
              onClick={() => dispatch(logUserOut())}
              className="btn btn-primary"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
