/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux';
import {
  abandonChallenge
} from '../../../features/challenge/challengeSlice';

// ----------------------------------------------------------------------------------
// ------------------------- REMOVE USER FROM CHALLENGE MODAL -----------------------
// ----------------------------------------------------------------------------------

const RemoveUserFromChallengeModal = ({ open, setOpen, userToBeReset, challenge, refresh, setRefresh }) => {
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null)

  // Function to handle removing a user from a challenge
  const submitUserRemoval = async () => {
    let data = {
      challenge_id: challenge.challenge_id,
      user_id: userToBeReset.user_id
    }

    dispatch(abandonChallenge(data))
      .then(res => {
        setRefresh(!refresh)
        setOpen(false);
      })
      .catch(err => {
        console.log(err)
      })
  };

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
            <div className='inline-block w-full mx-6 mt-14 align-middle rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-lg'>
              <div className='p-7 bg-taterpurple rounded-t-lg text-white'>
                <h4 className='text-2xl text-center mb-4'>
                  {`Remove ${userToBeReset.username}`}
                </h4>
                <p className='text-center mb-7'>
                  {`Are you sure you want remove ${userToBeReset.username} from this quest? This will delete their score and force them to abandon the quest.`}
                </p>
                <div className='sm:flex sm:justify-evenly'>
                  <button
                    type='button'
                    className='flex w-full sm:w-auto justify-center items-center rounded-lg text-lg sm:px-12 py-3 mb-4 sm:mb-0 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out'
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='flex w-full sm:w-auto justify-center items-center rounded-lg text-lg sm:px-12 py-3 mb-4 sm:mb-0 text-center font-medium bg-removered hover:bg-white hover:text-removered focus:ring transition duration-150 ease-in-out'
                    onClick={submitUserRemoval}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default RemoveUserFromChallengeModal;