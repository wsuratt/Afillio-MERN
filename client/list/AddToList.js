import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import AddCartIcon from '@material-ui/icons/AddShoppingCart'
import DisabledCartIcon from '@material-ui/icons/RemoveShoppingCart'
import list from './list-helper.js'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  iconButton: {
    width: '28px',
    height: '28px'
  },
  disabledIconButton: {
    color: '#7f7563',
    width: '28px',
    height: '28px'
  }
}))

export default function AddToList(props) {
  const classes = useStyles()
  const [redirect, setRedirect] = useState(false)

  const addToList = () => {
    list.addItem(props.item, () => {
      setRedirect({redirect:true})
    })
  }
    if (redirect) {
      return (<Redirect to={'/list'}/>)
    }
    return (<span>
      {props.item.quantity >= 0 ?
        <IconButton color="secondary" dense="dense" onClick={addToList}>
          <AddCartIcon className={props.listStyle || classes.iconButton}/>
        </IconButton> :
        <IconButton disabled={true} color="secondary" dense="dense">
          <DisabledCartIcon className={props.listStyle || classes.disabledIconButton}/>
        </IconButton>}
      </span>)
}

AddToList.propTypes = {
  item: PropTypes.object.isRequired,
  listStyle: PropTypes.string
}