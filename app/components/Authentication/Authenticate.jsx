import React from 'react'
import { connect } from 'react-redux'

import Login from './Login'
import OAuth from './OAuth'

import { login, logout } from 'APP/app/reducers/auth'

import styled from 'styled-components'

/* -----------------    STYLED COMPONENTS     ------------------ */
const LoginDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 20rem;
`

/* -----------------    COMPONENT     ------------------ */
export const Authenticate = ({ login, logout }) => (
  <LoginDiv>
    <Login />
    <OAuth />
  </LoginDiv>
)

/*
DESIGN NOTE:
  If logged in, should only display "sign out" in dropdown menu.
    -> this should then use toast to alert that you are logged out
  Otherwise, display "sign in" which routes to modal
    -> use toast after successfully signed in
*/

/* -----------------    CONTAINER     ------------------ */
const mapState = state => ({})
const mapDispatch = { login, logout }

export default connect( mapState, mapDispatch )( Authenticate )
