import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import cart from './cart-helper.js'
import { Redirect } from 'react-router-dom'

const styles = {
  buttonStyle: {
    color: "white",
    background: "#FFCC00",
    dense:"dense"
  }
}

export default function AddToCart(props) {
  const [redirect, setRedirect] = useState(false)

  const addToCart = () => {
    cart.addItem(props.item, props.sellerId, () => {
      setRedirect({redirect:true})
    })
  }
    if (redirect) {
      return (<Redirect to={'/cart'}/>)
    }
    return (<span>
      {props.item.quantity >= 0 ?
        <Button style={styles.buttonStyle} onClick={addToCart}>
          Buy Now
        </Button> :
        <Typography>
          Out of Stock
        </Typography>}
      </span>)
}

AddToCart.propTypes = {
  item: PropTypes.object.isRequired,
  sellerId: PropTypes.string,
  cartStyle: PropTypes.string
}