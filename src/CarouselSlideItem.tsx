import React from 'react'
import './App.scss'
import { _items } from './constants'

const slideWidth = 30

export const length = _items.length
_items.push(..._items)

const createItem = (position: any, idx: any, activeIdx?: any) => {
  let item: any = {
    styles: {
      transform: `translateX(${position * slideWidth}rem)`,
    },
    player: _items[idx].player,
  }

  switch (position) {
    case length - 1:
    case length + 1:
      item.styles = { ...item.styles, filter: 'grayscale(1)' }
      break
    case length:
      break
    default:
      item.styles = { ...item.styles, opacity: 0 }
      break
  }

  return item
}

export const CarouselSlideItem = (pos: any, idx: any, activeIdx: any) => {
  const item = createItem(pos, idx, activeIdx)

  console.log(idx, 'idx')
  console.log(item, '_items[idx].player')

  return (
    <li className="carousel__slide-item" style={item.styles}>
      <div className="carousel__slide-item-img-link">
        <img src={item.player.image} alt={item.player.title} />
      </div>
      <div className="carousel-slide-item__body">
        <h4>{item.player.title}</h4>
      </div>
    </li>
  )
}
