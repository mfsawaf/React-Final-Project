import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation, Link } from "react-router";
import { useAuth } from "../../Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { login } = useAuth();

  const validationSchema = Yup.object({
    identifier: Yup.string().required("Email or username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const success = await login(values.identifier, values.password);
      setSubmitting(false);
      if (success) {
        navigate(from, { replace: true });
      }
    },
  });

  return (
    <div className="flex justify-center items-center py-16 bg-gray-50 min-h-[60vh]">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign In
        </h2>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email / Username
            </label>
            <input
              type="text"
              name="identifier"
              placeholder="Email or Username"
              value={formik.values.identifier}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.touched.identifier && formik.errors.identifier
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-green-200"
              }`}
            />
            {formik.touched.identifier && formik.errors.identifier && (
              <span className="text-xs text-red-500 mt-1 block">
                {formik.errors.identifier}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-green-200"
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <span className="text-xs text-red-500 mt-1 block">
                {formik.errors.password}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
                className="rounded text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-green-600 hover:underline"
            >
              Forgot Password
            </Link>
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition cursor-pointer disabled:opacity-50"
          >
            {formik.isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have account?{" "}
          <Link
            to="/register"
            className="text-green-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
