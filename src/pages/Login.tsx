import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignUpForm";

import { login } from '../redux/slices/userSlice'; // 确保路径正确

const Login = () => {
    const [showLogin, setShowLogin] = useState(true); // 控制显示登录或注册表单
    const dispatch = useDispatch();

    const handleLoginSubmit = (data: { password: string; email: string}) => {
        console.log(data);
        // Assuming you have a way to get the username from the email or you're okay with using the email
        dispatch(login({ username: data.email })); // Or adjust accordingly if your backend requires the email
    };
    


    return (
        <div>
            {showLogin ? (
                <>
                    <LoginForm onSubmit={handleLoginSubmit} />
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
