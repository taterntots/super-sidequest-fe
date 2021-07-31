import React from 'react';

// COMPONENTS
import Hero from '../HeroCard';

// ----------------------------------------------------------------------------------
// ----------------------------------- TERMS PAGE -----------------------------------
// ----------------------------------------------------------------------------------

const TermsPage = ({ refresh, setRefresh }) => {
  return (
    <>
      {/* HERO */}
      <Hero refresh={refresh} setRefresh={setRefresh} />

      <div className='px-4 py-4 bg-profiletwo rounded-lg text-white'>
        {/* PRIVACY POLICY */}
        <div className='flex justify-between px-4 py-2 bg-profileone rounded-md text-white'>
          <h1 className='text-2xl font-bold'>
            Privacy Policy
          </h1>
          <p className='font-medium self-center'>
            <span className='hidden sm:inline'>Last Updated: </span>July 7th, 2021
          </p>
        </div>
        <h2 className='mt-4 mx-2 text-lg font-bold'>
          Personal Information
        </h2>
        <p className='mb-4 mx-4'>
          Super Sidequest will not sell, trade, or give away any personally-identifiable information to any
          third party. We reserve the right to sell, trade, or give away anonymous or aggregate information but
          do not currently do so.
        </p>
        <h2 className='mt-4 mx-2 text-lg font-bold'>
          Information We Collect
        </h2>
        <p className='mb-2 mx-4'>
          The following information is collected when a user creates an account on Super Sidequest and uses
          the website:
        </p>
        <ul className='list-outside list-disc mx-10 mb-4'>
          <li>Email Address</li>
          <li>Username</li>
          <li>Password (Salted and Hashed for security. Passwords are not stored as plain text and are not accessible by Super Sidequest staff or moderators.)</li>
          <li>Profile and game quest/challenge data as voluntarily supplied by the user.</li>
        </ul>
        <h2 className='mt-4 mx-2 text-lg font-bold'>
          How We Use This Information
        </h2>
        <p className='mb-4 mx-4'>
          The above information is used to provide certain services for the site which require it. These include
          account administration and security, password reset via email, responding to messages sent via our
          Contact form, and displaying quest data submitted by users.
        </p>
        <p className='mb-4 mx-4'>
          Super Sidequest will not directly, or through a third party, send advertisements to your email address.
          We may rarely send emails if your account requires your attention or in response to a message sent
          via our Contact form.
        </p>
        <h2 className='mt-4 mx-2 text-lg font-bold'>
          Deleting Your Information
        </h2>
        <p className='mb-4 mx-4'>
          If you need your account and personal information deleted for any reason, you can request to have your
          account deleted via the Contact form. Once completed this is not reversible and will delete all quests
          that are linked to that account.
        </p>
        <h2 className='mt-4 mx-2 text-lg font-bold'>
          Cookies
        </h2>
        <p className='mb-4 mx-4'>
          We do not employ cookies to track your local computer’s settings such as which account you have logged
          into. Instead, we store small bits of data locally within a user’s browser via local storage. We do not
          store any sensitive data, such as emails.
        </p>
        <p className='mb-4 mx-4'>
          In the future, we may use third party website analytic tools such as Google Analytics on our website
          that employ cookies to collect certain information concerning your use of our site.
        </p>

        {/* TERMS OF USE */}
        <div className='flex justify-between px-4 py-2 bg-profileone rounded-md text-white'>
          <h1 className='text-2xl font-bold'>
            Terms of Use
          </h1>
          <p className='font-medium self-center'>
            <span className='hidden sm:inline'>Last Updated: </span>July 7th, 2021
          </p>
        </div>
        <h2 className='mt-4 mx-2 text-lg font-bold'>
          Children prohibited
        </h2>
        <p className='mb-4 mx-4'>
          The Children's Online Privacy Protection Act (COPPA) severely restricts what information can be
          collected from children under 13. For this reason, children under 13 are prohibited from using Super
          Sidequest. Children 13 and over may participate with the permission and guidance of a parent or guardian.
          Users of all ages are warned not to provide profile information without weighing the risks and benefits,
          and never to provide their phone number, address, or other critical personal data online.
        </p>
        <h2 className='mt-4 mx-2 text-lg font-bold'>
          Community
        </h2>
        <p className='mb-4 mx-4'>
          Super Sidequest aims to be a friendly, inclusive community for anyone who wants to participate.
          Bigotry, slurs, harassment, or other personal attacks will not be tolerated.
        </p>
        <h2 className='mt-4 mx-2 text-lg font-bold'>
          How to Deal with Abuse
        </h2>
        <p className='mb-4 mx-4'>
          Currently there are no social features that allow direct interaction between users. That said,
          should a user display extremely vile language or behavior on their profile or quests, please contact
          us immediately using the Contact form.
        </p>
        <h2 className='mt-4 mx-2 text-lg font-bold'>
          Empty accounts
        </h2>
        <p className='mb-4 mx-4'>
          We may delete users with no accepted or created quests after three months.
        </p>
        <h2 className='mt-4 mx-2 text-lg font-bold'>
          Intended Use
        </h2>
        <p className='mb-4 mx-4'>
          Super Sidequest is a video game website and may not be used to list other forms of media, including
          but not limited to movies and music.
        </p>
        <h2 className='mt-4 mx-2 text-lg font-bold'>
          Miscellaneous Things You Can't Do
        </h2>
        <p className='mb-4 mx-4'>
          Time to cover my butt with some obvious things any decent human being will understand:
        </p>
        <ul className='list-outside list-disc mx-10 mb-4'>
          <li>Super Sidequest may not be used for any illegal activity.</li>
          <li>Users may not use Super Sidequest to injure, threaten, stalk, or harass someone.</li>
          <li>Do not post pornographic or ultra-violent pictures.</li>
          <li>Your username may not be an insult, either general or specific.</li>
          <li>Your username and other details may not be calculated to impersonate someone or some organization, including Super Sidequest.</li>
        </ul>
        <h2 className='mt-4 mx-2 text-lg font-bold'>
          Policy Changes
        </h2>
        <p className='mb-4 mx-4'>
          We reserve the right to update or modify this Privacy Policy at any time without prior notice.
          Please review this policy periodically, and especially before you provide any information. This
          Privacy Policy was last updated on the date indicated above. Your continued use of the Services
          after any changes or revisions to this Privacy Policy shall indicate your agreement with the terms
          of such revised Privacy Policy. We promise not to change any of the core principles above, particularly
          the sale of information rule, and to make substantive changes openly and with the opportunity for users
          to withdraw their accounts.
        </p>
      </div >
    </>
  );
}

export default TermsPage;