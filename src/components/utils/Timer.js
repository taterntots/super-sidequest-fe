import React from 'react'
import { useState, useEffect } from 'react';

// DATE
import moment from 'moment';
import countdown from 'moment-countdown'

const Timer = ({ end_date, setCountdownIsAfter, setChallengeUpdateModel, setOpenAccept }) => {
  const [state, setState] = useState({
    years: moment(end_date).countdown(moment()).years,
    months: moment(end_date).countdown(moment()).months,
    days: moment(end_date).countdown(moment()).days,
    hours: moment(end_date).countdown(moment()).hours,
    minutes: moment(end_date).countdown(moment()).minutes,
    seconds: moment(end_date).countdown(moment()).seconds
  })

  useEffect(() => {
    let interval = setInterval(() => {
      const count = moment(end_date, countdown.DAYS).countdown(moment())
      const years = count.years
      const months = count.months
      const days = count.days
      const hours = count.hours
      const minutes = count.minutes
      const seconds = count.seconds

      setState({ days, hours, minutes, seconds });

      if (moment(end_date).isAfter()) {
        setState({ years, months, days, hours, minutes, seconds });
      } else {
        setCountdownIsAfter(false)
        setChallengeUpdateModel(false)
        setOpenAccept(false)
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [end_date]);

  return (
    <div className='flex justify-center sm:justify-evenly font-medium'>
      {state.years > 0 ? (
        <p className='text-2xl'>
          {state.years}
          <span className='hidden sm:inline sm:ml-2 text-lg'>
            y
          </span>
          <span className='sm:hidden sm:ml-2 text-2xl'>
            :
          </span>
        </p>
      ) : null}

      {state.months > 0 ? (
        <p className='text-2xl'>
          {state.months}
          <span className='hidden sm:inline sm:ml-2 text-lg'>
            m
          </span>
          <span className='sm:hidden sm:ml-2 text-2xl'>
            :
          </span>
        </p>
      ) : null}

      {state.days > 0 ? (
        <p className='text-2xl'>
          {state.days}
          <span className='hidden sm:inline sm:ml-2 text-lg'>
            d
          </span>
          <span className='sm:hidden sm:ml-2 text-2xl'>
            :
          </span>
        </p>
      ) : null}

      <p className='text-2xl'>
        {state.hours}
        <span className='hidden sm:inline sm:ml-2 text-lg'>
          hrs
        </span>
        <span className='sm:hidden sm:ml-2 text-2xl'>
          :
        </span>
      </p>

      <p className='text-2xl'>
        {state.minutes}
        <span className='hidden sm:inline sm:ml-2 text-lg'>
          mins
        </span>
        <span className='sm:hidden sm:ml-2 text-2xl'>
          :
        </span>
      </p>

      <p className='text-2xl'>
        {state.seconds}
        <span className='hidden sm:inline sm:ml-2 text-lg'>
          secs
        </span>
      </p>
    </div >
  )
}
export default Timer;