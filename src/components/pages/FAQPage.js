import React from 'react';

// COMPONENTS
import Hero from '../HeroCard';

// ----------------------------------------------------------------------------------
// ------------------------------------ FAQ PAGE ------------------------------------
// ----------------------------------------------------------------------------------

const FAQPage = ({ refresh, setRefresh }) => {
  return (
    <>
      {/* HERO */}
      <Hero refresh={refresh} setRefresh={setRefresh} />

      <div className='px-4 py-4 bg-profiletwo rounded-lg text-white'>
        {/* TABLE OF CONTENTS */}
        <div className='mb-0'>
          <h1 className='px-4 py-2 bg-profileone rounded-md text-white text-2xl font-bold'>
            FAQ
          </h1>
          <ul className='list-outside list-disc font-medium my-4 mx-6'>
            <li><a href='#what' className='text-texthighlight hover:text-texthighlighthover cursor-pointer'>What is Super Sidequest?</a></li>
            <li><a href='#gamerequest' className='text-texthighlight hover:text-texthighlighthover cursor-pointer'>How do I create a quest for a game that is not featured on the site?</a></li>
            <li><a href='#featured' className='text-texthighlight hover:text-texthighlighthover cursor-pointer'>How do featured quests work?</a></li>
            <li><a href='#compete' className='text-texthighlight hover:text-texthighlighthover cursor-pointer'>I’m not really that competitive of a person. Is Super Sidequest right for me?</a></li>
            <li><a href='#mobile' className='text-texthighlight hover:text-texthighlighthover cursor-pointer'>Will you make a smartphone app?</a></li>
            <li><a href='#question' className='text-texthighlight hover:text-texthighlighthover cursor-pointer'>I've sent in a question but I haven't gotten a reply. Do you read them?</a></li>
            <li><a href='#username' className='text-texthighlight hover:text-texthighlighthover cursor-pointer'>Can I change my username or email address?</a></li>
          </ul>
        </div>

        {/* QUESTIONS */}
        <h2 id='what' className='px-4 py-2 bg-profileone rounded-md text-white text-2xl font-bold'>
          What is Super Sidequest?
        </h2>
        <p className='my-4 mx-2'>
          Super Sidequest’s goal is to let people create their own video game challenges for their friends,
          family, and communities to compete in - sort of like a personal achievement system for when in-game
          achievements just aren’t cutting it.
        </p>
        <h2 id='gamerequest' className='px-4 py-2 bg-profileone rounded-md text-white text-2xl font-bold'>
          How do I create a quest for a game that is not on the site?
        </h2>
        <p className='my-4 mx-2'>
          If a game you’d like to make a quest for is not featured on the site, simply hit the “Request a Game” button
          at the top of the games page and type in your request! A site admin will then need to approve the game before
          it goes live on the site. This is to prevent duplicate/typoed versions of the same game cluttering up the
          database.
        </p>
        <h2 id='featured' className='px-4 py-2 bg-profileone rounded-md text-white text-2xl font-bold'>
          How do featured quests work?
        </h2>
        <p className='my-4 mx-2'>
          Featured quests are special quests you wish to give special attention to when someone visits your
          profile page. Any quest you have created can be marked as featured, though only one quest may be
          featured at a time.
        </p>
        <h2 id='compete' className='px-4 py-2 bg-profileone rounded-md text-white text-2xl font-bold'>
          I’m not really that competitive of a person. Is Super Sidequest right for me?
        </h2>
        <p className='my-4 mx-2'>
          That’s totally fine! Truth be told, I’m not all that competitive of a gamer myself, but absolutely love
          keeping track of special milestones or achievements I’ve reached in games. In fact, that was a major
          foundational philosophy when designing the site. All that’s to say that setting rewards and timers or
          participating in leaderboards is completely optional, so feel free to simply use the site for bragging
          rights and tracking purposes.
        </p>
        <h2 id='mobile' className='px-4 py-2 bg-profileone rounded-md text-white text-2xl font-bold'>
          Will you make a smartphone app?
        </h2>
        <p className='my-4 mx-2'>
          Currently there are no plans to create a native smartphone app. I’m just one guy on a computer and
          it would probably be way too much to manage if I’m being honest. That said, the web app is 100% mobile
          responsive, meaning it should look pretty great on smartphones.
        </p>
        <h2 id='question' className='px-4 py-2 bg-profileone rounded-md text-white text-2xl font-bold'>
          I've sent in a question but I haven't gotten a reply. Do you read them?
        </h2>
        <p className='my-4 mx-2'>
          Heck yeah I do! I make sure to read and take feedback from every message that comes my way, especially
          if it’s a future feature request or issue with the site. If you haven’t heard back about your specific
          question, chances are I’m swamped and have a backlog of messages to get through.
        </p>
        <h2 id='username' className='px-4 py-2 bg-profileone rounded-md text-white text-2xl font-bold'>
          Can I change my username or email address?
        </h2>
        <p className='my-4 mx-2'>
          No, not at the moment at least. Should you require a username or email change, reach out via the Contact
          Form and I’ll make the swap for you as soon as I can.
        </p>
      </div >
    </>
  );
}

export default FAQPage;