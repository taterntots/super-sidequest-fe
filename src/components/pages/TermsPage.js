import React from 'react';

// COMPONENTS
import Hero from '../HeroCard';

// ----------------------------------------------------------------------------------
// ----------------------------------- TERMS PAGE -----------------------------------
// ----------------------------------------------------------------------------------

const TermsPage = () => {
  return (
    <>
      {/* HERO */}
      <Hero />

      <div className='px-4 py-4 bg-profiletwo rounded-lg text-white'>
        {/* PRIVACY POLICY */}
        <h1 id='what' className='px-4 py-2 bg-profileone rounded-md text-white text-2xl font-bold'>
          Privacy Policy
        </h1>
        <p className='my-2 mx-2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius nisl sit amet mauris sodales
          rhoncus. Aliquam iaculis augue volutpat nulla consectetur tempus. Mauris at nibh vestibulum orci blandit
          fringilla dignissim in velit. Morbi nec vulputate nisi. Nulla pretium leo sed lorem rutrum, et feugiat
          mauris feugiat. Nam elementum enim nec augue viverra mollis. Pellentesque laoreet, sem nec bibendum dapibus,
          tellus quam molestie purus, a dignissim felis metus vel est. Sed tincidunt ac ipsum a sagittis.
        </p>
        <h1 id='second' className='px-4 py-2 bg-profileone rounded-md text-white text-2xl font-bold'>
          Terms of Use
        </h1>
        <p className='mt-2 mx-2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius nisl sit amet mauris sodales
          rhoncus. Aliquam iaculis augue volutpat nulla consectetur tempus. Mauris at nibh vestibulum orci blandit
          fringilla dignissim in velit. Morbi nec vulputate nisi. Nulla pretium leo sed lorem rutrum, et feugiat
          mauris feugiat. Nam elementum enim nec augue viverra mollis. Pellentesque laoreet, sem nec bibendum dapibus,
          tellus quam molestie purus, a dignissim felis metus vel est. Sed tincidunt ac ipsum a sagittis.
        </p>
      </div >
    </>
  );
}

export default TermsPage;