import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  forgotPassword,
  userSelector
} from '../../features/user/userSlice';

// ROUTING
import { useHistory } from 'react-router-dom';

// FORMS
import { useForm } from "react-hook-form";

// IMAGES
import LoadSpinner from '../../components/LoadSpinner';

// ----------------------------------------------------------------------------------
// ------------------------------------ LOGIN ---------------------------------------
// ----------------------------------------------------------------------------------

const ForgotPassword = ({ setAuthPage, setOpenAuth }) => {
  // State
  const dispatch = useDispatch();
  const { loading } = useSelector(userSelector)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const history = useHistory();

  // Function to handle submitting Login form
  const onSubmit = async (data) => {
    dispatch(forgotPassword(data))
      .then(res => {
        if (res.payload.message === 'Request sent! Please check your email') {
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
        <h4 className='text-2xl mb-4'>Request password reset</h4>
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

        <div className='mx-10 md:mx-0 md:flex md:items-center'>
          <div className='mb-7 md:mr-20 md:mb-0 flex text-xl'>
            <p>
              Remember?
            </p>
            <p
              onClick={() => {
                setAuthPage('login')
              }}
              className='ml-2 text-logintext hover:text-purplebutton focus:outline-none'
            >
              Back to Login
            </p>
          </div>
          <button
            type="submit"
            className={loading ? 'opacity-80 pointer-events-none flex items-center rounded-lg text-lg px-24 md:px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out' :
              'flex items-center rounded-lg text-lg px-24 md:px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out'
            }
          >
            {loading ? (
              <div className='h-7 mr-6'>
                <LoadSpinner />
              </div>
            ) : 'SUBMIT'}
          </button>
        </div>
      </form>
    </div >
  );
}

export default ForgotPassword;