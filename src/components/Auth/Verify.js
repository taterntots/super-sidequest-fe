import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  verifyUser,
  userSelector
} from '../../features/user/userSlice';

// FORMS
import { useForm } from 'react-hook-form';

// IMAGES
import LoadSpinner from '../../components/LoadSpinner';

// ----------------------------------------------------------------------------------
// ------------------------------------ VERIFY ---------------------------------------
// ----------------------------------------------------------------------------------

const Verify = ({ setAuthPage, setOpenAuth, refresh, setRefresh, currentUserEmail }) => {
  // State
  const dispatch = useDispatch();
  const { loading } = useSelector(userSelector)
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Function to handle submitting Verification form
  const onSubmit = async (data) => {
    data.email = currentUserEmail
    
    dispatch(verifyUser(data))
      .then(res => {
        if (res.payload.token) {
          setOpenAuth(false)
          setRefresh(!refresh)
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <form className='p-10 bg-taterpurple rounded-lg text-white' onSubmit={handleSubmit(onSubmit)}>
      <h4 className='text-2xl mb-4'>Verify your account</h4>
      <div className='form-group'>
        <label className='mr-3'>Email address</label>
        {errors.email && (
          <span className='text-red-500'>{errors.email.message}</span>
        )}
        <input
          name='email'
          type='email'
          placeholder='Enter your email'
          defaultValue={currentUserEmail}
          disabled={true}
          className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
          {...register('email')}
        />
      </div>
      <div className='form-group'>
        <label className='mr-3'>Verification Code</label>
        {errors.verification_code && (
          <span className='text-red-500'>{errors.verification_code.message}</span>
        )}
        <input
          name='verification_code'
          type='verification_code'
          placeholder='Enter your verification code'
          className='form-control text-black w-full flex items-center mb-3 mt-3 p-2 rounded-md text-lg'
          {...register('verification_code', {
            required: 'Required field',
            maxLength: {
              value: 6,
              message: 'Codes must be six digits long'
            },
            minLength: {
              value: 6,
              message: 'Codes must be six digits long'
            }
          })}
        />
      </div>

      <div className='sm:mr-20 sm:mb-0 sm:flex text-center sm:text-left sm:justify-start'>
        <p className='sm:mb-7'>
          Code expired?
        </p>
        <p
          onClick={() => {
            setAuthPage('forgot_password')
          }}
          className='sm:ml-2 mb-7 cursor-pointer text-logintext hover:text-purplebutton focus:outline-none'
        >
          Resend code
        </p>
      </div>

      <div className='sm:mx-0 sm:flex sm:justify-between text-center sm:items-center'>
        <div className='mb-7 sm:mb-0 sm:flex justify-center text-xl'>
          <p>
            Have an account?
          </p>
          <p
            onClick={() => {
              setAuthPage('signup')
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
          ) : 'VERIFY'}
        </button>
      </div>
    </form>
  );
}

export default Verify;