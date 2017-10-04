import React from 'react'
import { connect } from 'react-redux'

import Login from './Login'
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

const Input = styled.input`
  display: block;
  margin-bottom: 1rem;
`

const OAuthDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 3rem;
  border-left: .1rem solid black;
`

const LoginBtn = styled.button`
  display: block;
`

/* -----------------    COMPONENT     ------------------ */
export const Authenticate = ({ login, logout }) => (
  <LoginDiv>
    <Login />
    <OAuthDiv>
      <form action="/api/auth/login/google">
        <Input type="submit" value="Login with Google" />
      </form>
      <form action="/api/auth/login/facebook">
        <Input type="submit" value="Login with Facebook" />
      </form>
    </OAuthDiv>
    {/* <LoginBtn
      onClick ={ evt => {
          evt.preventDefault()
          logout()
        }
      }
      type="button">
      Log Out!
    </LoginBtn> */}
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
