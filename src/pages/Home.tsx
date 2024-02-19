import React from "react";
import Navbar from "../components/Navbar";
import SignupForm from "../components/SignUpForm";
import LoginForm from "../components/Login";

const Home = () => {

  const handleLoginSubmit = (values: any) => {
    console.log(values);
  };
  
  const handleSignupSubmit = (values: any) => {
    console.log(values);
  };
  
  return (
    <div>
      <Navbar />
      <SignupForm onSubmit={handleSignupSubmit}/>
      <LoginForm onSubmit={handleLoginSubmit}/>
    </div>  
  )
};

export default Home;