import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PoolTogetherLogo from '~/assets/images/pool-together-logo5.svg'

export const Footer = class _Footer extends Component {
  render () {
    const year = new Date().getFullYear()
    return (
      <>
        <footer className='footer has-text-centered'>
          <div className='footer--primary'>
            <div className='footer-brand'>
              <div className='footer-item'>
                <h6 className='is-size-6'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://meetleighton.com/'
                  >
                    <PoolTogetherLogo />
                  </a>
                </h6>
                Started by Leighton Cusack, Scott Herren &amp; David Anderson
                <br />
                Developed by <a href='https://delta.camp/'>Delta Camp</a>
                <br />
              </div>
            </div>

            <br />

            <span
              className='footer-item footer-item--copyright'
            >
              &copy; {year} Pool Together
            </span>
          </div>
        </footer>
      </>
    )
  }
}

export const FooterContainer = withRouter(Footer)
