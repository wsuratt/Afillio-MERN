import React, {useState, useEffect} from 'react'
import Switch from 'antd/lib/switch';
import auth from './../auth/auth-helper'
import {read, update} from './../user/api-user.js'

export default function VendorSwitch({ record }) {
  console.log(record)
  const [values, setValues] = useState({
      isVendor: false,
      error: ''
  })
  const jwt = auth.isAuthenticated()
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: record._id
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, isVendor: data.isVendor})
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [record._id])

  const Submit = () => {
    console.log(record._id)
    const user = {
      isVendor: values.isVendor
    }
    update({
      userId: record._id
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        auth.updateUser(data, ()=>{
          setValues({...values, userId: data._id})
        })
      }
    })
  }
  const handleCheck = (event, checked) => {
    setValues({...values, 'isVendor': checked})
    console.log('yeet')
    console.log(values.isVendor)
    Submit()
  }

    return (
      <>
        <Switch 
                checked={values.isVendor}
                onChange={handleCheck}
        />
      </>
    )
}
