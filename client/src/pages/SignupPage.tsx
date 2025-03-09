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
  const { status } = useSelector((state: RootState) => state?.auth);
  const [formData, setFormData] = useState<SignupType>({
    email: "",
    name: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(status);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(status);
    setError("");

    // Validate form data with Zod
    const result = signupSchema.safeParse({
      ...formData,
      confirmPassword,
    });
    if (!result.success) {
      // Get the first error message from the Zod error
      setError(result.error.errors[0].message);
      setIsLoading(status);
      return;
    }

    try {
      dispatch(signup(formData));
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setIsLoading(status);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

        <Button type="submit" isLoading={isLoading} loadingText="Signing up...">
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
    </AuthLayout>
  );
};
