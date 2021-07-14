import React from 'react'
import { useState, useEffect } from 'react';

// DATE
import moment from 'moment';
import countdown from 'moment-countdown'

// ----------------------------------------------------------------------------------
// ----------------------------------- CARD TIMER -----------------------------------
// ----------------------------------------------------------------------------------

const CardTimer = ({ end_date, setCountdownIsAfter }) => {
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
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [end_date]);

  return (
    <div className='flex justify-evenly font-medium'>
      {state.years > 0 ? (
        <p className='text-md mr-2'>
          {state.years}
          <span className='ml-1 text-sm'>
            y
          </span>
        </p>
      ) : null}

      {state.months > 0 ? (
        <p className='text-md mr-2'>
          {state.months}
          <span className='ml-1 text-sm'>
            m
          </span>
        </p>
      ) : null}

      {state.days > 0 ? (
        <p className='text-md mr-2'>
          {state.days}
          <span className='ml-1 text-sm'>
            d
          </span>
        </p>
      ) : null}

      <p className='text-md mr-2'>
        {state.hours}
        <span className='ml-1 text-sm'>
          hrs
        </span>
      </p>

      <p className='text-md mr-2'>
        {state.minutes}
        <span className='ml-1 text-sm'>
          mins
        </span>
      </p>

      <p className='text-md mr-2'>
        {state.seconds}
        <span className='ml-1 text-sm'>
          secs
        </span>
      </p>
    </div >
  )
}
export default CardTimer;