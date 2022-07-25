import React, { useRef, useEffect } from 'react'
import './header.scss'
import logo from '../../images/logo.png'
import { Link, useLocation } from 'react-router-dom'

const headerNav = [
    {
        display: 'Home',
        link: '/'
    },
    {
        display: 'Movies',
        link: '/movie'
    },
    {
        display: 'TV Series',
        link: '/tv'
    },
]
const Header = () => {
    const { pathname } = useLocation()
    const headerRef = useRef(null)

    const active = headerNav.findIndex(item => item.link === pathname)
    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink')
            } else {
                headerRef.current.classList.remove('shrink')
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader)
        }
    }, [])

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="" />
                    <Link to="">tMovie</Link>
                </div>
                <ul className="header__nav">
                    {headerNav.map((item, index) => (
                        <li key={index} className={`${index === active ? 'active' : ''}`}>
                            <Link to={item.link}>{item.display}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Header