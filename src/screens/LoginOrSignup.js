import React, { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

export default function LoginOrSignup() {
  const [isLogin, setIsLogin] = useState(true);

  if (isLogin) return <Login setIsLogin={setIsLogin} isLogin={isLogin} />;

  return <SignUp setIsLogin={setIsLogin} isLogin={isLogin} />;
}
