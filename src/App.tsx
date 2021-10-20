import React from 'react'
import './App.scss'
import { _items } from './constants'
import { length, CarouselSlideItem } from './CarouselSlideItem'

const keys = Array.from(Array(_items.length).keys())

function App() {
  const [items, setItems] = React.useState(keys)
  const [isTicking, setIsTicking] = React.useState(false)
  const [activeIdx, setActiveIdx] = React.useState(0)
  const bigLength = items.length

  const prevClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true)
      setItems((prev) => {
        return prev.map((_, i) => prev[(i + jump) % bigLength])
      })
    }
  }

  const nextClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true)
      setItems((prev) => {
        return prev.map((_, i) => prev[(i - jump + bigLength) % bigLength])
      })
    }
  }

  const handleDotClick = (idx: any) => {
    if (idx < activeIdx) prevClick(activeIdx - idx)
    if (idx > activeIdx) nextClick(idx - activeIdx)
  }

  React.useEffect(() => {
    if (isTicking) {
      setTimeout(() => {
        setIsTicking(false)
      }, 2000)
    }
  }, [isTicking])

  React.useEffect(() => {
    setActiveIdx((length - (items[0] % length)) % length)
  }, [items])

  return (
    <div className="carousel__wrap">
      <div className="carousel__inner">
        <button
          className="carousel__btn carousel__btn--prev"
          onClick={() => prevClick()}
        >
          <i className="carousel__btn-arrow carousel__btn-arrow--left" />
        </button>
        <div className="carousel__container">
          <ul className="carousel__slide-list">
            {items.map((pos: any, i: any) => (
              <CarouselSlideItem
                key={pos}
                idx={pos}
                pos={pos}
                activeIdx={activeIdx}
              />
            ))}
          </ul>
        </div>
        <button
          className="carousel__btn carousel__btn--next"
          onClick={() => nextClick()}
        >
          <i className="carousel__btn-arrow carousel__btn-arrow--right" />
        </button>
        <div className="carousel__dots">
          {items.slice(0, length).map((pos, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={i === activeIdx ? 'dot active' : 'dot'}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
