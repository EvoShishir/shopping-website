import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import loginImage from "../../Images/login.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import client from "../../client/client";

const Login = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) return navigate("/");
  }, []);

  const handleLogin = async (loginData) => {
    try {
      const { data } = await client.post("/users/login", loginData);
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
      console.log(error);
      toast.error(error.response.data, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const loginFields = [
    {
      name: "email",
      placeholder: "Your Email Address",
      type: "text",
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
  ];

  return (
    <Layout>
      <ToastContainer />
      <div className="background">
        <div className="sign-up-container">
          <div>
            <img src={loginImage} alt="" />
          </div>
          <form className="form" onSubmit={handleSubmit(handleLogin)}>
            {loginFields.map((field, key) => {
              return (
                <>
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
                  <small style={{ color: "red" }}>
                    {errors[field.name]?.message}
                  </small>
                </>
              );
            })}
            <br />
            <Link>
              <button
                className="signup-btn"
                onClick={handleSubmit(handleLogin)}
              >
                Login
              </button>
            </Link>
            <br />
            <h4>
              Don't have an account? <a href="/sign-up">Sign Up</a>
            </h4>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
