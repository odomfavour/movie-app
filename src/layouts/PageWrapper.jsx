import React from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
const PageWrapper = ({children}) => {
  return (
    <div>
        <Header/>
        <div>
            {children}
        </div>
    </div>
  )
}

export default PageWrapper