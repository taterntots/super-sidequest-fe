import React, { useState } from 'react';

// ROUTING
import { useHistory, Link } from 'react-router-dom';

// FORMS
import { useForm } from "react-hook-form";

// TOAST
import cogoToast from 'cogo-toast';

// IMAGES
import { ReactComponent as LoadingSpinner } from '../../img/LoadingSpinner.svg';

// COMPONENTS
// import CustomConfirmation from './CustomConfirmation';
// import CustomResetPassword from './CustomResetPassword';

// ----------------------------------------------------------------------------------
// ------------------------------------ SIGNUP --------------------------------------
// ----------------------------------------------------------------------------------

const Signup = () => {
  // State
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState()
  const [confirmFromSignup, setConfirmFromSignup] = useState(false);
  const [input, setInput] = useState({
    username: '',
    password: ''
  })

  // React Router
  const history = useHistory();

  // Function to handle submitting Login form
  const onSubmit = async (data) => {
    setSubmitting(true);

    // console.log(data.username.toLowerCase().replace(/ /g, ""))
    console.log(data)

    // await Auth.signIn(data.username, data.password)
    //   .then(() => {
    //     setSubmitting(false);
    //     cogoToast.success('Successfully logged in', {
    //       hideAfter: 3,
    //     });
    //     history.push('/dashboard')
    //   })
    //   .catch(err => {
    //     if (err.message === 'User is not confirmed.') {
    //       setSubmitting(false);
    //       setPassword(data.password)
    //       setEmail(data.username)
    //       setScreen('code');
    //       cogoToast.warn(err.message + ' Please confirm your account.', {
    //         hideAfter: 5,
    //       });
    //       console.log(err)
    //     } else {
    //       setSubmitting(false);
    //       cogoToast.error(err.message, {
    //         hideAfter: 3,
    //       });
    //       console.log(err)
    //     }
    //   })
  };

  return (
    <div className="flex items-center justify-center">
      <form className="p-10 bg-taterpurple rounded-lg text-white" onSubmit={handleSubmit(onSubmit)}>
        <h4 className='text-2xl mb-4'>Create a new account</h4>
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
            className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
            {...register('password', {
              required: 'Required field'
            })} />
        </div>
        <div className="form-group">
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
              required: 'Required field'
            })} />
        </div>

        <div className='mx-10 md:mx-0 md:flex md:items-center'>
          <div className='mb-7 md:mr-20 md:mb-0 flex text-xl justify-center'>
            <p>
              Have an account?
            </p>
            <Link
              to='/login'
              className='ml-2 text-logintext hover:text-purplebutton focus:outline-none'
            >
              Sign In
					  </Link>
          </div>
          <button
            type="submit"
            className={`${submitting && 'opacity-50 pointer-events-none'
              } flex items-center rounded-lg text-lg px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}>
            {submitting && (
              <LoadingSpinner />
            )}
              CREATE ACCOUNT
          </button>
        </div>
      </form>
    </div >
  );
}

export default Signup;