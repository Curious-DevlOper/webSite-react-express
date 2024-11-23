// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { authActions } from "../../store/auth-slice";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user"); // Default role is 'user'

//   useEffect(() => {
//     console.log("Register component mounted");
//   }, []); // Runs once when the component mounts

//   const onChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "email") {
//       setEmail(value);
//     } else if (name === "password") {
//       setPassword(value);
//     } else if (name === "role") {
//       setRole(value);
//     }

//     console.log(name, value); // Logs form field changes
//   };

//   const registerHandler = (e) => {
//     e.preventDefault();

//     // Simulate a server response with role-based registration
//     const user = {
//       email,
//       password,
//       role,
//     };

//     // Dispatching the registration action
//     dispatch(
//       authActions.register({
//         user: { email, role }, // Example payload
//       })
//     );
    
//     console.log("Form submitted, user registered: ", user);

//     // Navigate based on role
//     if (role === "admin") {
//       navigate("/profile");
//     } else if (role === "artist") {
//       navigate("/profile");
//     } else {
//       navigate("/profile");
//     }
//   };

//   return (
//     <div className="register">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-6 col-lg-5 mx-auto">
//             <h1 className="display-4 text-center">Register</h1>
//             <p className="lead text-center">
//               Create your account
//             </p>
//             <form onSubmit={registerHandler}>
//               <div className="mb-3">
//                 <input
//                   type="email"
//                   className="form-control form-control-lg"
//                   placeholder="Email Address"
//                   name="email"
//                   value={email}
//                   onChange={onChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <input
//                   type="password"
//                   className="form-control form-control-lg"
//                   placeholder="Password"
//                   name="password"
//                   value={password}
//                   onChange={onChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <select
//                   className="form-select form-control-lg"
//                   name="role"
//                   value={role}
//                   onChange={onChange}
//                 >
//                   <option value="user">User</option>
//                   <option value="artist">Artist</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </div>
//               <button type="submit" className="btn btn-info w-100 mt-4">
//                 Register
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [role, setRole] = useState("user"); // Default role is 'user'
  const [error, setError] = useState(""); // State to handle errors

  useEffect(() => {
    console.log("Register component mounted");
  }, []); // Runs once when the component mounts

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "password2") {
      setPassword2(value);
    } else if (name === "role") {
      setRole(value);
    }

    console.log(name, value); // Logs form field changes
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    // Create user payload
    const user = {
      name,
  email,
  password,
  password2,
  role,
    };

    try {
      // Simulate a server call (Replace with actual API call)
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.email || "Registration failed. Please try again.");
      }

      const responseData = await response.json();
      console.log("User registered successfully:", responseData);

      // Dispatch the user data to Redux store
      dispatch(
        authActions.login({
          user: { email, role }, // Simulating auto-login after registration
        })
      );

      // Navigate based on role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "artist") {
        navigate("/artist-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      console.error("Error during registration:", err.message);
      setError(err.message); // Display error to the user
    }
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-5 mx-auto">
            <h1 className="display-4 text-center">Register</h1>
            <p className="lead text-center">Create your account</p>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={registerHandler}>
            <div className="mb-3">
                <input
                  type="name"
                  className="form-control form-control-lg"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter your Email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
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
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password2"
                  className="form-control form-control-lg"
                  placeholder=" repeat Password"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <select
                  className="form-select form-control-lg"
                  name="role"
                  value={role}
                  onChange={onChange}
                  required
                >
                  <option value="user">User</option>
                  <option value="artist">Artist</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="btn btn-info w-100 mt-4">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
