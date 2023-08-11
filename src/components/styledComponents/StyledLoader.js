import styled from 'styled-components'

export const LoaderBG = styled.div`
    ${props => (props.$loading ? "display: flex" : "display: none")};
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #5b7e6c;
    position: fixed;
    z-index: 20;
    overflow-y: hidden;
    left: 0;
    top: 0;

    .loader {
  width: 48px;
  height: 48px;
  border: 5px dotted #FFF;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
  
`