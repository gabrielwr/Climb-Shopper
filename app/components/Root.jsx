import React from 'react'
import Navbar from './Navbar'

const Root = ({ children }) => (
  <div id="main">
    <Navbar />
    { children }
  </div>

)

export default Root
