import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './auth.module.scss';
import authAction from './data/auth.action';

function Register() {
  const [payload, setPayload] = useState({
    name: '',
    email: '',
    password: '',
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const changeAuthMode = () => {
    router.push('/');
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    const err = await dispatch(authAction.register(payload));
    if (!err) router.push('/');
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
          <h3 className={style.title}>Sign Up</h3>
          <div className="text-center">
            Already registered?{' '}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Name</label>
            <input
              name="name"
              type="text"
              className="form-control mt-1"
              placeholder="e.g JaneDoe"
              required
              onChange={handleOnchange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              name="email"
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
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
              placeholder="Password"
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

export default Register;
