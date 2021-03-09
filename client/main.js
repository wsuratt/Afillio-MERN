import React from 'react'
import 'antd/dist/antd.css';
import { hydrate } from 'react-dom'
import App from './App'

hydrate(<App/>, document.getElementById('root'))
