import Container from '@components/Container'
import Footer from '@components/Footer'
import Header from '@components/Header'
import React from 'react'

const Layout = () => {
  return (
    <div className=" w-full min-h-screen flex flex-col shadow-md relative">
      <Header />
      <Container />
      <Footer />
    </div>
  )
}

export default Layout
