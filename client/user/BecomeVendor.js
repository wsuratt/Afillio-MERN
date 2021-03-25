import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {Redirect, Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
    textAlign: 'center',
    fontSize: '1.2em'
  },
  avatar:{
    width: 100,
    height: 100
  },
  subheading: {
    color: theme.palette.text.secondary
  },
  shopTitle: {
    fontSize: '1.2em',
    marginBottom: '5px'
  },
  details: {
    padding: '24px'
  },
  bottom: {
    display: 'flex',
    padding: '10px 12px',
    borderRadius: '0.25em',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))
export default function BecomeVendor(){
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const jwt = auth.isAuthenticated()
    console.log(auth.isAuthenticated().user)
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
      read({
        userId: auth.isAuthenticated().user._id
      }, {t: jwt.token}, signal).then((data) => {
        if (data && data.error) {
          setRedirectToSignin(true)
        } else {
          setUser(data)
        }
      })
  
      return function cleanup(){
        abortController.abort()
      }
  
    }, [auth.isAuthenticated().user._id])
  
    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Become a Vendor
        </Typography>
        <span className={classes.bottom}><Link to={"/vendor/register/" + user._id}>
            <Button style={{backgroundColor: '#90d4a2'}} color="secondary">
              Become a Vendor
            </Button>
        </Link></span>
      </Paper>
    </div>)
}
