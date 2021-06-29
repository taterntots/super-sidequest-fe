import React from 'react'
import { useState, useEffect } from 'react';

// DATE
import moment from 'moment';

const Timer = ({ end_date }) => {
  const [state, setState] = useState({
    days: moment(moment(end_date) - moment()).format('D'),
    hours: moment(moment(end_date) - moment()).format('HH'),
    minutes: moment(moment(end_date) - moment()).format('mm'),
    seconds: moment(moment(end_date) - moment()).format('ss')
  })


  useEffect(() => {
    let interval = setInterval(() => {
      const then = moment(end_date);
      const now = moment();
      const countdown = moment(then - now);
      const days = countdown.format('D');
      const hours = countdown.format('HH');
      const minutes = countdown.format('mm');
      const seconds = countdown.format('ss');

      setState({ days, hours, minutes, seconds });

      if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  });

  return (
    <div className='flex justify-center sm:justify-evenly font-medium'>
      <p className='text-2xl'>
        {state.days}
        <span className='hidden sm:inline sm:ml-2 text-lg'>
          days
        </span>
        <span className='sm:hidden sm:ml-2 text-2xl'>
          :
        </span>
      </p>
      <p className='text-2xl'>
        {state.hours}
        <span className='hidden sm:inline sm:ml-2 text-lg'>
          hours
        </span>
        <span className='sm:hidden sm:ml-2 text-2xl'>
          :
        </span>
      </p>
      <p className='text-2xl'>
        {state.minutes}
        <span className='hidden sm:inline sm:ml-2 text-lg'>
          minutes
        </span>
        <span className='sm:hidden sm:ml-2 text-2xl'>
          :
        </span>
      </p>
      <p className='text-2xl'>
        {state.seconds}
        <span className='hidden sm:inline sm:ml-2 text-lg'>
          seconds
        </span>
      </p>
    </div >
  )
}
export default Timer;