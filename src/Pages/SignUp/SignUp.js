import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import signUpImage from "../../Images/sign-up.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import client from "../../client/client";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = yup
    .object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup
        .string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          `At least 8 Characters\none Uppercase one Lowercase one Number one Special Character`
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

  const handleRegister = async (registerData) => {
    if (registerData.password !== registerData.confirmPassword) {
      return toast.error("Passwords don't match", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    try {
      const { data } = await client.post("/users/create-user", registerData);
      localStorage.setItem("accessToken", JSON.stringify(data.token));
      const user = data.user;
      dispatch({
        type: "STORE_USER",
        payload: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
      return navigate(-1);
    } catch (error) {
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const signupFields = [
    {
      name: "name",
      placeholder: "Your Name",
      type: "name",
      label: "Name:",
      required: true,
    },
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
  ];

  return (
    <Layout>
      <ToastContainer />
      <div className="background">
        <div className="sign-up-container">
          <div>
            <img src={signUpImage} alt="" />
          </div>
          <form className="form" onSubmit={handleSubmit(handleRegister)}>
            {signupFields.map((field, key) => {
              return (
                <div className="container" key={key}>
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
                onClick={handleSubmit(handleRegister)}
              >
                Create account
              </button>
            </Link>
            <br />
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
