'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { BsCoin } from 'react-icons/bs'

export default function Home() {
  const [isAnimation, setIsAnimation] = useState(false)
  const [count, setCount] = useState(0)
  const [counter, setCounter] = useState(0.0)
  const [velocity, setVelocity] = useState(1700)
  const [velocity2, setVelocity2] = useState(17)
  const [count2, setCount2] = useState(0)

  function newGame() {
    setIsAnimation(!isAnimation)
    setCount(0)
    setCount2(0)
    setCounter(0.0)
    setVelocity(1500)
    setVelocity2(15)
  }

  useEffect(() => {
    if (isAnimation) {
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount + 1)
      }, velocity)

      const interval2 = setInterval(() => {
        setCount2((prevCount) => prevCount + 1)
      }, velocity)

      return () => {
        clearInterval(interval)
        clearInterval(interval2)
      }
    }
  }, [isAnimation, velocity])

  useEffect(() => {
    let interval: any

    if (isAnimation) {
      const startValue = counter
      // eslint-disable-next-line no-loss-of-precision
      const endValue = 100000000000000000000000000000000000000000.0
      const duration = 10000000000000000000000000000000000000000000 // 7.4 segundos
      const increment = (endValue - startValue) / duration

      let currentCount: any = startValue

      interval = setInterval(() => {
        currentCount += increment

        if (currentCount >= endValue) {
          currentCount = endValue
          clearInterval(interval)
        }

        setCounter(Number(currentCount.toFixed(2)))
      }, velocity2)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isAnimation, velocity2])

  useEffect(() => {
    if (count === 9) {
      setVelocity(500)
      setVelocity2(7)
    }
  }, [counter])

  return (
    <div className="w-full h-screen gap-4 flex flex-col items-center justify-center">
      <div className="Container">
        {counter < 9 && (
          <div
            className={`${isAnimation && 'PATAMAR2'} cont2 text-transparent`}
          >
            <span className="floor">{isAnimation ? count : ''}</span>
          </div>
        )}

        {counter > 9 && (
          <div
            className={`${isAnimation && 'PATAMAR3'} cont2 text-transparent`}
          >
            <span className="floor">{isAnimation ? count : ''}</span>
          </div>
        )}

        {count > 10 ? (
          <>
            <div className={`${isAnimation && 'ARROW-animation2'} ARROW2`} />

            <BsCoin className={`${isAnimation && 'point-animation2'} point2`} />
          </>
        ) : (
          <>
            <div className={`${isAnimation && 'ARROW-animation'} ARROW`} />

            <BsCoin className={`${isAnimation && 'point-animation'} point`} />
          </>
        )}

        <div className={`${isAnimation ? 'PATAMARONE' : 'PATAMARZERO'}`} />

        <span
          className={clsx(
            `absolute left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2 p-2  z-50 rounded-lg text-center `,
            count >= 9 &&
              'bg-gradient-to-tr from-yellow-600 to-orange-600 text-white text-xl font-black drop-shadow-[0px_0px_8px_#ffffff] text-shadow min-w-[30%] md:min-w-[20%] ',
            count < 9 && 'bg-zinc-600 text-white font-bold min-w-[18%] text-xl',
          )}
        >
          {!isAnimation
            ? '0.00'
            : count > 9
            ? count + '.' + String(counter).slice(-1) + ' X'
            : count2 + '.' + String(counter).slice(-2) + ' X'}
        </span>
      </div>

      <button
        className="p-4 rounded-xl bg-green-400 text-2xl font-bold text-white"
        onClick={() => newGame()}
      >
        Jogar
      </button>
    </div>
  )
}
