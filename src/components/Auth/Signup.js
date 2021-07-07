import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  signUpUser,
  userSelector
} from '../../features/user/userSlice';

// FORMS
import { useForm } from 'react-hook-form';

// IMAGES
import LoadSpinner from '../../components/LoadSpinner';
import cogoToast from 'cogo-toast';

// ----------------------------------------------------------------------------------
// ------------------------------------ SIGNUP --------------------------------------
// ----------------------------------------------------------------------------------

const Signup = ({ setAuthPage, setOpenAuth }) => {
  // State
  const dispatch = useDispatch();
  const { loading } = useSelector(userSelector)
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Function to handle submitting Login form
  const onSubmit = async (data) => {
    if (data.password === data.password2) {
      dispatch(signUpUser(data))
        .then(res => {
          if (res.payload.token) {
            setOpenAuth(false)
          }
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      cogoToast.error('Password does not match', {
        hideAfter: 3,
      });
    }
  };

  return (
    <>
      <form className='p-10 bg-taterpurple rounded-lg text-white' onSubmit={handleSubmit(onSubmit)}>
        <h4 className='text-2xl mb-4'>Create a new account</h4>
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
            className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
            {...register('password', {
              required: 'Required field',
              minLength: {
                value: 8,
                message: 'Must be at least 8 characters long'
              },
              maxLength: {
                value: 32,
                message: 'Cannot be more than 32 characters'
              }
            })}
          />
        </div>
        <div className='form-group'>
          <label className='mr-3'>Confirm Password</label>
          {errors.password2 && (
            <span className='text-red-500'>{errors.password2.message}</span>
          )}
          <input
            name='password2'
            type='password'
            placeholder='Enter your password again'
            className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
            {...register('password2', {
              required: 'Required field',
              minLength: {
                value: 8,
                message: 'Must be at least 8 characters long'
              },
              maxLength: {
                value: 32,
                message: 'Cannot be more than 32 characters'
              }
            })}
          />
        </div>
        <div className='form-group'>
          <label className='mr-3'>Username</label>
          {errors.username && (
            <span className='text-red-500'>{errors.username.message}</span>
          )}
          <input
            name='username'
            type='username'
            placeholder='Enter your username'
            className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
            {...register('username', {
              required: 'Required field',
              minLength: {
                value: 4,
                message: 'Must be at least 4 characters long'
              },
              maxLength: {
                value: 16,
                message: 'Cannot be more than 16 characters'
              }
            })}
          />
        </div>

        <div className='sm:flex sm:items-center sm:justify-between'>
          <div className='mb-7 sm:mb-0 sm:flex text-center text-xl justify-center'>
            <p>
              Have an account?
            </p>
            <p
              onClick={() => {
                setAuthPage('login')
              }}
              className='sm:ml-2 cursor-pointer text-logintext hover:text-purplebutton focus:outline-none'
            >
              Login
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
            ) : 'CREATE'}
          </button>
        </div>
      </form>
    </>
  );
}

export default Signup;