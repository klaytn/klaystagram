import React from 'react'
import * as URL from 'constants/url'
import './Footer.scss'

const footerLinks = [
  { title: 'Klaytn Official Site', link: URL.KLAYTN_HOMEPAGE },
  { title: 'Klaytnscope', link: URL.KLAYTN_SCOPE },
  { title: 'Klaytn Wallet', link: URL.KLAYTN_WALLET },
  { title: 'Klaytn Docs', link: URL.KLAYTN_DOCS },
  { title: 'Ground X Official Site', link: URL.GROUNDX_HOMEPAGE },
]

const Footer = () => (
  <footer className="Footer">
    <div className="Footer__inner">
      <ul className="Footer__linkBox">
        {
          footerLinks.map(({ title, link }) => (
            <li className="Footer__link" key={title}>
              <a
                href={link}
                target="_blank"
                rel="noreferrer noopener"
              >
                {title}
              </a>
            </li>
          ))
        }
      </ul>
      <div className="Footer__copyright">&copy; 2018 Klaystagram</div>
    </div>
  </footer>
)

export default Footer
