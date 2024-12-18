'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const callbackUrl = "/dashboard";
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      setError("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        phone,
        password,
        name,
        isSignUp: "true",
        redirect: false,
      });

      if (result?.error) {
        setError("Failed to create account. Please try again.");
        setIsLoading(false);
        return;
      }

      router.push(callbackUrl);
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d+]/g, '');
    setPhone(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#4c1d95]">
            Create an Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your details to sign up
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone number (e.g., +1234567890)"
                value={phone}
                onChange={handlePhoneChange}
                disabled={isLoading}
                pattern="\+?[1-9]\d{1,14}"
                title="Please enter a valid phone number"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#4c1d95] hover:bg-[#6d28d9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </div>

          <div className="text-sm flex justify-center">
            <button
              type="button"
              onClick={() => router.push("/auth/signin")}
              className="font-medium text-[#4c1d95] hover:text-[#6d28d9]"
            >
              Already have an account? Sign in
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
