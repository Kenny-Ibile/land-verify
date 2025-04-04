"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Sending login request:", { email, password });
    const result = await signIn("public", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      toast.error("Invalid email or password");
    } else {
      toast.success("Login successful");
      router.push("/dashboard");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-2 lg:p-4 bg-gray-100">
      <div>
        <Link href="/">
          <img
            src="/LandVerify-logo.png"
            alt="LandVerify Logo"
            className="mb-2 sm:mb-8 lg:mb-4 sm:h-0 h-12 sm:mb-8 lg:mb-4 w-32 sm:w-32 sm:h-12 lg:w-52 lg:h-16 mx-auto"
          />
        </Link>
      </div>
      <div className="w-full max-w-md sm:max-w-xl mx-auto p-6 sm:p-4 lg:p-12 border border-gray-300 rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6 lg:mb-8">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded hover:border-gray-500 focus:border-gray-500"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full p-2 border rounded hover:border-gray-500 focus:border-gray-500 pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#479101] text-white font-semibold rounded-md hover:bg-[#3a7a01] cursor-pointer"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <Toaster />
          <div className="flex justify-between">
            <Link
              href="/forgot-password"
              className="text-[gray] underline hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="flex justify-between">
            <p className="text-center text-[gray]">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-[gray] underline hover:underline ml-1"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}