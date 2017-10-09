import React from 'react'

import styled from 'styled-components'

/* -----------------    STYLED COMPONENTS     ------------------ */
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

/* -----------------    COMPONENT    ------------------ */
const OAuth = () => (
  <div>
    <OAuthDiv>
      <form action="/api/auth/login/google">
        <Input type="submit" value="Login with Google" />
      </form>
      <form action="/api/auth/login/facebook">
        <Input type="submit" value="Login with Facebook" />
      </form>
    </OAuthDiv>
  </div>
)

export default OAuth
