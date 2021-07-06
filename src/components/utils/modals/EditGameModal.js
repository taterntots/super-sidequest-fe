/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

// FORMS
import { useForm } from 'react-hook-form';

// IMAGES
import LoadSpinner from '../../LoadSpinner';

// ----------------------------------------------------------------------------------
// -------------------------------- EDIT GAME MODAL ---------------------------------
// ----------------------------------------------------------------------------------

const EditGameModal = ({ open, setOpen, setOpenDelete, submitGameEdit, loading, game }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        static
        className='fixed z-10 inset-0 overflow-y-auto'
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className='flex items-center justify-center min-h-screen text-center block'>
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
            <div className='inline-block w-full mx-6 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all mb-6 mt-20 sm:mt-20 max-w-lg'>
              <form className='p-10 bg-taterpurple text-white' onSubmit={handleSubmit(submitGameEdit)}>
                <h4 className='text-2xl mb-4'>
                  Edit Game
                </h4>
                <div className='mt-7 form-group'>
                  <label className='mr-3'>Game Name<span className='text-red-500'>*</span></label>
                  {errors.name && (
                    <span className='text-red-500'>{errors.name.message}</span>)}
                  <input
                    name='name'
                    type='text'
                    placeholder='Name of the game'
                    defaultValue={game.name}
                    className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
                    {...register('name', {
                      required: 'Required field',
                    }
                    )}
                  />
                </div>
                <div className='mt-7 form-group'>
                  <label className='mr-3'>Release Date</label>
                  <input
                    name='release_date'
                    type='date'
                    defaultValue={game.release_date ? game.release_date.slice(0, 10) : null}
                    className='text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
                    {...register('release_date')}
                  />
                </div>
                <div className='mt-7 form-group'>
                  <label className='mr-3'>Game Banner URL</label>
                  <input
                    name='banner_pic_URL'
                    type='text'
                    placeholder='Banner url'
                    defaultValue={game.banner_pic_URL}
                    className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
                    {...register('banner_pic_URL')}
                  />
                </div>
                <div className='mt-7 form-group'>
                  <label className='mr-3'>Game Profile URL</label>
                  <input
                    name='game_pic_URL'
                    type='text'
                    placeholder='Profile image url'
                    defaultValue={game.game_pic_URL}
                    className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
                    {...register('game_pic_URL')}
                  />
                </div>
                <div className='form-group mt-7 flex items-center justify-center'>
                  <label className='mr-3'>Public</label>
                  <input
                    name='public'
                    type='checkbox'
                    defaultChecked={game.public}
                    className='w-6 h-6'
                    {...register('public')}
                  />
                </div>

                <div className='sm:flex sm:justify-evenly mt-7'>
                  <button
                    type='button'
                    onClick={() => {
                      setOpen(false)
                      reset()
                    }}
                    className={`flex w-full justify-center sm:w-auto items-center rounded-lg text-lg px-12 md:px-12 py-3 mb-4 sm:mb-0 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className={loading ? 'opacity-80 pointer-events-none flex w-full justify-center sm:w-auto items-center rounded-lg text-lg px-12 md:px-12 py-3 mb-4 sm:mb-0 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out' :
                      'flex w-full justify-center sm:w-auto items-center rounded-lg text-lg px-12 md:px-12 py-3 sm:mb-0 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out'
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

export default EditGameModal;