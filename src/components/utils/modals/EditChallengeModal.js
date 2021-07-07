/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDifficulties,
  difficultySelector
} from '../../../features/difficulty/difficultySlice';
import {
  fetchSystems,
  systemSelector
} from '../../../features/system/systemSlice';

// DATE
import moment from 'moment';

// FORMS
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

// IMAGES
import LoadSpinner from '../../LoadSpinner';

// ----------------------------------------------------------------------------------
// ------------------------------ EDIT CHALLENGE MODAL ------------------------------
// ----------------------------------------------------------------------------------

const EditChallengeModal = ({ open, setOpen, setOpenDelete, submitChallengeEdit, loading, challenge }) => {
  const dispatch = useDispatch();
  const { difficulties, loading: difficultyLoading } = useSelector(difficultySelector);
  const { systems, loading: systemLoading } = useSelector(systemSelector)
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
  const cancelButtonRef = useRef(null)
  const [speedrunDisable, setSpeedrunDisable] = useState(false);
  const [highScoreDisable, setHighScoreDisable] = useState(false);

  // Grabs all necessary data from server
  useEffect(() => {
    dispatch(fetchDifficulties())
    dispatch(fetchSystems())
  }, [dispatch])

  // Updates which type of score should be disabled on load
  useEffect(() => {
    if (challenge.is_speedrun) {
      setHighScoreDisable(true)
    }
    if (challenge.is_high_score) {
      setSpeedrunDisable(true)
    }
    if (!challenge.is_high_score && !challenge.is_speedrun) {
      setHighScoreDisable(false)
      setSpeedrunDisable(false)
    }
  }, [challenge.is_speedrun, challenge.is_high_score])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        static
        className='fixed z-10 inset-0 overflow-y-auto'
        initialFocus={cancelButtonRef}
        open={open}
        onClose={() => {
          reset()
          setOpen(false)
        }}
      >
        <div className='flex items-end justify-center min-h-screen text-center block'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block w-full mx-6 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all mb-6 mt-20 sm:mt-20 max-w-3xl'>
              <form className='p-10 bg-taterpurple text-white' onSubmit={handleSubmit(submitChallengeEdit)}>
                <h4 className='text-2xl mb-4'>
                  Edit Challenge
                </h4>

                <div className='mt-7 form-group'>
                  <label className='mr-3'>Title<span className='text-red-500'>*</span></label>
                  {errors.name && (
                    <span className='text-red-500'>{errors.name.message}</span>)}
                  <input
                    name='name'
                    type='text'
                    defaultValue={challenge.name}
                    placeholder='Rename your challenge'
                    className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
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
                    }
                    )}
                  />
                </div>
                <div className='mt-7 form-group'>
                  <label className='mr-3'>Description<span className='text-red-500'>*</span></label>
                  {errors.description && (
                    <span className='text-red-500'>{errors.description.message}</span>)}
                  <input
                    name='description'
                    type='text'
                    defaultValue={challenge.description}
                    placeholder='Fix your description'
                    className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
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
                <div className='sm:flex sm:justify-between'>
                  <div className='form-group sm:w-5/12'>
                    <label className='mr-3'>System<span className='text-red-500'>*</span></label>
                    {errors.system && (
                      <span className='text-red-500'>{errors.system.message}</span>
                    )}
                    <Controller
                      name='system'
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          as={Select}
                          className='text-black mb-7 mt-3 rounded-md text-lg'
                          options={systems.map(d => ({ label: `${d.name}`, value: d.id }))}
                          id='system'
                          name='system'
                          isLoading={systemLoading}
                          defaultValue={{ label: `${challenge.system}`, value: `${challenge.system_id}` }}
                        />
                      )}
                    />
                  </div>
                  <div className='form-group sm:w-5/12'>
                    <label className='mr-3'>Difficulty<span className='text-red-500'>*</span></label>
                    {errors.difficulty && (
                      <span className='text-red-500'>{errors.difficulty.message}</span>
                    )}
                    <Controller
                      name='difficulty'
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          as={Select}
                          className='text-black mb-7 mt-3 rounded-md text-lg'
                          options={difficulties.map(d => ({ label: `${d.name}`, value: d.id }))}
                          id='difficulty'
                          name='difficulty'
                          isLoading={difficultyLoading}
                          defaultValue={{ label: `${challenge.difficulty}`, value: `${challenge.difficulty_id}` }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className='flex w-full text-center mb-7'>
                  <div className='form-group w-1/2 flex items-center justify-center'>
                    <label className='mr-3'>Speedrun</label>
                    <input
                      name='is_speedrun'
                      type='checkbox'
                      className='w-6 h-6'
                      defaultChecked={challenge.is_speedrun}
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
                      defaultChecked={challenge.is_high_score}
                      onClick={() => setSpeedrunDisable(!speedrunDisable)}
                      disabled={highScoreDisable}
                      {...register('is_high_score')}
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label className='mr-3'>End Date</label>
                  <input
                    name='end_date'
                    type='datetime-local'
                    id='datePickerId'
                    defaultValue={moment(challenge.end_date).format('YYYY-MM-DDThh:mm')}
                    min={moment(Date.now()).format('YYYY-MM-DDThh:mm')}
                    className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
                    {...register('end_date')}
                  />
                </div>
                <div className='form-group'>
                  <label className='mr-3'>Rules</label>
                  {errors.rules && (
                    <span className='text-red-500'>{errors.rules.message}</span>
                  )}
                  <textarea
                    name='rules'
                    type='text'
                    rows='10'
                    defaultValue={challenge.rules}
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
                    defaultValue={challenge.prize}
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

                <div className='sm:flex sm:justify-evenly'>
                  <button
                    type='button'
                    onClick={() => {
                      setOpen(false)
                      reset()
                    }}
                    className={`sm:flex w-full mb-4 sm:mb-0 sm:w-auto items-center rounded-lg text-lg px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className={loading ? 'opacity-80 pointer-events-none sm:flex w-full sm:mb-0 sm:w-auto items-center rounded-lg text-lg px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out' :
                      'sm:flex w-full sm:mb-0 sm:w-auto items-center rounded-lg text-lg px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out'
                    }
                  >
                    {loading ? (
                      <div className='h-7 mr-6'>
                        <LoadSpinner />
                      </div>
                    ) : 'Submit'}
                  </button>
                </div>
              </form>

              {/* DELETE BUTTON */}
              <button
                onClick={() => {
                  setOpen(false)
                  setOpenDelete(true)
                  reset()
                }}
                className={'w-full py-2 text-white text-lg font-medium bg-removered hover:bg-white hover:text-removered'}
              >
                Delete
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default EditChallengeModal;