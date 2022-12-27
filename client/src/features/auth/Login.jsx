import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './auth.module.scss';
import authAction from './data/auth.action';

function Login() {
  const [payload, setPayload] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const changeAuthMode = () => {
    router.push('/register');
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    const err = await dispatch(authAction.login(payload));
    if (!err) router.push('/message');
  };
  return (
    <div className={style.AuthFormContainer}>
      <form
        className={style.AuthForm}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className={style.content}>
          <h3 className={style.title}>Sign In</h3>
          <div className="text-center">
            Not registered yet?{' '}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign Up
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control mt-1"
              placeholder="Enter email"
              required
              onChange={handleOnchange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              required
              onChange={handleOnchange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Loading ...' : 'Submit'}
            </button>
          </div>
          <p className="text-center mt-2">
            <Link href="#">password</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
export default Login;
