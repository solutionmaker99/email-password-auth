import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";

const Register = () => {
  const [regError, setRegError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPass, setShowPass] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(name, email, password.length);

    if (password.length < 6) {
      setRegError("Password should be at list 6 or more.");
      return;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setRegError(
        "Your password should be content minimum 1 uppercase, 1 lowercase, 1 digit and 1 special character in your password."
      );
      return;
    }

    setRegError("");
    setSuccess("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user.emailVerified);

        updateProfile(res.user, {
          displayName: name,
          photoURL:
            "https://lh3.googleusercontent.com/a/ACg8ocJFJDsAsvdhkAVv1-pMvgwAh797uqFhAIRtANexAcKeCg=s288-c-no",
        })
          .then(() => console.log("profile updated"))
          .catch();

        setSuccess("Register successfully!!!");

        sendEmailVerification(res.user).then(() => {
          alert("Please check your email and verify your email.");
        });
      })
      .catch((err) => {
        console.log(err);
        setRegError(err.message);
      });
  };
  return (
    <div>
      <div className=" w-[25rem]">
        <h2 className="text-3xl mb-8 text-center">Please Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="mb-4 w-full py-2 px-4 border"
            type="text"
            name="name"
            placeholder="Type Your Name"
            required
          />
          <input
            className="mb-4 w-full py-2 px-4 border"
            type="email"
            name="email"
            placeholder="Please Type Your Email Here"
            required
          />
          <br />
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
          <br />

          <input
            className="btn btn-secondary mb-4 w-full"
            type="submit"
            value="Register"
          />
        </form>
        <p>
          Already have an account? Please <Link to="/login">Login</Link>
        </p>
        {regError && <p className="text-red-700">{regError}</p>}
        {success && <p className="text-green-600">{success}</p>}
      </div>
    </div>
  );
};

export default Register;
