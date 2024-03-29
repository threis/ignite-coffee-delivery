import styled from 'styled-components'

interface HeaderContainerProps {
  isFixedPosition: boolean
}

export const HeaderContainer = styled.div<HeaderContainerProps>`
  width: 100%;
  padding: 2rem 10rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: ${(props) => (props.isFixedPosition ? 'fixed' : 'relative')};
  background: ${(props) => props.theme.background};
  z-index: 2;

  a {
    padding: 0;
    height: 2.5rem;
  }
`

export const CheckoutController = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    height: 2.375rem;
    gap: 0.25rem;

    background-color: ${(props) => props.theme['purple-light']};
    border-radius: 6px;

    p {
      color: ${(props) => props.theme['purple-dark']};
      font-size: 0.875rem;
    }

    svg {
      color: ${(props) => props.theme.purple};
      width: 1.375rem;
      height: 1.375rem;
    }
  }
`
