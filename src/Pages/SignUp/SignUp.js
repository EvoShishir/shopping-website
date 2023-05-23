import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import image2 from "../../Images/Rectangle 21.png";
import { FaGoogle } from "react-icons/fa";
import { firebaseApp } from "../../firebaseconfig";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout/Layout";

const SignUp = () => {
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();

  const validationSchema = yup
    .object({
      email: yup.string().email().required(),
      password: yup
        .string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          `At least 8 Characters\none Uppercase one Lowercase one Number one Special Case`
        ),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result?.user;
        dispatch({
          type: "STORE_USER",
          payload: {
            name: user.displayName,
            email: user.email,
            avatar: user.photoURL,
          },
        });
        return navigate(-1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePasswordAuthentication = (data) => {
    console.log(data);
    if (data.password !== data.confirmPassword)
      return alert("Passwords don't match");
    else {
      createUserWithEmailAndPassword(auth, data.email, data.password)
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
          return navigate(-1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const signupFields = [
    {
      name: "email",
      placeholder: "Your Email Address",
      type: "email",
      label: "Email:",
      required: true,
    },
    {
      name: "password",
      placeholder: "Enter Password",
      type: "password",
      label: "Password:",
      required: true,
    },
    {
      name: "confirmPassword",
      placeholder: "Confirm Password",
      type: "password",
      label: "Confirm Password:",
      required: true,
    },
    // {
    //   name: "gender",
    //   placeholder: "Select Gender",
    //   type: "select",
    //   options: [
    //     { label: "Select", value: null },
    //     { label: "Male", value: "male" },
    //     { label: "Female", value: "female" },
    //   ],
    // },
  ];

  return (
    <Layout>
      <div className="background">
        <div className="sign-up-container">
          <div>
            <img src={image2} alt="" />
          </div>
          <form
            className="form"
            onSubmit={handleSubmit(handlePasswordAuthentication)}
          >
            {signupFields.map((field, key) => {
              // if (field.type === "select")
              //   return (
              //     <>
              //       <br />
              //       <select
              //         {...register(field.name)}
              //         key={key}
              //         name={field.name}
              //       >
              //         {field.options.map((option, key) => (
              //           <option key={key} value={option.value}>
              //             {option.label}
              //           </option>
              //         ))}
              //       </select>
              //     </>
              //   );

              return (
                <div className="container">
                  <h3>
                    {field.label}{" "}
                    {field.required ? (
                      <span style={{ color: "red" }}>*</span>
                    ) : (
                      ""
                    )}
                  </h3>
                  <input
                    {...register(field.name)}
                    key={key}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                  />
                  <br />
                  <small className="error">{errors[field.name]?.message}</small>
                </div>
              );
            })}
            <br />
            <Link>
              <button
                className="signup-btn"
                onClick={handleSubmit(handlePasswordAuthentication)}
              >
                Create account
              </button>
            </Link>
            <br />
            <h4>or,</h4>
            <br />
            <button className="signup-btn-g" onClick={handleGoogleSignIn}>
              <FaGoogle />
              Sign up with Google
            </button>
            <h4>
              Already have an account? <a href="/login">Login</a>
            </h4>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
