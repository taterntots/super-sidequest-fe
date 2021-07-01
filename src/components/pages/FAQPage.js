import React from 'react';

// COMPONENTS
import Hero from '../HeroCard';

// ----------------------------------------------------------------------------------
// ------------------------------------ FAQ PAGE ------------------------------------
// ----------------------------------------------------------------------------------

const FAQPage = () => {
  return (
    <>
      {/* HERO */}
      <Hero />

      <div className='px-4 py-4 bg-profiletwo rounded-lg text-white'>
        {/* TABLE OF CONTENTS */}
        <div className='mb-0'>
          <h1 className='px-4 py-2 bg-profileone rounded-md text-white text-2xl font-bold'>
            FAQ
          </h1>
          <ul className='list-inside list-disc font-medium my-2 mx-2'>
            <li><a href='#what' className='text-purple-200 hover:text-gray-100 cursor-pointer'>What is Super Sidequest?</a></li>
            <li><a href='#second' className='text-purple-200 hover:text-gray-100 cursor-pointer'>Second Question</a></li>
            <li><a href='#third' className='text-purple-200 hover:text-gray-100 cursor-pointer'>Third Question</a></li>
          </ul>
        </div>

        {/* QUESTIONS */}
        <h2 id='what' className='px-4 py-2 bg-profileone rounded-md text-white text-2xl font-bold'>
          What is Super Sidequest?
        </h2>
        <p className='my-2 mx-2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius nisl sit amet mauris sodales
          rhoncus. Aliquam iaculis augue volutpat nulla consectetur tempus. Mauris at nibh vestibulum orci blandit
          fringilla dignissim in velit. Morbi nec vulputate nisi. Nulla pretium leo sed lorem rutrum, et feugiat
          mauris feugiat. Nam elementum enim nec augue viverra mollis. Pellentesque laoreet, sem nec bibendum dapibus,
          tellus quam molestie purus, a dignissim felis metus vel est. Sed tincidunt ac ipsum a sagittis.
        </p>
        <h2 id='second' className='px-4 py-2 bg-profileone rounded-md text-white text-2xl font-bold'>
          A Second Question
        </h2>
        <p className='my-2 mx-2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius nisl sit amet mauris sodales
          rhoncus. Aliquam iaculis augue volutpat nulla consectetur tempus. Mauris at nibh vestibulum orci blandit
          fringilla dignissim in velit. Morbi nec vulputate nisi. Nulla pretium leo sed lorem rutrum, et feugiat
          mauris feugiat. Nam elementum enim nec augue viverra mollis. Pellentesque laoreet, sem nec bibendum dapibus,
          tellus quam molestie purus, a dignissim felis metus vel est. Sed tincidunt ac ipsum a sagittis.
        </p>
        <h2 id='third' className='px-4 py-2 bg-profileone rounded-md text-white text-2xl font-bold'>
          A Third Question
        </h2>
        <p className='my-2 mx-2'>
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

export default FAQPage;