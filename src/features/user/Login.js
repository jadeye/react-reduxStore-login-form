import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getUsersList, logUserIn } from "../auth/authSlice";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

const passwordTester = (pass) => {
  let chk = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
  let valid = chk.test(pass);
  return valid;
};

const phoneTester = (num) => {
  let chk = /^[0-9]{1,10}$/;
  let valid = chk.test(num);
  return valid;
};

const toastErrorDispatch = (msgText) =>
  toast.error(msgText, {
    position: "top-center",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

const Login = () => {
  const userNameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const password2InputRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    password: "",
    password2: "",
  });
  const { username, phone, password, password2 } = formData;

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (username.length < 1 || username.length > 32) {
      toastErrorDispatch("User name must be 1-32 chars.");

      userNameInputRef.current.focus();
    } else if (!phoneTester(phone)) {
      toastErrorDispatch("Phone number must be 1 - 10 digits only.");

      phoneInputRef.current.focus();
    } else if (!passwordTester(password)) {
      toastErrorDispatch(
        "Password should be 6-12 chars with an Uppercase letter and a special char."
      );
      passwordInputRef.current.focus();
    } else if (!passwordTester(password2)) {
      toastErrorDispatch(
        "Password should be 6-12 chars with an Uppercase letter and a special char."
      );
      password2InputRef.current.focus();
    } else if (password !== password2) {
      toastErrorDispatch("Password don't match!");

      password2InputRef.current.focus();
    } else {
      const userData = {
        username,
        phone,
        password,
      };

      dispatch(getUsersList())
        .then((originalPromiseResult) => {
          const { payload } = originalPromiseResult;

          const userExists = payload.filter(
            (resUser) =>
              resUser.username === userData.username &&
              resUser.password === userData.password
          );

          const [userExistsData] = userExists;
          if (userExistsData.length !== 0) {
            dispatch(logUserIn(userData));
          } else {
            toastErrorDispatch("No such User or password!");
          }
        })
        .catch((rejectedValueOrSerializedError) => {
          toastErrorDispatch("No such User or password!");
        });
    }
  };
  return (
    <div className="container">
      <section className="row justify-content-md-center">
        <h1>{user}</h1>
      </section>
      <section className="row justify-content-md-center">
        <form className="col-12" onSubmit={onSubmit}>
          <div className="form-group row">
            <div className="col-12">
              <input
                ref={userNameInputRef}
                id="username"
                name="username"
                placeholder="User name"
                type="text"
                aria-describedby="usernameHelpBlock"
                required="required"
                className="form-control"
                onChange={onChange}
              />
              <span id="usernameHelpBlock" className="form-text text-muted">
                User name must be 1-32 chars.
              </span>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-12">
              <input
                ref={phoneInputRef}
                id="phone"
                name="phone"
                placeholder="Phone"
                type="text"
                aria-describedby="phoneHelpBlock"
                required="required"
                className="form-control"
                onChange={onChange}
              />
              <span id="phoneHelpBlock" className="form-text text-muted">
                Phone number must be 1-10 chars.
              </span>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-12">
              <input
                ref={passwordInputRef}
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                aria-describedby="passwordHelpBlock"
                required="required"
                className="form-control"
                onChange={onChange}
              />
              <span id="passwordHelpBlock" className="form-text text-muted">
                Password should be 6-12 chars with an Uppercase letter and a
                special char
              </span>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-12">
              <input
                ref={password2InputRef}
                id="password2"
                name="password2"
                placeholder="Verify Password"
                type="password"
                aria-describedby="password2HelpBlock"
                required="required"
                className="form-control"
                onChange={onChange}
              />
              <span id="password2HelpBlock" className="form-text text-muted">
                Password should be 6-12 chars with an Uppercase letter and a
                special char
              </span>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-6">
              <button name="submit" type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
