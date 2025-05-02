import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // if you are using React Router

const VerifyUser = () => {
  const baseURL=process.env.BACKEND_URL

  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading"); // loading, success, error

  useEffect(() => {
    const verifyUser = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setStatus("error");
        return;
      }
      
      try {
        const response = await fetch(`${baseURL}/auth/verify-user?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
      }
    };

    verifyUser();
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {status === "loading" && (
        <div className="text-xl font-semibold text-gray-700">Verifying your email...</div>
      )}
      {status === "success" && (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-600">✅ Email Verified Successfully!</h1>
          <p className="mt-4 text-lg text-gray-600">You can now login to your account.</p>
          <a href="/login" className="mt-6 inline-block bg-green-500 text-white px-6 py-3 rounded-md">Go to Login</a>
        </div>
      )}
      {status === "error" && (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600">❌ Verification Failed!</h1>
          <p className="mt-4 text-lg text-gray-600">Invalid or expired token. Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default VerifyUser;
