import { Link, useNavigate } from "react-router-dom"
import usePostUserLogin from "../hooks/usePostUserLogin";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { appCookies } from "../utils/appCookies";
import Loading from "../components/Loading";
import useGetUser from "../hooks/useGetUser";

const Login = () => {
  const { setCookie, getCookie } = appCookies();
  const navigate = useNavigate();

  const [error, setError] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const { isLoading: isLoadingUser } = useGetUser({
    options: {
      enabled: !!token,
      onSuccess: () => {
        navigate('/');
      },
    }
  });

  const { mutateAsync: mutateAsyncLogin, isLoading } = usePostUserLogin({
    onSuccess: (res) => {
      setCookie({
        name: 'access_token',
        value: res.token
      });
      navigate('/');
    },
    onError: (err: any) => {
      const errorMessage = err.response?.data.error;

      setError(errorMessage)
    }
  });

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await getCookie({ name: 'access_token' });
      setToken(accessToken as string);
    };

    fetchToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setError('');
      await mutateAsyncLogin(values);
    },
  });

  return (
    <>
      <Loading isShow={isLoading || isLoadingUser} />
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="grid place-items-center mx-2 my-20 sm:my-auto">
          <div
            className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
                  px-6 py-10 sm:px-10 sm:py-6 
                  bg-white rounded-lg shadow-md lg:shadow-lg"
          >
            <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
              Login
            </h2>

            <form className="mt-10" onSubmit={formik.handleSubmit}>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
                className={`block w-full py-3 px-1 mt-2 
                          text-gray-800 appearance-none 
                          border-b-2 border-gray-100
                          focus:text-gray-500 focus:outline-none focus:border-gray-200 ${
                            formik.touched.email && formik.errors.email
                              ? "border-red-500"
                              : ""
                          }`}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              )}

              <label
                htmlFor="password"
                className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...formik.getFieldProps("password")}
                className={`block w-full py-3 px-1 mt-2 mb-4
                          text-gray-800 appearance-none 
                          border-b-2 border-gray-100
                          focus:text-gray-500 focus:outline-none focus:border-gray-200 ${
                            formik.touched.password && formik.errors.password
                              ? "border-red-500"
                              : ""
                          }`}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              )}

              {formik.values.email && formik.values.password && error && (
                <div className="text-red-500 text-sm mt-1">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                          font-medium text-white uppercase
                          focus:outline-none hover:bg-gray-700 hover:shadow-none"
              >
                Login
              </button>

              <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm">
                <div className="flex-1 underline text-left">
                  Forgot password?
                </div>

                <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto text-center">
                  or
                </p>
                <Link to="/register" className="flex-1 underline text-right">
                  Create an Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login
