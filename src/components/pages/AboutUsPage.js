import React from 'react';

// COMPONENTS
import Hero from '../HeroCard';

// ----------------------------------------------------------------------------------
// ---------------------------------- ABOUT US PAGE ---------------------------------
// ----------------------------------------------------------------------------------

const AboutUsPage = ({ refresh, setRefresh }) => {
  return (
    <>
      {/* HERO */}
      <Hero refresh={refresh} setRefresh={setRefresh} />

      {/* BODY */}
      <div className='px-4 py-4 bg-profiletwo rounded-lg text-white'>
        <h1 className='px-4 py-2 bg-profileone rounded-md text-white text-2xl font-bold'>
          About Us
        </h1>
        <p className='mt-4 mx-2'>
          The concept of Super Sidequest began back in 2017 when I used to run speedrun challenges
          for <a href='https://nintendowire.com'
            className='text-texthighlight hover:text-texthighlighthover cursor-pointer'
            target='_blank'>
            Nintendo Wire
          </a> under the moniker
          "<a href='https://nintendowire.com/?s=speedrun+sunday'
            className='text-texthighlight hover:text-texthighlighthover cursor-pointer'
            target='_blank'>
            Speedrun Sunday
          </a>."
          Each week I’d pick a game from my Nintendo Switch library and post challenges for our readers to
          compete in for eshop cards and glory. Users would then post their scores via Twitter comments, along
          with an image or video proving their masterful feat. I did this every week for an entire year, spending
          most my Sundays sifting through seas of comments and manually updating high scores. It was cumbersome
          to say the least, but boy did I have a blast hosting them and meeting all kinds of wonderful peeps from
          the speedrun community.
        </p>
        <p className='mt-4 mx-2'>
          Later in 2018 my girlfriend and I
          began <a href='https://www.twitch.tv/tater_n_tots'
            className='text-texthighlight hover:text-texthighlighthover cursor-pointer'
            target='_blank'>
            streaming on Twitch
          </a> for fun in our free time under the name
          Tater & Tots, eventually growing a community of awesome couch potatoes we’re happy to now call friends.
          At one point I found myself feeling nostalgic for the good 'ol days of Speedrun Sunday, so I did a
          revival of sorts in
          our <a href='https://discord.com/invite/W8qTj7s'
            className='text-texthighlight hover:text-texthighlighthover cursor-pointer'
            target='_blank'>
            community Discord
          </a>. In an attempt to move away from speedruns exclusively, I rebranded the idea under the banner
          "Tater’s Tavern" where I would periodically issue quests for peeps to take part in for various games
          I knew we all enjoyed playing. It functioned very similarly to the Nintendo Wire series: I’d pick a
          game, write out the rules, and then sift through messages throughout the week, manually updating the
          leaderboard until the challenge ended. Same story, different social platform. There had to be a better
          way to issue and track these challenges, right?
        </p>
        <p className='mt-4 mx-2'>
          Fast forward to 2019 where I took a coding class for fun, learning how to make games in Unity. I
          enjoyed the course so much that I actually decided to swap careers and go back to school a few months
          later with a focus on web development. Armed with the powers of programming, it didn’t take long for
          me to decide on my first big passion project. After several months of planning, designing, and coding,
          Super Sidequest finally launched to the public on July 6th, 2021!
        </p>
      </div >
    </>
  );
}

export default AboutUsPage;