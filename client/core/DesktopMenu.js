import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import {Link, withRouter} from 'react-router-dom'
import CartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge'
import list from './../list/list-helper'
import {isMobile} from 'react-device-detect';

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return {color: '#487554'}
  else
    return {color: '#ffffff'}
}
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path))
    return {color: '#487554'}
  else
    return {color: '#ffffff'}
}

const DesktopMenu = withRouter(({history}) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="secondary">
        Afillio
      </Typography>
      <div>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <HomeIcon/>
          </IconButton>
        </Link>
        <Link to="/shops/all">
          <Button style={isActive(history, "/shops/all")}>All Shops</Button>
        </Link>
        <Link to={"/vendor/register/general"}>
          <Button style={isActive(history, "/vendor/register/general")}>Become a Vendor</Button>
        </Link>
        <Link to="/list">
          <Button style={isActive(history, "/list")}>
            List
            <Badge invisible={false} color="secondary" badgeContent={list.itemTotal()} style={{'marginLeft': '7px'}}>
              <CartIcon />
            </Badge>
          </Button>
        </Link>      
      </div>
      <div style={{'position':'absolute', 'right': '10px'}}><span style={{'float': 'right'}}>
      {
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Sign up
            </Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Sign In
            </Button>
          </Link>
        </span>)
      }
      {
        auth.isAuthenticated() && (<span>
          {auth.isAuthenticated().user._id == "6046ad1ae8391d369de34d8d" && (<>
            <Link to="/admin/dashboard/users"><Button style={isPartActive(history, "/admin/dashboard/users")}>Admin Dashboard</Button></Link>
            </>
          )}
        </span>)
      }
      {
        auth.isAuthenticated() && (<span>
          {auth.isAuthenticated().user.isVendor && (<>
            <Link to="/vendor/shops"><Button style={isPartActive(history, "/vendor/")}>My Shops</Button></Link>
            </>
          )}
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>Sign out</Button>
        </span>)
      }
      </span></div>
    </Toolbar>
  </AppBar>
))

if (isMobile) {
  DesktopMenu = () => (
  <></>
  )
}

export default DesktopMenu
