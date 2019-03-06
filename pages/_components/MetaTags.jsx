import React from 'react'
import Head from 'next/head'
import { withTheme } from 'emotion-theming'
import useResume from './useResume'
import {themeShape} from '../wall/prop-types'

const MetaTags = ({ theme: { palette } }) => {
  const resume = useResume()
  const skills = resume.skills.map(skill => skill.name).join(', ')
  return (
    <>
      <Head>
        <title>{`${resume.basics.name} | ${resume.basics.label}`}</title>

        <meta name="description" content={`${resume.basics.name}; I am: a ${resume.basics.label}; ${resume.basics.motto}; Skills: ${skills}`} />
        <meta name="keywords" content={`${resume.basics.tags.join(', ')}, ${resume.basics.label}, ${resume.basics.motto}, ${skills}`} />

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="manifest" href="/static/manifest/manifest.json" />

        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="robots" content="INDEX,FOLLOW" />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta property="og:image:width" content="279" />
        <meta property="og:image:height" content="279" />
        <meta property="og:description" content="Full Stack Software Engineer" />
        <meta property="og:title" content="Stijn Koopal" />
        <meta property="og:url" content="http://koopal.io" />
        <meta property="og:image" content="https://dev.koopal.io/static/social/og-image.jpg" />

        <link rel="canonical" href="https://koopal.io" />
        <meta property="author" content="Stijn Koopal" />

        <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
        <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color={palette.colors.primary} />
        <meta name="apple-mobile-web-app-title" content="Stijn Koopal" />
        <meta name="application-name" content="Stijn Koopal" />
        <meta name="msapplication-TileImage" content="/static/favicon/mstile-144x144.png" />
        <meta name="msapplication-TileColor" content={palette.colors.primary} />
        <meta name="msapplication-config" content="/static/favicon/browserconfig.xml" />
        <meta name="theme-color" content={palette.colors.primary} />
      </Head>
    </>
  )
}

MetaTags.propTypes = {
  theme: themeShape.isRequired,
}

export default withTheme(MetaTags)
