/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

// FORMS
import { useForm } from 'react-hook-form';

// IMAGES
import LoadSpinner from '../../LoadSpinner';

// ----------------------------------------------------------------------------------
// ----------------------------- EDIT USER PROFILE MODAL ----------------------------
// ----------------------------------------------------------------------------------

const EditUserProfileModal = ({ open, setOpen, setOpenDelete, setOpenBan, setOpenUnban, submitUserProfile, loading, user, user_admin }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const cancelButtonRef = useRef(null)

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
              <form className='p-7 bg-taterpurple text-white' onSubmit={handleSubmit(submitUserProfile)}>
                <h4 className='text-2xl mb-4'>
                  Edit Profile
                </h4>
                <div className='form-group'>
                  <label className='mr-3'>Username</label>
                  {errors.username && (
                    <span className='text-red-500'>{errors.username.message}</span>
                  )}
                  <input
                    name='username'
                    type='username'
                    defaultValue={user.username}
                    placeholder='Enter your username'
                    className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
                    {...register('username', {
                      required: 'Required field',
                      minLength: {
                        value: 4,
                        message: 'Must be at least 4 characters long'
                      },
                      maxLength: {
                        value: 16,
                        message: 'Cannot be more than 16 characters'
                      }
                    })}
                  />
                </div>
                <div className='mt-7 form-group'>
                  <label className='mr-3'>Avatar URL</label>
                  <input
                    name='profile_pic_URL'
                    type='text'
                    defaultValue={user.profile_pic_URL}
                    placeholder='Enter a URL for your avatar'
                    className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
                    {...register('profile_pic_URL')}
                  />
                </div>
                <div className='mt-7 form-group'>
                  <label className='mr-3'>Banner URL</label>
                  <span className='flex sm:inline'>(recommended height: 288px)</span>
                  <input
                    name='banner_pic_URL'
                    type='text'
                    defaultValue={user.banner_pic_URL}
                    placeholder='Enter a URL for your banner'
                    className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
                    {...register('banner_pic_URL')}
                  />
                </div>
                <div className='mt-7 form-group'>
                  <label className='mr-3'>Twitter URL</label>
                  <input
                    name='twitter_URL'
                    type='text'
                    defaultValue={user.twitter_URL}
                    placeholder='Enter a URL for your twitter account'
                    className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
                    {...register('twitter_URL')}
                  />
                </div>
                <div className='mt-7 form-group'>
                  <label className='mr-3'>Twitch URL</label>
                  <input
                    name='twitch_URL'
                    type='text'
                    defaultValue={user.twitch_URL}
                    placeholder='Enter a URL for your twitch account'
                    className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
                    {...register('twitch_URL')}
                  />
                </div>
                <div className='mt-7 form-group'>
                  <label className='mr-3'>Discord URL</label>
                  <input
                    name='discord_URL'
                    type='text'
                    defaultValue={user.discord_URL}
                    placeholder='Enter a URL for your discord account'
                    className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
                    {...register('discord_URL')}
                  />
                </div>
                <div className='mt-7 form-group'>
                  <label className='mr-3'>YouTube URL</label>
                  <input
                    name='youtube_URL'
                    type='text'
                    defaultValue={user.youtube_URL}
                    placeholder='Enter a URL for your youtube account'
                    className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
                    {...register('youtube_URL')}
                  />
                </div>
                <div className='flex justify-between'>
                  <div className='form-group w-2/5'>
                    <label className='mr-3'>BG Color #1</label>
                    <input
                      name='profile_color_one'
                      type='color'
                      defaultValue={user.profile_color_one}
                      className='form-control text-black w-full flex items-center h-8 px-1 mt-3 rounded-md text-lg'
                      {...register('profile_color_one')}
                    />
                  </div>
                  <div className='form-group w-2/5'>
                    <label className='mr-3'>BG Color #2</label>
                    <input
                      name='profile_color_two'
                      type='color'
                      defaultValue={user.profile_color_two}
                      className='form-control text-black w-full flex items-center h-8 px-1 mt-3 rounded-md text-lg'
                      {...register('profile_color_two')}
                    />
                  </div>
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
              {user_admin && localStorage.getItem('token') ? (
                <div>
                  <button
                    onClick={() => {
                      setOpen(false)
                      if (user.is_banned) {
                        setOpenUnban(true)
                      } else {
                        setOpenBan(true)
                      }
                      reset()
                    }}
                    className='w-1/2 py-2 text-white text-lg font-medium bg-removered hover:bg-white hover:text-removered border-r-2'
                  >
                    {user.is_banned ? (
                      'Unban'
                    ) : 'Ban'}
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false)
                      setOpenDelete(true)
                      reset()
                    }}
                    className='w-1/2 py-2 text-white text-lg font-medium bg-removered hover:bg-white hover:text-removered'
                  >
                    Delete
                  </button>
                </div>
              ) : null}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default EditUserProfileModal;