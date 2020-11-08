import Head from 'next/head'
import Link from 'next/link'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
				<title>Liquipedia+</title>
				<link rel='icon' href='https://snagfilms-a.akamaihd.net/68/0e/09ccf7e54e079e59fe4365e0fff8/teamliquid-logo-thumbnail-300x300-transp-bckgd.png' />
			</Head>
      <header className="header">
        <div className="headerContainer">
          <Link href="/">
            <img className="liquipediaLogo" src="https://avatars1.githubusercontent.com/u/16081465?s=280&v=4" />
          </Link>
          +
        </div>
      </header>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
