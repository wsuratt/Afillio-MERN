import React from 'react'
import {BrowserView, MobileView} from "react-device-detect";
import {isMobile} from 'react-device-detect';
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'

if (isMobile) {
  const Menu = () => (
    <MobileMenu/>
  )
  export default Menu
}
else {
  const Menu = () => (
    <DesktopMenu/>
  )
  export default Menu
}
