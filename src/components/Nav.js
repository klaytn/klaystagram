import React from 'react'
import { connect } from 'react-redux'

import IconButton from 'components/IconButton'
import WalletInfo from 'components/WalletInfo'
import ui from 'utils/ui'

import * as authActions from 'redux/actions/auth'

import './Nav.scss'

const Nav = ({ logout, address }) => (
  <header className="Nav">
    <div className="Nav__inner">
      <h1 className="Nav__logo">
        <img
          src="images/logo-klaystagram.png"
          alt="Klaystagram"
        />
      </h1>
      <div className="Nav__menus">
        <button
          className="Nav__wallet"
          alt="Wallet info"
          onClick={() => ui.showModal({
            header: 'Wallet Info',
            content: (
              <WalletInfo address={address} />
            ),
          })}
        >
          Wallet
        </button>
        <button
          className="Nav__logout"
          alt="Logout"
          onClick={logout}
        >
          Logout
        </button>
        {/* <IconButton
          className="Nav__menu"
          icon="icon-wallet.svg"
          alt="Wallet info"
          onClick={() => ui.showModal({
            header: 'Wallet Info',
            content: (
              <WalletInfo address={address} />
            ),
          })}
        />
        <IconButton
          className="Nav__menu"
          icon="icon-logout.png"
          alt="Logout"
          onClick={logout}
        /> */}
      </div>
    </div>
  </header>
)

const mapStateToProps = (state) => ({
  address: state.auth.address,
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(authActions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
