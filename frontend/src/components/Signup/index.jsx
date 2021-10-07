import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { signupAuth } from "../../api/auth";
import { AuthContext } from "../../context/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signup } = signupAuth();
  const { auth, setAuth } = useContext(AuthContext);

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const valid =
    !email || !password || !email.match(emailRegex) || !firstName || !lastName;

  const handleSignup = async () => {
    setLoading(true);

    try {
      console.log({
        firstName: firstName,
        lastName: lastName,
        email: password,
        password: password,
      });

      const res = await signup({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });

      setAuth({
        token: res.data.data.token,
        ...res.data.data.user,
      });

      sessionStorage.setItem(
        "authUser",
        JSON.stringify({
          token: res.data.data.token,
          ...res.data.data.user,
        })
      );
    } catch (error) {
      setError(error);
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-screen bg-content-primary flex justify-center items-center text-white p-5">
      <form
        className="bg-sidebar-primary p-5 rounded-lg max-w-[600px]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        <h5 className="text-center mb-5">Signup</h5>
        <label className="mr-auto" htmlFor="fname">
          First Name:
        </label>
        <input
          id="fname"
          autoComplete="name"
          className="w-full bg-content-input p-3 mb-5 rounded-lg mt-2"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label className="mr-auto" htmlFor="lname">
          Last Name:
        </label>
        <input
          id="lname"
          autoComplete="name"
          className="w-full bg-content-input p-3 mb-5 rounded-lg mt-2"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label className="mr-auto" htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          autoComplete="email"
          className="w-full bg-content-input p-3 mb-5 rounded-lg mt-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="pass">Password:</label>
        <input
          id="pass"
          autoComplete="current-password"
          className="w-full bg-content-input p-3 mb-5 rounded-lg mt-2"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="text-red-500">{error.toString()}</div>}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={valid}
            className={`bg-content-button p-3 rounded-lg w-1/4 flex justify-center transition-all duration-300 ease-in-out
            ${valid && "grayscale cursor-default"}
          `}
          >
            {!loading ? (
              "Signup"
            ) : (
              <Loader type="TailSpin" height={30} width={30} color={"#fff"} />
            )}
          </button>
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/" className="text-blue-300">
            Or login here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
