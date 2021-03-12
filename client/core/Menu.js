import React from 'react'
import {BrowserView, MobileView} from "react-device-detect";
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'

const Menu = () => (
  <div>
    <MobileView>
      <MobileMenu/>
    </MobileView>
    <BrowserView>
      <DesktopMenu/>
    </BrowserView>
  </div>
)

export default Menu
