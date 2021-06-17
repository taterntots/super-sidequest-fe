import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInUser,
  userSelector
} from '../../features/user/userSlice';

// FORMS
import { useForm } from "react-hook-form";

// IMAGES
import { ReactComponent as LoadingSpinner } from '../../img/LoadingSpinner.svg';

// ----------------------------------------------------------------------------------
// ------------------------------------ LOGIN ---------------------------------------
// ----------------------------------------------------------------------------------

const Login = ({ setAuthPage, setOpenAuth }) => {
  // State
  const dispatch = useDispatch();
  const { loading } = useSelector(userSelector)
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Function to handle submitting Login form
  const onSubmit = async (data) => {
    dispatch(signInUser(data))
      .then(res => {
        if (res.payload.token) {
          setOpenAuth(false)
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <div className="flex items-center justify-center">
      <form className="p-10 bg-taterpurple rounded-lg text-white" onSubmit={handleSubmit(onSubmit)}>
        <h4 className='text-2xl mb-4'>Sign in to your account</h4>
        <div className="form-group">
          <label className='mr-3'>Email address</label>
          {errors.email && (
            <span className='text-red-500'>{errors.email.message}</span>
          )}
          <input
            name='email'
            type='email'
            placeholder='Enter your email'
            className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
            {...register('email', {
              required: 'Required field',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "(Invalid email address)"
              }
            })}
          />
        </div>
        <div className="form-group">
          <label className='mr-3'>Password</label>
          {errors.password && (
            <span className='text-red-500'>{errors.password.message}</span>
          )}
          <input
            name='password'
            type='password'
            placeholder='Enter your password'
            className='form-control text-black w-full flex items-center mb-3 mt-3 p-2 rounded-md text-lg'
            {...register('password', {
              required: 'Required field'
            })} />
        </div>

        <div className='md:mr-20 md:mb-0 flex justify-center md:justify-start'>
          <p className='mb-7'>
            Forgot your password?
          </p>
          <p
            onClick={() => {
              setAuthPage('forgot_password')
            }}
            className='ml-2 mb-7 cursor-pointer text-logintext hover:text-purplebutton focus:outline-none'
          >
            Reset password
          </p>
        </div>

        <div className='mx-10 md:mx-0 md:flex md:items-center'>
          <div className='mb-7 md:mr-20 md:mb-0 flex text-xl'>
            <p>
              No account?
            </p>
            <p
              onClick={() => {
                setAuthPage('signup')
              }}
              className='ml-2 cursor-pointer text-logintext hover:text-purplebutton focus:outline-none'
            >
              Create account
					  </p>
          </div>
          <button
            type="submit"
            className={`${loading && 'opacity-50 pointer-events-none'
              } flex items-center rounded-lg text-lg px-24 md:px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}>
            {loading && (
              <LoadingSpinner />
            )}
              SIGN IN
          </button>
        </div>
      </form>
    </div >
  );
}

export default Login;