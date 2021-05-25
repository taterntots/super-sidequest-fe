import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInUser,
  userSelector
} from '../../features/user/userSlice';

// ROUTING
import { Link } from 'react-router-dom';

// FORMS
import { useForm } from "react-hook-form";

// IMAGES
import { ReactComponent as LoadingSpinner } from '../../img/LoadingSpinner.svg';

// ----------------------------------------------------------------------------------
// -------------------------------- CHALLENGE FORM ----------------------------------
// ----------------------------------------------------------------------------------

const ChallengeForm = () => {
  // State
  const dispatch = useDispatch();
  const { loading } = useSelector(userSelector)
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Function to handle submitting Login form
  const onSubmit = async (data) => {
    dispatch(signInUser(data))
  };

  return (
    <div className="">
      <form className="p-10 bg-taterpurple rounded-lg text-white" onSubmit={handleSubmit(onSubmit)}>
        <h4 className='text-2xl mb-4'>Create a challenge</h4>
        <div className="form-group">
          <label className='mr-3'>Challenge Title</label>
          {errors.name && (
            <span className='text-red-500'>{errors.name.message}</span>
          )}
          <input
            name='name'
            type='name'
            placeholder='Enter a snazzy name for your challenge'
            className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
            {...register('name', {
              required: 'Required field'
            })}
          />
        </div>
        <div className="form-group">
          <label className='mr-3'>Game</label>
          {errors.game_id && (
            <span className='text-red-500'>{errors.game_id.message}</span>
          )}
          <input
            name='game_id'
            type='game_id'
            placeholder='Pick a game'
            className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
            {...register('game_id', {
              required: 'Required field'
            })}
          />
        </div>
        <div className="form-group">
          <label className='mr-3'>Description</label>
          {errors.description && (
            <span className='text-red-500'>{errors.description.message}</span>
          )}
          <input
            name='description'
            type='description'
            placeholder='What exactly is the challenge?'
            className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
            {...register('description', {
              required: 'Required field'
            })}
          />
        </div>
        <div className="form-group">
          <label className='mr-3'>System</label>
          {errors.system && (
            <span className='text-red-500'>{errors.system.message}</span>
          )}
          <input
            name='system'
            type='system'
            placeholder='Enter the name of the system you are competing on'
            className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
            {...register('system', {
              required: 'Required field'
            })}
          />
        </div>

        <div className='flex justify-center md:mx-0 md:flex md:justify-end md:items-center'>
          <button
            type="submit"
            className={`${loading && 'opacity-50 pointer-events-none'
              } w-full md:w-auto rounded-lg text-lg py-3 md:px-12 font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}>
            {loading && (
              <LoadingSpinner />
            )}
            SUBMIT
          </button>
        </div>
      </form>
    </div >
  );
}

export default ChallengeForm;