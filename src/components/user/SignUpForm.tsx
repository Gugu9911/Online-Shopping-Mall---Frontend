import React, { useState } from 'react';
import { createUser } from '../../redux/slices/userSlice'; 
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(''); // 新增头像字段
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); 
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止表单默认提交行为

      // 密码长度验证
  if (password.length < 5) {
    alert('密码长度必须大于等于5位');
    return;
  }

  // 邮箱格式验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('请输入有效的邮箱地址');
    return;
  }

    const avatarUrl = avatar || "https://api.lorem.space/image/face?w=640&h=480&r=867";
  
    const userData = { name, email, password, avatar: avatarUrl };
  
    try {
      // 使用dispatch触发createUser action，并等待完成
      const actionResult = await dispatch(createUser(userData));
      // Check if the operation was successful
      if (createUser.fulfilled.match(actionResult)) {
        console.log('Registration successful', actionResult.payload);
        alert('Registration successful!');
        // If the operation was successful, you can handle it here
        setShowSuccessModal(true);
        // Close the modal and navigate to the home page after 3 seconds
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate('/loginForm'); 
        }, 3000); // 3 seconds
      } else {
        // If the operation was not successful, you can handle it here
        throw new Error('Registration failed');
      }
    } catch (error) {
      // If the operation was not successful, you can handle it here
      console.error('Registration failed:', error);
    }
  };
  

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="avatar">Avatar:</label>
          <input
            type="file"
            id="avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      {showSuccessModal && <div> Registration success! About to return to the Home page... </div>}
    </div>
  );
};

export default SignupForm;
