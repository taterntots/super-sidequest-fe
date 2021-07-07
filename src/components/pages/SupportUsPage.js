import React from 'react';

// COMPONENTS
import Hero from '../HeroCard';

// ----------------------------------------------------------------------------------
// ---------------------------------- SUPPORT PAGE ----------------------------------
// ----------------------------------------------------------------------------------

const HomePage = () => {
  return (
    <>
      {/* HERO */}
      <Hero />

      {/* BODY */}
      <div className='px-4 py-4 bg-profiletwo rounded-lg text-white'>
        <h1 className='px-4 py-2 bg-profileone rounded-md text-white text-2xl font-bold'>
          Support Super Sidequest
        </h1>
        <p className='mt-4 mx-2'>
          Super Sidequest is a one-man show managed solely by the super rad dude named tater_n_tots. Currently
          I’m doing my best to keep server costs as low as possible, with absolutely no plans or desire to clutter
          up the site with pesky pop-ups and advertisements. That said, if you’d like to show your thanks by
          helping keep the lights on, feel free to toss a coin to your Tater!
        </p>
        <p className='mt-4 mx-2'>
          At the moment, PayPal is my primary means for accepting donations, though I plan to eventually create a
          Patreon once the mood strikes. Thanks for your support!
        </p>
        <form className='flex justify-center mt-4' action='https://www.paypal.com/donate' method='post' target='_blank'>
          <input type='hidden' name='business' value='GKMUYQZGDWLH8' />
          <input type='hidden' name='no_recurring' value='0' />
          <input type='hidden' name='item_name' value='Super Sidequest' />
          <input type='hidden' name='currency_code' value='USD' />
          <button
            className='rounded-lg text-lg px-12 py-3 md:mb-0 font-medium bg-profileone hover:bg-white hover:text-graybutton focus:ring transition duration-150 ease-in-out'
            type='submit'
            title='PayPal - The safer, easier way to pay online!'
          >
            Donate via PayPal
          </button>
        </form>
        <p className='mt-2 px-10 lg:px-40 text-center text-sm italic'>
          *All donations are non-refundable. Donations do not guarantee future use of the site should servers be
          taken down or a user banned. All questions regarding payment processing should be directed to PayPal.
        </p>
      </div >
    </>
  );
}

export default HomePage;