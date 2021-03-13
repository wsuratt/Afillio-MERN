import React, { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import {BrowserView, MobileView} from "react-device-detect";
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'

const Menu = () => {
  const [mobile, setMobile] = useState()

  useEffect(() => {
    setMobile(isMobile)
  }, [setMobile])

  return (
    <div>{ mobile ? <MobileMenu/> : <DesktopMenu/> }</div>
  )
}

export default Menu
