import React from 'react';
import auth from './../auth/auth-helper'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
        textAlign: "center",
        fontSize: "x-large"
    }
}))

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const routeChange = (history, path) => { 
    history.push(path);
}

export default function MobileMenu() {
    const history = useHistory();
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" color="secondary" className={classes.title}>
                    Afillio
                </Typography>
                <div style={{'position':'absolute', 'right': '1em'}}><span style={{'float': 'right'}}>
                    <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MenuIcon fontSize="large" color="secondary"/>
                    </Button>
                    <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {
                            !auth.isAuthenticated() && (<div>
                                <StyledMenuItem>
                                    <ListItemText primary="Sign up" onClick={() => routeChange(history, "/signup")}/>
                                </StyledMenuItem>
                                <StyledMenuItem>
                                    <ListItemText primary="Sign in" onClick={() => routeChange(history, "/signin")}/>
                                </StyledMenuItem>
                                </div>)
                        }
                        {
                            auth.isAuthenticated() && (<div>
                            <StyledMenuItem>
                                    <ListItemText primary="Sign out" onClick={() => {auth.clearJWT(() => history.push('/'))}}/>
                            </StyledMenuItem>
                            </div>)
                        }
                    </StyledMenu>
                </span></div>
            </Toolbar>
        </AppBar>
    );
}
