import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInUser,
  userSelector
} from '../../features/user/userSlice';

// FORMS
import { useForm } from 'react-hook-form';

// IMAGES
import LoadSpinner from '../../components/LoadSpinner';

// ----------------------------------------------------------------------------------
// ------------------------------------ LOGIN ---------------------------------------
// ----------------------------------------------------------------------------------

const Login = ({ setAuthPage, setOpenAuth, refresh, setRefresh, setCurrentUserEmail }) => {
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
          setRefresh(!refresh)
        } else if (res.payload.includes('verify')) {
          setAuthPage('verify')
          setCurrentUserEmail(res.meta.arg.email)
          setRefresh(!refresh)
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <form className='p-10 bg-taterpurple rounded-lg text-white' onSubmit={handleSubmit(onSubmit)}>
      <h4 className='text-2xl mb-4'>Sign in to your account</h4>
      <div className='form-group'>
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
              message: '(Invalid email address)'
            }
          })}
        />
      </div>
      <div className='form-group'>
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

      <div className='sm:mr-20 sm:mb-0 sm:flex text-center sm:text-left sm:justify-start'>
        <p className='sm:mb-7'>
          Forgot your password?
        </p>
        <p
          onClick={() => {
            setAuthPage('forgot_password')
          }}
          className='sm:ml-2 mb-7 cursor-pointer text-logintext hover:text-purplebutton focus:outline-none'
        >
          Reset password
        </p>
      </div>

      <div className='sm:mx-0 sm:flex sm:justify-between text-center sm:items-center'>
        <div className='mb-7 sm:mb-0 sm:flex justify-center text-xl'>
          <p>
            No account?
          </p>
          <p
            onClick={() => {
              setAuthPage('signup')
            }}
            className='sm:ml-2 cursor-pointer text-logintext hover:text-purplebutton focus:outline-none'
          >
            Create account
          </p>
        </div>
        <button
          type='submit'
          className={loading ? 'opacity-80 pointer-events-none flex rounded-lg text-lg sm:px-12 py-3 w-full sm:w-auto justify-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out' :
            'flex rounded-lg text-lg sm:px-12 py-3 w-full sm:w-auto justify-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out'
          }
        >
          {loading ? (
            <div className='h-7 mr-6'>
              <LoadSpinner />
            </div>
          ) : 'SIGN IN'}
        </button>
      </div>
    </form>
  );
}

export default Login;