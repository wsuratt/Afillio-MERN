import React from 'react'
import {BrowserView, MobileView} from "react-device-detect";
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'

const Menu = () => (
  <>
    <BrowserView>
      <DesktopMenu/>
    </BrowserView>
    <MobileView>
      <MobileMenu/>
    </MobileView>
  </>
)

export default Menu
