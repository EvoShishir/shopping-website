import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import image from "../../Images/1000_F_311185297_Ga1gl6pGUDx9mRE4Cf9yuYc9nbWyJOBP1.jpg";
import { FaGoogle } from "react-icons/fa";
import { firebaseApp } from "../../firebaseconfig";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";

const Login = () => {
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();

  const validationSchema = yup
    .object({
      email: yup.string().required(),
      password: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch({
          type: "STORE_USER",
          payload: {
            name: user.displayName,
            email: user.email,
            avatar: user.photoURL,
          },
        });
        return navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogin = (data) => {
    console.log(data);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({
          type: "STORE_USER",
          payload: {
            name: user.displayName,
            email: user.email,
            avatar: user.photoURL,
          },
        });
        return navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginFields = [
    { name: "email", placeholder: "Your Email Address", type: "text" },
    { name: "password", placeholder: "Enter Password", type: "password" },
  ];

  return (
    <div className="background">
      <div className="sign-up-container">
        <div>
          <img src={image} alt="" />
        </div>
        <form className="form" onSubmit={handleSubmit(handleLogin)}>
          <h3>Login to your account</h3>
          <br />
          {loginFields.map((field, key) => {
            return (
              <>
                <input
                  {...register(field.name)}
                  key={key}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                />
                <br />
                <small style={{ color: "red" }}>
                  {errors[field.name]?.message}
                </small>
              </>
            );
          })}
          <br />
          <Link>
            <button className="signup-btn" onClick={handleSubmit(handleLogin)}>
              Login
            </button>
          </Link>
          <br />
          <h4>or,</h4>
          <br />
          <button className="signup-btn-g" onClick={handleGoogleSignIn}>
            <FaGoogle />
            Sign in with Google
          </button>
          <h4>
            Don't have an account? <a href="/sign-up">Sign Up</a>
          </h4>
        </form>
      </div>
    </div>
  );
};

export default Login;
