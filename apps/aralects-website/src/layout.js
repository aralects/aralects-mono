import React from 'react'
import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer'

function Layout({ children }) {
    return (
        <main className='max-w-[1500px] scroll-smooth m-auto'>
            <Header/>
            {children}
            <Footer/>
        </main>
    )
}

export default Layout