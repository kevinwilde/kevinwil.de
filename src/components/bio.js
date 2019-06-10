/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import githubIcon from "../../content/assets/github_icon_white.png"
import linkedinIcon from "../../content/assets/linkedin_icon_white.png"
import twitterIcon from "../../content/assets/twitter_icon_white.png"

import { StaticQuery, graphql } from "gatsby"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: "4rem",
            }}
          >
            <BioIcon
              url={`https://github.com/${social.github}`}
              imgSrc={githubIcon}
              imgAlt="Github"
            />
            <BioIcon
              url={`https://twitter.com/${social.twitter}`}
              imgSrc={twitterIcon}
              imgAlt="Twitter"
            />
            <BioIcon
              url={`https://linkedin.com/in/${social.linkedin}`}
              imgSrc={linkedinIcon}
              imgAlt="Linkedin"
            />
          </div>
        )
      }}
    />
  )
}

function BioIcon({ url, imgSrc, imgAlt }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <img
        height="30"
        src={imgSrc}
        alt={imgAlt}
        style={{
          margin: "0.75rem",
        }}
      />
    </a>
  )
}

const bioQuery = graphql`
  query BioQuery {
    site {
      siteMetadata {
        author
        social {
          twitter
          github
          linkedin
        }
      }
    }
  }
`

export default Bio
