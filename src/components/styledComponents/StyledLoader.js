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

export const UploadLoader = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    background-color: #5b7e6c79;
    padding: 2rem 2rem;
    backdrop-filter: blur(5px);

.uploadLoader {
  width: 48px;
  height: 12px;
  background: #fff;
  display: inline-block;
  position: relative;
}
.uploadLoader::after {
  content: '';  
  left: 50%;
  top: -47px;
  transform: translate(-50%, 0);
  position: absolute;
  border: 15px solid transparent;
  border-bottom-color: #fff;
  box-sizing: border-box;
  animation: bump 0.4s ease-in-out infinite alternate;
}
.uploadLoader::before {
  content: '';  
  left: 50%;
  bottom: 15px;
  transform: translate(-50%, 0);
  position: absolute;
  width: 15px;
  height: 20px;
  background: #fff;
  box-sizing: border-box;
  animation: bump 0.4s ease-in-out infinite alternate;
}

@keyframes bump {
  0% {
    transform: translate(-50%, 5px);
  }
  100% {
    transform: translate(-50%, -5px);
  }
}
`

export const UploadLoaderEdit = styled(UploadLoader)`
    position: fixed;
`

