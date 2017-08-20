
import styled from 'styled-components'

/* -----------------    STYLED COMPONENT     ------------------ */
export default styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  color: ${ props => props.theme.text ? props.theme.text : 'white' };
  min-height: ${ props => props.theme.height ? props.theme.height + 'px' : '50px' };
`
