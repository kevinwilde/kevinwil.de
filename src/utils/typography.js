import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = () => {
  return {
    body: {
      background: '#2d2f32',
      color: 'whitesmoke',
    },
    "h1, h2, h3, h4, h5, h6": {
      fontFamily: "open sans, sans-serif"
    },
    a: {
      color: 'palegoldenrod',
    },
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    ':not(pre) > code[class*="language="], pre[class*="language-"]': {
      background: '#F0F0F0 !important',
    }
  }
}

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
