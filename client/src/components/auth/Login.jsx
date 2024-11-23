// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { authActions } from "../../store/auth-slice";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     console.log("Login component mounted");
//   }, []); // Runs once when the component mounts

//   const onChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "email") {
//       setEmail(value);
//     } else if (name === "password") {
//       setPassword(value);
//     }

//     console.log(name, value); // Logs form field changes
//   };

//   const loginHandler = async (e) => {
//     e.preventDefault();

//     // Simulate a server call to authenticate the user and fetch their role
//     const user = {
//       email,
//       password,
//     };

//     try {
//       // Simulated server response (replace with actual API call)
//       const response = await serverLogin(user);

//       const { role } = response;

//       // Dispatching the login action with the user and role
//       dispatch(
//         authActions.login({
//           user: { email, role },
//         })
//       );

//       console.log("Login successful, user role:", role);

//       // Navigate based on role
//       if (role === "admin") {
//         navigate("/admin-dashboard");
//       } else if (role === "artist") {
//         navigate("/artist-dashboard");
//       } else {
//         navigate("/user-dashboard");
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   // Simulated server login function
//   const serverLogin = async (user) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         if (user.email.includes("admin")) {
//           resolve({ role: "admin" });
//         } else if (user.email.includes("artist")) {
//           resolve({ role: "artist" });
//         } else {
//           resolve({ role: "user" });
//         }
//       }, 1000); // Simulates server delay
//     });
//   };

//   return (
//     <div className="login">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-6 col-lg-5 mx-auto">
//             <h1 className="display-4 text-center">Log In</h1>
//             <p className="lead text-center">Sign in to your account</p>
//             <form onSubmit={loginHandler}>
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
//               <button type="submit" className="btn btn-info w-100 mt-4">
//                 Log In
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Login component mounted");
  }, []); // Runs once when the component mounts

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      // Replace with your actual backend API endpoint
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      const data = await response.json();
      const { token, role } = data;

      // Store the token (optional, if needed for further API calls)
      localStorage.setItem("authToken", token);

      // Dispatching the login action with the user and role
      dispatch(
        authActions.login({
          user: { email, role },
        })
      );

      console.log("Login successful, user role:", role);

      // Navigate based on role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "artist") {
        navigate("/artist-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-5 mx-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">Sign in to your account</p>
            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}
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
