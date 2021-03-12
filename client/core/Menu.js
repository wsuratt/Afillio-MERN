import React from 'react'
import {isMobile} from 'react-device-detect';
import {BrowserView, MobileView} from "react-device-detect";
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'

const Menu = () => {
  if(isMobile) {
    return (
        <div><MobileMenu/></div>
    )
  }
  return (
      <div><MobileMenu/></div>
  );
  
}

export default Menu
