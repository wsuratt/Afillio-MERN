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
import {read, update} from './api-user.js'
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

export default function VendorInfo({ match }) {
  const classes = useStyles()
  const [values, setValues] = useState({
      company: '',
      website: '',
      isPending: false,
      redirectToProfile: false,
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
        setValues({...values, company: data.vendor.Info.company, website: data.vendor.Info.website, isPending: data.isPending})
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.userId])

  const clickSubmit = () => {
    const user = {
      vendor: {
        Info: {
          company: values.company || undefined,
          website: values.website || undefined
        }
      },
      isPending: true
    }
    update({
      userId: match.params.userId
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        auth.updateUser(data, ()=>{
          setValues({...values, userId: data._id, redirectToProfile: true})
          console.log(data)
        })
      }
    })
  }
  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
  }
  // const handleCheck = (event, checked) => {
  //   setValues({...values, 'isPending': checked})
  // }

  if (values.redirectToProfile) {
    return (<Redirect to={'/user/' + values.userId}/>)
  }
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Vendor Info
          </Typography>
          <TextField id="company" label="Company Name" className={classes.textField} value={values.company} onChange={handleChange('company')} margin="normal"/><br/>
          <TextField id="website" type="url" label="Website" className={classes.textField} value={values.website} onChange={handleChange('website')} margin="normal"/><br/>
          <Typography variant="subtitle1" className={classes.subheading}>
            Submission Status
          </Typography>
          <FormControlLabel
            control={
              <Switch classes={{
                                checked: classes.checked,
                                bar: classes.bar,
                              }}
                      checked={values.isPending}
              />}
            label={values.isPending? 'Pending' : 'Inactive'}
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
