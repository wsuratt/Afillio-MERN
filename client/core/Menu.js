import React from 'react'
import {BrowserView, MobileView} from "react-device-detect";
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'

const Menu = () => (
  <div>
    <DesktopMenu/>
    <MobileMenu/>
  </div>
)

export default Menu
