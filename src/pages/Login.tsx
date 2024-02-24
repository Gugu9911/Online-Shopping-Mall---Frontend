import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from "../components/user/LoginForm";
import SignupForm from "../components/user/SignUpForm";



const Login = () => {
    const [showLogin, setShowLogin] = useState(true); // 控制显示登录或注册表单




    return (
        <div>
            {showLogin ? (
                <>
                    <LoginForm />
                    <p>
                        No account? <button onClick={() => setShowLogin(false)}>Signup here</button>
                    </p>
                </>
            ) : (
                <>
                    <SignupForm/>
                    <p>
                        Have an account? <button onClick={() => setShowLogin(true)}>Login here</button>
                    </p>
                </>
            )}
        </div>
    );
};

export default Login;
