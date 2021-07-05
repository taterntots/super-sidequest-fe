/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

// ----------------------------------------------------------------------------------
// ------------------------------ ABANDON CHALLENGE MODAL ---------------------------
// ----------------------------------------------------------------------------------

const AbandonChallengeModal = ({ open, setOpen, submitChallengeAbandoned }) => {
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
            <div className='inline-block w-full mx-6 align-middle rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-xl'>
              <div className='p-10 bg-taterpurple rounded-lg text-white'>
                <h4 className='text-2xl text-center mb-4'>
                  Abandon Quest
                </h4>
                <p className='text-center mb-4'>
                  Are you sure you want to abandon this quest?
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
                    onClick={submitChallengeAbandoned}
                  >
                    Abandon
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

export default AbandonChallengeModal;