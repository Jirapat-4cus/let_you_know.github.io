import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return false;
    }

    if (!isLogin) {
      if (!formData.username) {
        setError("กรุณากรอกชื่อผู้ใช้");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("รหัสผ่านไม่ตรงกัน");
        return false;
      }
      if (formData.password.length < 6) {
        setError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
      } else {
        // Register
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        // Update display name
        await updateProfile(userCredential.user, {
          displayName: formData.username,
        });
      }
    } catch (error) {
      console.error("Auth error:", error);

      // Handle specific Firebase auth errors
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
          break;
        case "auth/email-already-in-use":
          setError("อีเมลนี้ถูกใช้งานแล้ว");
          break;
        case "auth/weak-password":
          setError("รหัสผ่านไม่ปลอดภัยเพียงพอ");
          break;
        case "auth/invalid-email":
          setError("รูปแบบอีเมลไม่ถูกต้อง");
          break;
        default:
          setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google auth error:", error);
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบด้วย Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            📚
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isLogin ? "เข้าสู่ระบบ" : "สร้างบัญชีใหม่"}
          </h1>
          <p className="text-gray-600">แอปเตรียมสอบเข้ามหาวิทยาลัย</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Google Auth Button */}
        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full bg-red-500 text-white py-3 rounded-xl mb-6 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          เข้าสู่ระบบด้วย Google
        </button>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-500">หรือ</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="ชื่อผู้ใช้"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="อีเมล"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="รหัสผ่าน"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            required
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="ยืนยันรหัสผ่าน"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0 1 8-8v8H4z"
                />
              </svg>
            )}
            {isLogin ? "เข้าสู่ระบบ" : "สร้างบัญชี"}
          </button>
        </form>

        {/* Toggle Auth Mode */}
        <div className="text-center mt-6">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              });
            }}
            className="text-blue-500 hover:underline transition-colors"
          >
            {isLogin
              ? "ยังไม่มีบัญชี? สร้างบัญชีใหม่"
              : "มีบัญชีแล้ว? เข้าสู่ระบบ"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
