import React from "react"
import PropTypes from "prop-types"

import { ThemeProvider } from "../context/themeContext"
import Header from "./header"
import MobileNav from "./mobileNav"
import Footer from "./footer"
import Scroll from "./scroll"

const Layout = ({ children, activePage, footer = true }) => {
  return (
    <>
      <ThemeProvider>
        <MobileNav />
        <Header activePage={activePage} />
        <main className="container m-auto px-5 mt-10 sm:px-12 md:px-20 max-w-screen-xl">
          {children}
        </main>
        <Scroll showBelow={800} css="position: fixed; right: 1em; bottom: 1em;" />
        {footer && <Footer />}
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
