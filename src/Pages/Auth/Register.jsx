import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../Context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    acceptTerms: Yup.boolean()
      .oneOf([true], "You must accept terms & conditions"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const success = await register(
        values.username,
        values.email,
        values.password
      );
      setSubmitting(false);
      if (success) {
        navigate("/");
      }
    },
  });

  return (
    <div className="flex justify-center items-center py-16 bg-gray-50 min-h-[60vh]">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h2>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-green-200"
              }`}
            />
            {formik.touched.username && formik.errors.username && (
              <span className="text-xs text-red-500 mt-1 block">{formik.errors.username}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-green-200"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-xs text-red-500 mt-1 block">{formik.errors.email}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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
              <span className="text-xs text-red-500 mt-1 block">{formik.errors.password}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-green-200"
              }`}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <span className="text-xs text-red-500 mt-1 block">{formik.errors.confirmPassword}</span>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formik.values.acceptTerms}
                onChange={formik.handleChange}
                className="rounded text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-600">Accept all terms & conditions</span>
            </label>
            {formik.touched.acceptTerms && formik.errors.acceptTerms && (
              <span className="text-xs text-red-500 mt-1 block">{formik.errors.acceptTerms}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition cursor-pointer disabled:opacity-50"
          >
            {formik.isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;