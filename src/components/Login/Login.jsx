import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useRef, useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";

const Login = () => {
  const [success, setSuccess] = useState("");
  const [logErr, setLogErr] = useState("");
  const [showPass, setShowPass] = useState(false);
  const emailRef = useRef(null);
  const handleLogInForm = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setLogErr("");
    setSuccess("");
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
        if (res.user) {
          if (res.user.emailVerified) {
            setSuccess("Login successfully!!!");
          } else {
            alert("please verify your email address.");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setLogErr("Please type your password and email correctly.");
      });
  };
  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("please provide an valid email", email);
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      console.log("please write a valid email");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("please check your email");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="hero min-h-screen bg-base-200 -mt-[10rem]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleLogInForm}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    className="mb-4 w-full py-2 px-4 border"
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <span
                    className="text-2xl absolute top-2 right-4"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <BiShow /> : <BiHide />}
                  </span>
                </div>
              </div>
              <label className="label">
                <a
                  onClick={handleForgotPassword}
                  href="#"
                  className="text-base link link-hover"
                >
                  Forgot password?
                </a>
              </label>
              <br />
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary"
                />
              </div>
              <p>
                Don't have any account? Please{" "}
                <Link to="/register">Register</Link>
              </p>
              {success && <p className="text-green-700">{success}</p>}
              {logErr && <p className="text-red-700">{logErr}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
