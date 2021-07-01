import React from 'react';

// COMPONENTS
import Hero from '../HeroCard';

// ----------------------------------------------------------------------------------
// ---------------------------------- ABOUT US PAGE ---------------------------------
// ----------------------------------------------------------------------------------

const AboutUsPage = () => {
  return (
    <>
      {/* HERO */}
      <Hero />

      {/* BODY */}
      <div className='px-4 py-4 bg-profiletwo rounded-lg text-white'>
        <h2 className='px-4 py-2 bg-profileone rounded-md text-white text-2xl font-bold'>
          About Us
        </h2>
        <p className='mt-2 mx-2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius nisl sit amet mauris sodales
          rhoncus. Aliquam iaculis augue volutpat nulla consectetur tempus. Mauris at nibh vestibulum orci blandit
          fringilla dignissim in velit. Morbi nec vulputate nisi. Nulla pretium leo sed lorem rutrum, et feugiat
          mauris feugiat. Nam elementum enim nec augue viverra mollis. Pellentesque laoreet, sem nec bibendum dapibus,
          tellus quam molestie purus, a dignissim felis metus vel est. Sed tincidunt ac ipsum a sagittis.
        </p>
        <p className='mt-2 mx-2'>
          Duis lacinia feugiat justo a maximus. Cras sit amet lacus mi. Nullam ac auctor est. Duis tempor elit
          neque, vel rutrum libero consequat non. Vestibulum convallis neque magna, at commodo sapien molestie
          vel. Vestibulum convallis pretium odio, vitae luctus odio venenatis posuere. Pellentesque ullamcorper
          diam nulla, in blandit libero feugiat nec. Praesent porta dolor et cursus rutrum. Nulla porttitor lectus
          in neque tristique, sagittis facilisis lorem vestibulum.
        </p>
      </div >
    </>
  );
}

export default AboutUsPage;