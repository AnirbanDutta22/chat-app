import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { AuthLayout } from "../components/common/AuthLayout";
import { Link } from "react-router-dom";
import { signupSchema } from "../validation/auth"; // Import the centralized schema
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authSlice";
import { SignupType } from "../types";
import { AppDispatch, RootState } from "../store";

export const SignupPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error: authError } = useSelector(
    (state: RootState) => state?.auth
  );
  const [formData, setFormData] = useState<SignupType>({
    email: "",
    name: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate form data with Zod
    const result = signupSchema.safeParse({
      ...formData,
      confirmPassword,
    });
    if (!result.success) {
      // Get the first error message from the Zod error
      setError(result.error.errors[0].message);
      return;
    }

    try {
      await dispatch(signup(formData)).unwrap();
      // On successful signup, show OTP form
      setShowOtpForm(true);
    } catch (err) {
      console.error(err);
      setError(authError || "Create account error");
    }
  };

  const handleSubmitOTP = async (otp: string) => {
    console.log("Submitted OTP:", otp);
  };

  return (
    <AuthLayout>
      {/* Container for sliding forms */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Signup Form */}
        <div
          className={`absolute top-0 left-0 w-full transition-transform duration-500 ${
            showOtpForm ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              isLoading={status}
              loadingText="Signing up..."
            >
              Sign Up
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </form>
        </div>

        {/* OTP Form */}
        <div
          className={`absolute top-0 left-0 w-full transition-transform duration-500 ${
            showOtpForm ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <OtpForm onSubmitOTP={handleSubmitOTP} />
        </div>
      </div>
    </AuthLayout>
  );
};

type OtpFormProps = {
  onSubmitOTP: (otp: string) => void;
};

const OtpForm = ({ onSubmitOTP }: OtpFormProps) => {
  const [otp, setOtp] = useState("");

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitOTP(otp);
  };

  return (
    <form onSubmit={handleOTPSubmit} className="space-y-4">
      <Input
        label="Enter OTP"
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      <Button type="submit">Submit OTP</Button>
    </form>
  );
};
