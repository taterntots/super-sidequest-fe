/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

// FORMS
import { useForm } from "react-hook-form";

// IMAGES
import { ReactComponent as LoadingSpinner } from '../../../img/LoadingSpinner.svg';

// ----------------------------------------------------------------------------------
// ------------------------- SUBMIT CHALLENGE PROGRESS MODAL ------------------------
// ----------------------------------------------------------------------------------

const SubmitChallengeProgressModal = ({ open, setOpen, submitChallengeProgress, loading, acceptedChallenge, challenge }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-full mx-6 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form className="p-10 bg-taterpurple rounded-lg text-white" onSubmit={handleSubmit(submitChallengeProgress)}>
                <h4 className='text-2xl mb-4'>
                  {challenge.is_high_score ? 'Update High Score' : challenge.is_speedrun ? 'Update Speedrun' : 'Update Challenge'}
                </h4>
                {challenge.is_high_score ? (
                  <div className="form-group">
                    <label className='mr-3'>High Score<span className='text-red-500'>*</span></label>
                    {errors.high_score && (
                      <span className='text-red-500'>{errors.high_score.message}</span>
                    )}
                    <input
                      name='high_score'
                      type='number'
                      min='0'
                      max='1000000000'
                      defaultValue={acceptedChallenge.high_score}
                      placeholder='Enter your high score'
                      className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
                      {...register('high_score', {
                        required: 'Required field',
                        maxLength: {
                          value: 10,
                          message: 'Too large'
                        }
                      })}
                    />
                  </div>
                ) : challenge.is_speedrun ? (
                  <div className="form-group">
                    <label className='mr-3'>Time<span className='text-red-500'>*</span></label>

                    {/* <div className='flex'>
                      {errors.speedrun_hours && (
                        <p className='mr-4 text-red-500'>{errors.speedrun_hours.message}</p>
                      )}
                      {errors.speedrun_minutes && (
                        <p className='mr-4 text-red-500'>{errors.speedrun_minutes.message}</p>
                      )}
                      {errors.speedrun_seconds && (
                        <p className='mr-4 text-red-500'>{errors.speedrun_seconds.message}</p>
                      )}
                      {errors.speedrun_milliseconds && (
                        <p className='text-red-500'>{errors.speedrun_milliseconds.message}</p>
                      )}
                    </div> */}
                    <div className='flex'>
                      <div className='w-full'>
                        <input
                          name='speedrun_hours'
                          type='number'
                          min='0'
                          max='999'
                          defaultValue={acceptedChallenge.speedrun_hours}
                          placeholder='Hours'
                          className='form-control text-black w-full flex items-center mt-3 p-2 rounded-md text-lg'
                          {...register('speedrun_hours', {
                            required: 'Required',
                            maxLength: {
                              value: 3,
                              message: 'Too large'
                            }
                          })}
                        />
                        {errors.speedrun_hours && (
                          <p className='mr-4 text-red-500'>{errors.speedrun_hours.message}</p>
                        )}
                      </div>
                      <p className='mx-2 mt-4 text-2xl'>:</p>
                      <div className='w-full'>
                        <input
                          name='speedrun_minutes'
                          type='number'
                          min='0'
                          max='59'
                          defaultValue={acceptedChallenge.speedrun_minutes}
                          placeholder='Minutes'
                          className='flex form-control text-black w-full flex items-center mt-3 p-2 rounded-md text-lg'
                          {...register('speedrun_minutes', {
                            required: 'Required',
                            maxLength: {
                              value: 2,
                              message: 'Too large'
                            }
                          })}
                        />
                        {errors.speedrun_minutes && (
                          <p className='mr-4 text-red-500'>{errors.speedrun_minutes.message}</p>
                        )}
                      </div>
                      <p className='mx-2 mt-4 text-2xl'>:</p>
                      <div className='w-full'>
                        <input
                          name='speedrun_seconds'
                          type='number'
                          min='0'
                          max='59'
                          defaultValue={acceptedChallenge.speedrun_seconds}
                          placeholder='Seconds'
                          className='flex form-control text-black w-full flex items-center mt-3 p-2 rounded-md text-lg'
                          {...register('speedrun_seconds', {
                            required: 'Required',
                            maxLength: {
                              value: 2,
                              message: 'Too large'
                            }
                          })}
                        />
                        {errors.speedrun_seconds && (
                          <p className='mr-4 text-red-500'>{errors.speedrun_seconds.message}</p>
                        )}
                      </div>
                      <p className='mx-2 mt-4 text-2xl'>.</p>
                      <div className='w-full'>
                        <input
                          name='speedrun_milliseconds'
                          type='number'
                          min='0'
                          max='999'
                          defaultValue={acceptedChallenge.speedrun_milliseconds}
                          placeholder='Millisecs'
                          className='flex form-control text-black w-full flex items-center mt-3 p-2 rounded-md text-lg'
                          {...register('speedrun_milliseconds', {
                            required: 'Required',
                            maxLength: {
                              value: 3,
                              message: 'Too large'
                            }
                          })}
                        />
                        {errors.speedrun_milliseconds && (
                          <p className='mr-4 text-red-500'>{errors.speedrun_milliseconds.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="mt-7 form-group">
                  <label className='mr-3'>Video URL</label>
                  <input
                    name='video_URL'
                    type='text'
                    defaultValue={acceptedChallenge.video_URL}
                    placeholder='Provide a video for proof'
                    className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
                    {...register('video_URL')}
                  />
                </div>
                <div className="form-group">
                  <label className='mr-3'>Image URL</label>
                  <input
                    name='image_URL'
                    type='text'
                    defaultValue={acceptedChallenge.image_URL}
                    placeholder='Provide an image for proof'
                    className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
                    {...register('image_URL')}
                  />
                </div>

                <div className='flex justify-evenly'>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      reset()
                    }}
                    className={`flex items-center rounded-lg text-lg px-12 md:px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`${loading && 'opacity-50 pointer-events-none'
                      } flex items-center rounded-lg text-lg px-12 md:px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}
                  >
                    {loading && (
                      <LoadingSpinner />
                    )}
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SubmitChallengeProgressModal;