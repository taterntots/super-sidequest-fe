import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPublicGames,
  gameSelector
} from '../../features/game/gameSlice';
import {
  fetchSystems,
  systemSelector
} from '../../features/system/systemSlice';
import {
  fetchDifficulties,
  difficultySelector
} from '../../features/difficulty/difficultySlice';
import {
  addChallenge,
  challengeSelector
} from '../../features/challenge/challengeSlice';

// ROUTING
import { useHistory } from 'react-router-dom';

// FORMS
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

// DATE
import moment from 'moment';

// IMAGES
import LoadSpinner from '../../components/LoadSpinner';

// ----------------------------------------------------------------------------------
// -------------------------------- CHALLENGE FORM ----------------------------------
// ----------------------------------------------------------------------------------

const ChallengeForm = ({ refresh, setRefresh, ProfileOne, ProfileTwoForm, ProfileOneButton }) => {
  // State
  const dispatch = useDispatch();
  const { public_games, loading: gameLoading } = useSelector(gameSelector)
  const { systems, loading: systemLoading } = useSelector(systemSelector)
  const { difficulties, loading: difficultyLoading } = useSelector(difficultySelector);
  const { loading: challengeLoading } = useSelector(challengeSelector);
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [speedrunDisable, setSpeedrunDisable] = useState(false);
  const [highScoreDisable, setHighScoreDisable] = useState(false);
  const history = useHistory();

  // Grabs all necessary data from server
  useEffect(() => {
    dispatch(fetchPublicGames())
    dispatch(fetchSystems())
    dispatch(fetchDifficulties())
  }, [dispatch])

  // Function to handle submitting Login form
  const onSubmit = async (data) => {
    data.end_date = moment(data.end_date).toDate()

    dispatch(addChallenge(data))
      .then(res => {
        if (res.payload) {
          setRefresh(!refresh)
          history.push(`/${localStorage.getItem('username')}/challenges/${res.payload.challenge_id}`)
        } else {
          setRefresh(!refresh)
          history.push(`/`)
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <ProfileOne className='p-4 rounded-tr-md bg-profileone rounded-b-md'>
      <ProfileTwoForm className='px-4 sm:px-10 pb-4 bg-profiletwo rounded-lg text-white' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-center text-2xl font-medium py-4 lg:my-0'>
          Create a quest
        </h1>
        <div className='sm:flex sm:justify-between'>
          <div className='form-group sm:w-5/12'>
            <label className='mr-3'>Game<span className='text-red-500'>*</span></label>
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
                  options={public_games.map(pg => ({ label: `${pg.name}`, value: pg.id }))}
                  id='game'
                  name='game'
                  isLoading={gameLoading}
                />
              )}
            />
          </div>
          <div className='form-group sm:w-5/12'>
            <label className='mr-3'>System<span className='text-red-500'>*</span></label>
            {errors.system && (
              <span className='text-red-500'>{errors.system.message}</span>
            )}
            <Controller
              name='system'
              control={control}
              {...register('system', {
                required: 'Required field'
              })}
              render={({ field }) => (
                <Select
                  {...field}
                  as={Select}
                  className='text-black mb-7 mt-3 rounded-md text-lg'
                  options={systems.map(g => ({ label: `${g.name}`, value: g.id }))}
                  id='system'
                  name='system'
                  isLoading={systemLoading}
                />
              )}
            />
          </div>
        </div>
        <div className='form-group'>
          <label className='mr-3'>Quest Title<span className='text-red-500'>*</span></label>
          {errors.name && (
            <span className='text-red-500'>{errors.name.message}</span>
          )}
          <input
            name='name'
            type='text'
            placeholder='Enter a snazzy name for your quest'
            className='text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
            {...register('name', {
              required: 'Required field',
              minLength: {
                value: 6,
                message: 'Must be at least 6 characters long'
              },
              maxLength: {
                value: 40,
                message: 'Cannot be more than 40 characters'
              }
            })}
          />
        </div>
        <div className='form-group'>
          <label className='mr-3'>Description<span className='text-red-500'>*</span></label>
          {errors.description && (
            <span className='text-red-500'>{errors.description.message}</span>
          )}
          <input
            name='description'
            type='text'
            placeholder='What is your quest?'
            className='text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
            {...register('description', {
              required: 'Required field',
              minLength: {
                value: 6,
                message: 'Must be at least 6 characters long'
              },
              maxLength: {
                value: 80,
                message: 'Cannot be more than 80 characters'
              }
            })}
          />
        </div>
        <div className='sm:flex'>
          <div className='form-group sm:w-1/3'>
            <label className='mr-3'>Difficulty<span className='text-red-500'>*</span></label>
            {errors.difficulty && (
              <span className='text-red-500'>{errors.difficulty.message}</span>
            )}
            <Controller
              name='difficulty'
              control={control}
              {...register('difficulty', {
                required: 'Required field'
              })}
              render={({ field }) => (
                <Select
                  {...field}
                  as={Select}
                  className='text-black mb-7 mt-3 rounded-md text-lg'
                  options={difficulties.map(g => ({ label: `${g.name}`, value: g.id }))}
                  id='difficulty'
                  name='difficulty'
                  isLoading={difficultyLoading}
                />
              )}
            />
          </div>
          <div className='flex w-full sm:w-2/3 text-center mb-7 sm:mb-0'>
            <div className='form-group w-1/2 flex items-center justify-center'>
              <label className='mr-3'>Speedrun</label>
              <input
                name='is_speedrun'
                type='checkbox'
                className='w-6 h-6'
                onClick={() => setHighScoreDisable(!highScoreDisable)}
                disabled={speedrunDisable}
                {...register('is_speedrun')}
              />
            </div>
            <div className='form-group w-1/2 flex items-center justify-center'>
              <label className='mr-3'>High Score</label>
              <input
                name='is_high_score'
                type='checkbox'
                className='w-6 h-6'
                onClick={() => setSpeedrunDisable(!speedrunDisable)}
                disabled={highScoreDisable}
                {...register('is_high_score')}
              />
            </div>
          </div>
        </div>
        <div className='sm:flex sm:justify-between'>
          <div className='form-group sm:w-5/12'>
            <label className='mr-3'>Start Date</label>
            <input
              name='start_date'
              type='date'
              value={moment(Date.now()).format('YYYY-MM-DD')}
              disabled={true}
              className='text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
              {...register('start_date')}
            />
          </div>
          <div className='form-group sm:w-5/12'>
            <label className='mr-3'>End Date</label>
            <input
              name='end_date'
              type='datetime-local'
              id='datePickerId'
              min={moment(Date.now()).format('YYYY-MM-DDTHH:mm')}
              className='text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
              {...register('end_date')}
            />
          </div>
        </div>
        <div className='form-group'>
          <label className='mr-3'>Rules</label>
          {errors.rules && (
            <span className='text-red-500'>{errors.rules.message}</span>
          )}
          <textarea
            name='rules'
            type='text'
            rows='12'
            placeholder='Provide any special rules for your quest'
            className='text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
            {...register('rules', {
              minLength: {
                value: 6,
                message: 'Must be at least 6 characters long'
              }
            })}
          />
        </div>
        <div className='form-group'>
          <label className='mr-3'>Prize</label>
          {errors.prize && (
            <span className='text-red-500'>{errors.prize.message}</span>
          )}
          <input
            name='prize'
            type='text'
            placeholder='Provide a special prize for completing the quest'
            className='text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
            {...register('prize', {
              minLength: {
                value: 6,
                message: 'Must be at least 6 characters long'
              },
              maxLength: {
                value: 80,
                message: 'Cannot be more than 80 characters'
              }
            })}
          />
        </div>

        <div className='flex justify-center sm:mx-0 sm:flex sm:justify-end sm:items-center'>
          <ProfileOneButton
            type='submit'
            className={challengeLoading ? 'opacity-80 pointer-events-none w-full sm:w-auto rounded-lg text-lg py-3 sm:px-12 font-medium bg-profileone hover:bg-white hover:text-profileone focus:ring transition duration-150 ease-in-out' :
              'w-full sm:w-auto rounded-lg text-lg py-3 sm:px-12 font-medium bg-profileone hover:bg-white hover:text-graybutton focus:ring transition duration-150 ease-in-out'
            }
          >
            {challengeLoading ? (
              <div className='h-7 mr-6'>
                <LoadSpinner />
              </div>
            ) : 'Submit'}
          </ProfileOneButton>
        </div>
      </ProfileTwoForm>
    </ProfileOne>
  );
}

export default ChallengeForm;