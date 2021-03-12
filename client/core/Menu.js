import React from 'react'
import {BrowserView, MobileView} from "react-device-detect";
import {isMobile} from 'react-device-detect';
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'

const isMobile = isMobile

const Menu = () => (
  <div>
    if (isMobile) {
      <MobileMenu/>
    }
    else {
      <DesktopMenu/>
    }
  </div>
)

export default Menu
