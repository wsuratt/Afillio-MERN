import React from 'react';
import auth from './../auth/auth-helper'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Grid from '@material-ui/core/Grid';
import {Link, withRouter} from 'react-router-dom'


const isActive = (history, path) => {
    if (history.location.pathname == path)
      return {color: '#90d4a2'}
    else
      return {color: '#000000'}
}

const MobileBottomMenu = withRouter(({history}) => (
    <AppBar color="secondary" style={{top: 'auto', bottom: 0, height: 75}}>
        <Toolbar>
            <Grid
                justify="space-between"
                container 
                spacing={24}
            >
                <Grid item>
                    <Link to="/">
                        <IconButton aria-label="Home" style={isActive(history, "/")}>
                            <HomeIcon/>
                        </IconButton>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/shops/all">
                        <IconButton aria-label="Shop" style={isActive(history, "/shops/all")}>
                            <StorefrontIcon/>
                        </IconButton>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/list">
                        <IconButton aria-label="List" style={isActive(history, "/list")}>
                            <ListAltIcon/>
                        </IconButton>
                    </Link>
                </Grid>
                {!auth.isAuthenticated() && (<div>
                    <Grid item>
                        <Link to={"/signin"}>
                            <IconButton aria-label="Profile" style={isActive(history, "/signin")}>
                                <AccountCircleIcon/>
                            </IconButton>
                        </Link>
                    </Grid>
                </div>)}
                {auth.isAuthenticated() && (<div>
                    <Grid item>
                        <Link to={"/user/" + auth.isAuthenticated().user._id}>
                            <IconButton aria-label="Profile" style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>
                                <AccountCircleIcon/>
                            </IconButton>
                        </Link>
                    </Grid>
                </div>)}
            </Grid>
        </Toolbar>
    </AppBar>
))

export default MobileBottomMenu
