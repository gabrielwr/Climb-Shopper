
import styled from 'styled-components'

/* -----------------    NAV STYLED COMPONENT    ------------------ */
export default styled.nav`
  display: flex;
  flex-wrap: nowrap;
  background-color: lightgrey;
  justify-content: space-between;
  color: ${ props => props.theme.text ? props.theme.text : 'white' };
  min-height: ${ props => props.theme.height ? props.theme.height + 'px' : '50px' };

  @media (max-width: 768px) {
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    min-width: 200px;
    min-height: 100%;
  }
`
