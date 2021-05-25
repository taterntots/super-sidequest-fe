import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInUser,
  userSelector
} from '../../features/user/userSlice';
import {
  fetchGames,
  gameSelector
} from '../../features/game/gameSlice';

// ROUTING
import { Link } from 'react-router-dom';

// FORMS
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';

// IMAGES
import { ReactComponent as LoadingSpinner } from '../../img/LoadingSpinner.svg';

// ----------------------------------------------------------------------------------
// -------------------------------- CHALLENGE FORM ----------------------------------
// ----------------------------------------------------------------------------------

const ChallengeForm = () => {
  // State
  const dispatch = useDispatch();
  const { loading: userLoading } = useSelector(userSelector) // REPLACE LOADING WITH ADD CHALLENGE LOADING
  const { games, loading: gameLoading } = useSelector(gameSelector)
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  // Grabs all necessary data from server
  useEffect(() => {
    dispatch(fetchGames())
  }, [dispatch])

  // Function to handle submitting Login form
  const onSubmit = async (data) => {
    console.log('DATA', data)
    // dispatch(signInUser(data))
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
            className='text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
            {...register('name', {
              required: 'Required field'
            })}
          />
        </div>
        <div className="form-group">
          <label className='mr-3'>Game</label>
          {errors.game && (
            <span className='text-red-500'>{errors.game.message}</span>
          )}
          <Controller
            name='game'
            control={control}
            {...register('game', {
              required: 'Required field'
            })}
            render={({ field }) => (
              <Select
                {...field}
                as={Select}
                className='text-black mb-7 mt-3 rounded-md text-lg'
                options={games.map(g => ({ label: `${g.name}`, value: g.id }))}
                id='game'
                name='game'
                isLoading={gameLoading}
              />
            )}
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
            className='text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
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
            className='text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
            {...register('system', {
              required: 'Required field'
            })}
          />
        </div>

        <div className='flex justify-center md:mx-0 md:flex md:justify-end md:items-center'>
          <button
            type="submit"
            className={`${gameLoading && 'opacity-50 pointer-events-none'
              } w-full md:w-auto rounded-lg text-lg py-3 md:px-12 font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}>
            {gameLoading && (
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