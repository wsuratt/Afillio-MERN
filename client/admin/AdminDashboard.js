import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import UserTable from './UserTable';
import Async from 'react-async';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  }
}))

const loadUsers = () =>
  fetch("/api/users/")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

export default function AdminDashboard({ match }) {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" className={classes.title}>
        Admin Dashboard</Typography>
        <Async promiseFn={loadUsers}>
          {({ data, err, isLoading }) => {
            if (isLoading) return "Loading..."
            if (err) return `Something went wrong: ${err.message}`

            if (data)
              return (
                <div>
                  <UserTable data={data} />
                </div>
              )
          }}
        </Async>
      </CardContent>
    </Card>
  );
}


