import React, {useState} from 'react'
import auth from './../auth/auth-helper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import list from './list-helper.js'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  card: {
    margin: '24px 0px',
    padding: '16px 40px 60px 40px',
    backgroundColor: '#80808017'
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.openTitle,
    fontSize: '1.2em'
  },
  price: {
    color: theme.palette.text.secondary,
    display: 'inline'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: 0,
    width: 50
  },
  productTitle: {
    fontSize: '1.15em',
    marginBottom: '5px'
  },
  subheading: {
    color: 'rgba(88, 114, 128, 0.67)',
    padding: '8px 10px 0',
    cursor: 'pointer',
    display: 'inline-block'
  },
  list: {
    width: '100%',
    display: 'inline-flex'
  },
  details: {
    display: 'inline-block',
    width: "100%",
    padding: "4px"
  },
  content: {
    flex: '1 0 auto',
    padding: '16px 8px 0px'
  },
  cover: {
    width: 160,
    height: 125,
    margin: '8px'
  },
  itemPrice: {
    float: 'right',
    marginRight: '40px',
    fontSize: '1.5em',
    color: 'black'
  },
  itemCommission: {
    float: 'right',
    marginRight: '40px',
    fontSize: '1.5em',
    color: 'rgb(72, 175, 148)'
  },
  checkout: {
    float: 'right',
    margin: '24px'
  },
  total: {
    fontSize: '1.2em',
    color: 'rgb(53, 97, 85)',
    marginRight: '16px',
    fontWeight: '600',
    verticalAlign: 'bottom'
  },
  continueBtn: {
    marginLeft: '10px'
  },
  itemShop: {
    display: 'block',
    fontSize: '0.90em',
    color: '#78948f'
  },
  removeButton: {
    fontSize: '0.8em'
  }
}))

export default function ListItems () {
  const classes = useStyles()
  const [listItems, setListItems] = useState(list.getList())

  const handleChange = index => event => {
    let updatedListItems = listItems
    setListItems([...updatedListItems])
    list.updateList(index, event.target.value)
  }

  const removeItem = index => event =>{
    let updatedListItems = list.removeItem(index)
    setListItems(updatedListItems)
  }

    return (<Card className={classes.card}>
      <Typography type="title" className={classes.title}>
        Seller List
      </Typography>
      {listItems.length>0 ? (<span>
          {listItems.map((item, i) => {
            return <span key={i}><Card className={classes.list}>
              <CardMedia
                className={classes.cover}
                image={'/api/product/image/'+item.product._id}
                title={item.product.name}
              />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Link to={'/product/'+item.product._id}><Typography type="title" component="h3" className={classes.productTitle} color="primary">{item.product.name}</Typography></Link>
                  <div>
                    <Typography type="subheading" component="h3" className={classes.price} color="primary">$ {item.product.price}</Typography>
                    <span className={classes.itemCommission}>Commission: ${item.product.commission}</span>
                    {/* <span className={classes.itemPrice}>${item.product.price}</span> */}
                    <span className={classes.itemShop}>Shop: {item.product.shop.name}</span>
                  </div>
                </CardContent>
                <div className={classes.subheading}>
                            <Button className={classes.removeButton} color="primary" onClick={removeItem(i)}>x Remove</Button>
                </div>
              </div>
            </Card>
            <Divider/>
          </span>})
        }
      </span>) :
      <Typography variant="subtitle1" component="h3" color="primary">No items added to your list.</Typography>
    }
    <p><br/></p>
    </Card>)
}
