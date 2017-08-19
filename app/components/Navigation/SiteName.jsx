import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

/* -----------------    STYLED COMPONENT     ------------------ */
const Div = styled.div`
  display: flex;
  flex-wrap: nowrap;
  color: ${ props => props.theme.text ? props.theme.text : 'black' };
  min-height: ${ props => props.theme.height ? props.theme.height + 'px' : '50px' };

`
/* -----------------    COMPONENT     ------------------ */
const SiteName = () => (
  <Div>
    <Link to="/">
      Climb Shopper
    </Link>
    <div>
      <small>
        &nbsp;styled with <a href='https://www.styled-components.com/'>Styled-Components</a>
      </small>
    </div>
  </Div>
)

export default SiteName;
