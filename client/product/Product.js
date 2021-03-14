import React, {useState, useEffect}  from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import {read, listRelated} from './api-product.js'
import {Link} from 'react-router-dom'
import Suggestions from './../product/Suggestions'
import auth from './../auth/auth-helper'
import QRCode from 'qrcode.react'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  flex:{
    display:'flex'
  },
  card: {
    padding:'24px 40px 40px'
  },
  subheading: {
    margin: '24px',
    color: theme.palette.openTitle
  },
  price: {
    padding: '16px',
    margin: '16px 0px',
    display: 'flex',
    backgroundColor: '#93c5ae3d',
    fontSize: '1.3em',
    color: '#375a53',
  },
  media: {
    height: 200,
    display: 'inline-block',
    width: '50%',
    marginLeft: '24px'
  },
  icon: {
    verticalAlign: 'sub'
  },
  link:{
    color: '#3e4c54b3',
    fontSize: '0.5em'
  },
  addCart: {
    width: '35px',
    height: '35px',
    padding: '10px 12px',
    borderRadius: '0.25em',
    backgroundColor: '#5f7c8b'
  },
  action: {
    margin: '8px 24px',
    display: 'inline-block'
  },
  bottom: {
    display: 'flex',
    padding: '10px 12px',
    borderRadius: '0.25em',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

export default function Product ({match}) {
  const classes = useStyles()
  const [product, setProduct] = useState({shop:{}})
  const [suggestions, setSuggestions] = useState([])
  const [error, setError] = useState('')
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
  
      read({productId: match.params.productId}, signal).then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setProduct(data)
        }
      })
    return function cleanup(){
      abortController.abort()
    }
  }, [match.params.productId])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

        listRelated({
          productId: match.params.productId}, signal).then((data) => {
          if (data.error) {
            setError(data.error)
          } else {
            setSuggestions(data)
          }
        })
  return function cleanup(){
    abortController.abort()
  }
}, [match.params.productId])

    const imageUrl = product._id
          ? `/api/product/image/${product._id}?${new Date().getTime()}`
          : '/api/product/defaultphoto'
    return (
        <div className={classes.root}>
          {auth.isAuthenticated() ?
            <Grid container spacing={10}>
              <Grid item xs={12} sm={12}>
                <Card className={classes.card}>
                  <CardHeader
                    title={product.name}
                    subheader={product.quantity > 0? 'In Stock': 'Out of Stock'}
                  />
                  <div className={classes.flex}>
                    <CardMedia
                      className={classes.media}
                      image={imageUrl}
                      title={product.name}
                    />
                    <Typography component="p" variant="subtitle1" className={classes.subheading}>
                      {product.description}<br/>
                      <span className={classes.price}>$ {product.price}</span>
                      <Link to={'/shops/'+product.shop._id} className={classes.link}>
                        <span>
                          <Icon className={classes.icon}>shopping_basket</Icon> {product.shop.name}
                        </span>
                      </Link>
                    </Typography>
                  </div>
                  <span className={classes.bottom}><QRCode value={'https://afillio.herokuapp.com/buy/'+product._id+'/'+auth.isAuthenticated().user._id}/></span>
                  <span className={classes.bottom}><Typography className={classes.link}>{'https://afillio.herokuapp.com/buy/'+product._id+'/'+auth.isAuthenticated().user._id}</Typography></span>
                </Card>
              </Grid>
              {suggestions.length > 0 &&
                (<Grid item xs={5} sm={5}>
                  <Suggestions  products={suggestions} title='Related Products'/>
                </Grid>)}
            </Grid>
            : (<Typography variant="subheading" component="h4">Sign in to sell product.</Typography>)}
        </div>)
}
