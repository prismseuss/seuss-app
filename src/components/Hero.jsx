import React from 'react'
import { Link } from 'react-router-dom'
import * as routes from '~/../config/routes'

export const Hero = () => {
  return (
    <div className='hero is-light is-medium has-text-centered'>
      <div className='hero-body'>
        <p className='is-size-5 is-monospaced is-uppercase has-text-grey-dark'>
          Join Pool Together
        </p>
        <Link
          className='button is-pill is-size-5'
          to={routes.HOME}
        >
          Here
        </Link>
      </div>
    </div>
  )
}
