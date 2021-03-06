/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

// COMPONENTS
import Login from '../../Auth/Login';
import Signup from '../../Auth/Signup';
import ForgotPassword from '../../Auth/ForgotPassword';
import ResetPassword from '../../Auth/ResetPassword';
import Verify from '../../Auth/Verify';

// ----------------------------------------------------------------------------------
// ----------------------------------- AUTH MODAL -----------------------------------
// ----------------------------------------------------------------------------------

const AuthModal = ({ open, setOpen, authPage, setAuthPage, refresh, setRefresh }) => {
  const cancelButtonRef = useRef(null)
  const [currentUserEmail, setCurrentUserEmail] = useState('')

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
            <div className='inline-block w-full mx-6 mt-14 align-middle rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-xl'>
              {authPage === 'login' ? (
                <Login setAuthPage={setAuthPage} setOpenAuth={setOpen} refresh={refresh} setRefresh={setRefresh} setCurrentUserEmail={setCurrentUserEmail} />
              ) : authPage === 'signup' ? (
                <Signup setAuthPage={setAuthPage} refresh={refresh} setRefresh={setRefresh} setCurrentUserEmail={setCurrentUserEmail} />
              ) : authPage === 'forgot_password' ? (
                <ForgotPassword setAuthPage={setAuthPage} setOpenAuth={setOpen} />
              ) : authPage === 'reset_password' ? (
                <ResetPassword setAuthPage={setAuthPage} />
              ) : authPage === 'verify' ? (
                <Verify setAuthPage={setAuthPage} setOpenAuth={setOpen} refresh={refresh} setRefresh={setRefresh} currentUserEmail={currentUserEmail} setCurrentUserEmail={setCurrentUserEmail} />
              ) : null}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AuthModal;