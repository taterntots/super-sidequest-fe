import React, { useState, useEffect } from 'react';

// STATE
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserById,
  userSelector
} from '../../features/user/userSlice';

// FORMS
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

// COMPONENTS
import Hero from '../HeroCard';

// IMAGES
import LoadSpinner from '../LoadSpinner';

// ----------------------------------------------------------------------------------
// -------------------------------- CONTACT US PAGE ---------------------------------
// ----------------------------------------------------------------------------------

const ContactUsPage = ({ refresh, setRefresh }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: { email: '' }
  });
  const [loading, setLoading] = useState(false);

  // Grabs filterable data from the server
  useEffect(() => {
    if (localStorage.getItem('id')) {
      dispatch(fetchUserById(localStorage.getItem('id')))
        .then(res => {
          reset(res.payload)
        })
      reset()
    }
  }, [dispatch, reset, refresh])

  // Function to handle submitting the message
  const onSubmit = async (data) => {
    console.log(data)
    // dispatch(signInUser(data))
    //   .then(res => {
    //     if (res.payload.token) {
    //       setOpenAuth(false)
    //       setRefresh(!refresh)
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  };

  const subjectOptions = [
    { value: 'feedback', label: 'Feedback' },
    { value: 'question', label: 'Question' },
    { value: 'suggestion', label: 'Suggestion' },
    { value: 'bug_report', label: 'Bug Report' },
    { value: 'account_help', label: 'Account Help' },
    { value: 'report_user', label: 'Report User' },
    { value: 'feedback', label: 'Feedback' }
  ]

  return (
    <>
      {/* HERO */}
      <Hero />

      {/* CONTACT BODY */}
      <div className='px-4 py-4 bg-profiletwo rounded-lg text-white'>
        <h1 className='px-4 py-2 bg-profileone rounded-md text-2xl font-bold'>
          Contact Us
        </h1>
        {/* FORM */}
        <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <label className='mr-3'>From<span className='text-red-500'>*</span></label>
            {errors.email && (
              <span className='text-red-500'>{errors.email.message}</span>
            )}
            <input
              name='email'
              type='email'
              placeholder='Enter your email'
              readOnly={user.email && localStorage.getItem('token') ? true : false}
              className={user.email && localStorage.getItem('token') ?
                'opacity-60 w-full md:w-5/12 text-black flex items-center mb-7 mt-3 p-2 rounded-md text-lg focus:outline-none cursor-default' :
                'w-full md:w-5/12 text-black flex items-center mb-7 mt-3 p-2 rounded-md text-lg'}
              {...register('email', {
                required: 'Required field'
              })}
            />
          </div>
          <div className='form-group'>
            <label className='mr-3'>Subject<span className='text-red-500'>*</span></label>
            {errors.subject && (
              <span className='text-red-500'>{errors.subject.message}</span>
            )}
            <Controller
              name='subject'
              control={control}
              {...register('subject', {
                required: 'Required field'
              })}
              render={({ field }) => (
                <Select
                  {...field}
                  as={Select}
                  className='text-black mb-7 mt-3 w-full md:w-5/12 rounded-md text-lg'
                  options={subjectOptions}
                  id='subject'
                  name='subject'
                />
              )}
            />
          </div>
          <div className='form-group'>
            <label className='mr-3'>Message<span className='text-red-500'>*</span></label>
            {errors.message && (
              <span className='text-red-500'>{errors.message.message}</span>
            )}
            <textarea
              name='message'
              type='text'
              rows='6'
              placeholder='Please provide as much detail about the issue as possible'
              className='text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
              {...register('message', {
                required: 'Required field'
              })}
            />
          </div>
          <div className='flex justify-center md:mx-0 md:flex md:justify-end md:items-center'>
            <button
              type='submit'
              className={loading ? 'opacity-80 pointer-events-none w-full md:w-auto rounded-lg text-lg py-3 md:px-12 font-medium bg-profileone hover:bg-white hover:text-profileone focus:ring transition duration-150 ease-in-out' :
                'w-full md:w-auto rounded-lg text-lg py-3 md:px-12 font-medium bg-profileone hover:bg-white hover:text-graybutton focus:ring transition duration-150 ease-in-out'
              }
            >
              {loading ? (
                <div className='h-7 mr-6'>
                  <LoadSpinner />
                </div>
              ) : 'Send Message'}
            </button>
          </div>
        </form>

      </div >
    </>
  );
}

export default ContactUsPage;