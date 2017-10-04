import React from 'react'
import { connect } from 'react-redux'

import { login } from 'APP/app/reducers/auth'

import styled from 'styled-components'

/* -----------------    STYLED COMPONENTS     ------------------ */
const Input = styled.input`
  display: block;
  margin-bottom: 1rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-right: 3rem;
`

/* -----------------    COMPONENT     ------------------ */
export const Login = ({ loginUser }) => (
  <Form onSubmit={evt => {
    evt.preventDefault()
    loginUser( evt.target.username.value, evt.target.password.value )
    {/* should be .then here to update with icon */}
  }}>
    <Input placeholder='username' name="username" />
    <Input placeholder='password' name="password" type="password" />
    <Input type="submit" value="Login" />
  </Form>
)

/* -----------------    CONTAINER     ------------------ */
const mapState = state => ({})
const mapDispatch = { loginUser: login }

export default connect( mapState, mapDispatch )( Login )
