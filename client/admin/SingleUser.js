import React, {useState, useEffect} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { makeStyles } from '@material-ui/core/styles'
import auth from './../auth/auth-helper'
import {read, update} from './../user/api-user.js'
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  subheading: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  }
}))

export default function SingleUser({ match }) {
  const classes = useStyles()
  const [values, setValues] = useState({
      name: '',
      email: '',
      password: '',
      company: '',
      website: '',
      isPending: false,
      isVendor: false,
      redirectToDashboard: false,
      error: ''
  })
  const jwt = auth.isAuthenticated()
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, name: data.name, email: data.email, company: data.vendor.Info.company, website: data.vendor.Info.website, isPending: data.isPending, isVendor: data.isVendor})
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.userId])

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      vendor: {
        Info: {
          company: values.company || undefined,
          website: values.website || undefined
        }
      },
      isPending: values.isPending,
      isVendor: values.isVendor
    }
    update({
      userId: match.params.userId
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
          setValues({...values, userId: data._id, redirectToDashboard: true})
      }
    })
  }
  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
  }
  const handlePending = (event, checked) => {
    setValues({...values, 'isPending': checked})
  }
  const handleVendor = (event, checked) => {
    setValues({...values, 'isVendor': checked})
  }

  if (values.redirectToDashboard) {
    return (<Redirect to='/admin/dashboard/users'/>)
  }
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Edit Profile
          </Typography>
          <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
          <TextField id="company" label="Company Name" className={classes.textField} value={values.company} onChange={handleChange('company')} margin="normal"/><br/>
          <TextField id="website" type="url" label="Website" className={classes.textField} value={values.website} onChange={handleChange('website')} margin="normal"/><br/>
          <Typography variant="subtitle1" className={classes.subheading}>
            Vendor Account
          </Typography>
          <FormControlLabel
            control={
              <Switch classes={{
                                checked: classes.checked,
                                bar: classes.bar,
                              }}
                      checked={values.isPending}
                      onChange={handlePending}
              />}
            label={values.isPending? 'Pending' : 'Not Pending'}
          />
          <FormControlLabel
            control={
              <Switch classes={{
                                checked: classes.checked,
                                bar: classes.bar,
                              }}
                      checked={values.isVendor}
                      onChange={handleVendor}
              />}
            label={values.isVendor? 'Active' : 'Inactive'}
          />
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    )
}
