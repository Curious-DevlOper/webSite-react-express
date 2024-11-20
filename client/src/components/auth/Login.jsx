import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";


const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("Login component mounted");
  }, []); // Empty dependency array ensures this runs only once, mimicking componentDidMount

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }

    console.log(name, value); // Log changes in form fields
  };

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(authActions.login());

    console.log("Form submitted");

    const user = {
      email,
      password,
    };

    console.log("user: ", user);
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-5 mx-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Sign in to your DevConnector account
            </p>
            <form onSubmit={loginHandler}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <button type="submit" className="btn btn-info w-100 mt-4">
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
