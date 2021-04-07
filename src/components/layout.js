import React from "react"
import PropTypes from "prop-types"
import ScrollToTop from "react-scroll-to-top";
import { ThemeProvider } from "../context/themeContext"
import Header from "./header"
import MobileNav from "./mobileNav"
import Footer from "./footer"

const Layout = ({ children, activePage, footer = true }) => {
  return (
    <>
      <ThemeProvider>
        <MobileNav />
        <Header activePage={activePage} />
        <main className="container m-auto px-5 mt-10 sm:px-12 md:px-20 max-w-screen-xl">
        <ScrollToTop smooth={true} svgPath="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" viewBox="0 0 24 24" style={{"border-radius": "50%", "background-color": "#dcdcdc", "transition": "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0.3ms", "opacity": 0.5, "outline": "none"}}/>
          {children}
        </main>
        {footer && <Footer />}
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
