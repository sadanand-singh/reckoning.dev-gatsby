import React from "react"
import { Link } from "gatsby"

export const NavLink = ({ to, children, title = "Link", selected = false }) => {
  const textColor = selected ? "text-accent" : "text-secondary"
  const style = `font-normal text-base hover:text-accent transition duration-150 ${textColor}`
  return (
    <Link to={to} title={title}>
      <span className={style}>{children}</span>
    </Link>
  )
}

export const ProMark = () => {
  return (
    <span><svg aria-hidden="true" className=" mr-1 inline h-5 w-5  transition duration-100 text-green-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.48 10.089l1.583-1.464c1.854.896 3.028 1.578 5.11 3.063 3.916-4.442 6.503-6.696 11.311-9.688l.516 1.186c-3.965 3.46-6.87 7.314-11.051 14.814-2.579-3.038-4.301-4.974-7.469-7.911zm14.407.557c.067.443.113.893.113 1.354 0 4.962-4.038 9-9 9s-9-4.038-9-9 4.038-9 9-9c1.971 0 3.79.644 5.274 1.723.521-.446 1.052-.881 1.6-1.303-1.884-1.511-4.271-2.42-6.874-2.42-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11c0-1.179-.19-2.313-.534-3.378-.528.633-1.052 1.305-1.579 2.024z"></path></svg></span>
  )
}

export const ConMark = () => {
  return (
    <span><svg aria-hidden="true" className=" mr-1 inline h-5 w-5  transition duration-100 text-orange-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.48 10.089l1.583-1.464c1.854.896 3.028 1.578 5.11 3.063 3.916-4.442 6.503-6.696 11.311-9.688l.516 1.186c-3.965 3.46-6.87 7.314-11.051 14.814-2.579-3.038-4.301-4.974-7.469-7.911zm14.407.557c.067.443.113.893.113 1.354 0 4.962-4.038 9-9 9s-9-4.038-9-9 4.038-9 9-9c1.971 0 3.79.644 5.274 1.723.521-.446 1.052-.881 1.6-1.303-1.884-1.511-4.271-2.42-6.874-2.42-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11c0-1.179-.19-2.313-.534-3.378-.528.633-1.052 1.305-1.579 2.024z"></path></svg></span>
  )
}

export const BlogTitle = ({ children }) => {
  return (
    <h1
      id="introduction"
      className="text-xl font-bold text-accent tracking-tight"
    >
      {children}
    </h1>
  )
}

export const BlogTitleInfo = ({ timeToRead, date, datetime }) => {
  return (
    <div className="mb-2 text-sm text-tertiary tracking-normal">
      <span>
        <time dateTime={datetime}>{date}</time>
      </span>
      <span> • </span>
      <span>{timeToRead} minute read</span>
    </div>
  )
}

export const Heading = ({ children }) => {
  return (
    <h2 className="relative mt-12 mb-3 text-2xl font-bold text-accent">
      {children}
    </h2>
  )
}

export const SubHeading = ({ children }) => {
  return (
    <h2 className="relative mt-6 mb-2 text-lg font-semibold text-primary">
      {children}
    </h2>
  )
}

export const Paragraph = ({ children }) => {
  return (
    <p className=" max-w-screen-md mb-4 font-normal text-base leading-relaxed md:leading-normal text-tertiary">
      {children}
    </p>
  )
}

export const InlinePageLink = ({ to, children, title = "Link" }) => {
  return (
    <Link to={to} title={title}>
      <a className="font-medium text-base text-accent hover:text-accent hover:underline" href={to}>
        {children}
      </a>
    </Link>
  )
}

export const Strong = ({ children }) => {
  return <strong className="font-semibold text-accent">{children}</strong>
}

export const ExtLink = ({ children, link, newTab }) => {
  if (newTab) {
    return (
      <a
        href={link}
        className="font-medium text-accent hover:text-accent hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  } else {
    return (
      <a
        href={link}
        className="font-medium text-accent hover:text-accent hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }
}

export const ProjectLink = ({ label, url }) => {
  return (
    <span className="font-medium text-tertiary hover:text-accent">
      <a href={url} target="_blank" rel="noopener noreferrer">
        {label}
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="inline-block w-4 h-4 mb-1"
        >
          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
        </svg>
      </a>
    </span>
  )
}

export const Button = ({ children, link, width }) => {
  let padding = "px-4 py-2"

  if (width === "wide") {
    padding = "px-8 py-2"
  } else if (width === "wider") {
    padding = "px-16 py-2"
  } else if (width === "widest") {
    padding = "px-20 py-2"
  }

  const className = `${padding} rounded accent-gradient text-on-accent`

  return (
    <a
      className={className}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

const Info = () => {
  return (
    <span className="-ml-10 mt-5 absolute  text-yellow-500 " >
      <div className="rounded-full h-10 w-10 pl-2 bg-primary border-yellow-500 border-2 items-center" style={{ "paddingTop": "1px" }}>
        <span>
          <svg aria-hidden="true" className="mr-1 inline h-5 w-5  transition duration-100 text-null-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 5.177l8.631 15.823h-17.262l8.631-15.823zm0-4.177l-12 22h24l-12-22zm-1 9h2v6h-2v-6zm1 9.75c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25z">
            </path>
          </svg>
        </span>
      </div>
    </span >
  )
}

const Note = () => {
  return (
    <span className="-ml-10 mt-5 absolute text-accent " >
      <div className="rounded-full h-10 w-10 pl-2 bg-primary border-accent border-2 items-center" style={{ "paddingTop": "3px" }}>
        <span><svg aria-hidden="true" className="mr-1 inline h-5 w-5  transition duration-100text-null-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.734c0 4.164-3.75 6.98-3.75 10.266h-1.992c.001-2.079.996-3.826 1.968-5.513.913-1.585 1.774-3.083 1.774-4.753 0-3.108-2.518-4.734-5.004-4.734-2.482 0-4.996 1.626-4.996 4.734 0 1.67.861 3.168 1.774 4.753.972 1.687 1.966 3.434 1.967 5.513h-1.991c0-3.286-3.75-6.103-3.75-10.266 0-4.343 3.498-6.734 6.996-6.734 3.502 0 7.004 2.394 7.004 6.734zm-4 11.766c0 .276-.224.5-.5.5h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5zm0 2c0 .276-.224.5-.5.5h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5zm-1.701 3.159c-.19.216-.465.341-.752.341h-1.094c-.287 0-.562-.125-.752-.341l-1.451-1.659h5.5l-1.451 1.659zm-.931-14.659h-.689v-1h.689v1zm.913 0h-.428v-1h.807l-.379 1zm-2.531 0l-.396-1h.834v1h-.438zm4.25-.995c-1.622 3.654-2.38 5.049-2.38 8.995h-1.241c0-3.946-.757-5.341-2.379-8.995h.776c1.172 2.851 1.988 3.997 2.224 7.021.234-3.024 1.052-4.17 2.223-7.021h.777z"></path></svg></span>
      </div>
    </span >
  )
}

const Quote = () => {
  return (
    <span className="-ml-10 mt-5 absolute text-accent " >
      <div className="rounded-full h-10 w-10 pl-2 bg-primary border-accent border-2 items-center" style={{ "paddingTop": "3px" }}>
        <span><svg aria-hidden="true" className="mr-1 inline   transition duration-100text-null-500 h-3 w-3 " fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11 9.275c0 5.141-3.892 10.519-10 11.725l-.984-2.126c2.215-.835 4.163-3.742 4.38-5.746-2.491-.392-4.396-2.547-4.396-5.149 0-3.182 2.584-4.979 5.199-4.979 3.015 0 5.801 2.305 5.801 6.275zm13 0c0 5.141-3.892 10.519-10 11.725l-.984-2.126c2.215-.835 4.163-3.742 4.38-5.746-2.491-.392-4.396-2.547-4.396-5.149 0-3.182 2.584-4.979 5.199-4.979 3.015 0 5.801 2.305 5.801 6.275z"></path></svg></span>
      </div>
    </span >
  )
}


export const Callout = ({ children, type = 'info' }) => {
  let Component = <Info />;
  switch (type) {
    case 'info':
      Component = <Info />; break;
    case 'quote':
      Component = <Quote />; break;
    case 'note':
      Component = <Note />; break;
    default:
      Component = <Info />;
  }

  return (
    <aside className={`relative mt-4 bg-secondary  border-l-2  pl-5 pr-3 py-2 pb-2 rounded-r text-base ${type === 'info' ? "border-yellow-500" : "border-accent"}`}>
      {Component}
      <div className="ml-2">
        {children}
      </div>
    </aside>
  )
}

export const Blob = _ => {
  return (
    <div aria-hidden="true">
      <div className="relative blob h-48 md:h-56 lg:h-64">
        <svg
          className="blob-rotate-faster h-full text-fill-primary fill-current"
          viewBox="0 0 278 279"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M137.896 0.127761C167.59 -0.638578 198.383 1.62824 222.877 18.4301C247.738 35.4836 263.129 63.014 271.706 91.9151C280.118 120.258 280.513 150.661 270.364 178.43C260.457 205.538 239.342 225.92 216.353 243.372C192.903 261.174 167.336 278.631 137.896 278.994C108.28 279.358 81.0666 263.928 58.0226 245.322C35.8955 227.455 20.5343 203.415 11.0775 176.594C1.41508 149.191 -4.23875 119.749 3.91245 91.8587C12.2111 63.4638 31.6331 39.4483 56.0438 22.7357C79.9856 6.34414 108.89 0.876363 137.896 0.127761Z" />
        </svg>
      </div>
    </div>
  )
}

export const BlobHeader = _ => {
  return (
    <div aria-hidden="true">
      <div className="blob-bg absolute">
        <svg
          className="block m-auto blob-rotate h-64 text-fill-secondary fill-current"
          viewBox="0 0 715 693"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M359.408 0.499261C434.083 0.69572 509.059 15.4608 570.136 58.4268C631.828 101.825 675.247 166.543 697.772 238.528C720.119 309.946 720.46 387.141 695.015 457.515C670.121 526.365 618.875 581.064 558.794 622.901C499.694 664.055 431.329 687.499 359.408 691.212C284.339 695.087 205.553 688.115 144.481 644.291C83.2293 600.338 54.1113 526.936 30.6392 455.293C7.11277 383.484 -10.9409 307.559 10.4113 235.074C32.1072 161.421 84.1477 100.148 147.872 57.3159C209.988 15.5657 284.566 0.302364 359.408 0.499261Z" />
        </svg>
      </div>
    </div>
  )
}

export const BlobFooter = _ => {
  return (
    <div aria-hidden="true">
      <div className="blob-bg relative">
        <svg
          className="blob-rotate h-64 text-fill-secondary fill-current"
          viewBox="0 0 715 693"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M359.408 0.499261C434.083 0.69572 509.059 15.4608 570.136 58.4268C631.828 101.825 675.247 166.543 697.772 238.528C720.119 309.946 720.46 387.141 695.015 457.515C670.121 526.365 618.875 581.064 558.794 622.901C499.694 664.055 431.329 687.499 359.408 691.212C284.339 695.087 205.553 688.115 144.481 644.291C83.2293 600.338 54.1113 526.936 30.6392 455.293C7.11277 383.484 -10.9409 307.559 10.4113 235.074C32.1072 161.421 84.1477 100.148 147.872 57.3159C209.988 15.5657 284.566 0.302364 359.408 0.499261Z" />
        </svg>
      </div>
    </div>
  )
}
