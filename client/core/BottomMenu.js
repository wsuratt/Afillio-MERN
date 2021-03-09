import React from 'react'
import {BrowserView, MobileView} from "react-device-detect";
import MobileBottomMenu from './MobileBottomMenu'

const BottomMenu = () => (
  <div>
    <BrowserView>
    </BrowserView>
    <MobileView>
      <MobileBottomMenu/>
    </MobileView>
  </div>
)

export default BottomMenu
