import React from "react"
import { Link } from "gatsby"

import BLMIcon from "../../content/assets/BLM.png"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            fontSize: "5rem",
            marginBottom: "3rem",
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <>
      <BLMBanner />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: "42rem",
          padding: `2.5rem 1.25rem`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
      </>
    )
  }
}

function BLMBanner() {
  return (
    <div
      style={{
        background: 'black',
        padding: `1rem 0`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span
        style={{
          color: 'whitesmoke',
          fontWeight: 'bold',
        }}
      >
        Black Lives Matter
      </span>
      <img
        height="18"
        width="18"
        src={BLMIcon}
        alt=""
        role="presentation"
        style={{
          margin: `0 0 0 1rem`,
        }}
      />
    </div>
  )
}

export default Layout
