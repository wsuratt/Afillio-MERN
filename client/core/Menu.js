import React from 'react'
import {BrowserView, MobileView} from "react-device-detect";
import {isMobile} from 'react-device-detect';
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'

const Element = <DesktopMenu/>

if (isMobile) {
  Element = <MobileMenu/>
}

const Menu = () => (
  Element
)

export default Menu
