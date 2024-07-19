import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../state/user/userAction';
import SignUp from './Signup';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(signin(username, password));
  };

  return (
    <div>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignIn}>Sign In</button>
      cdefgh
      <SignUp/>
    </div>
  );
};

export default SignIn;