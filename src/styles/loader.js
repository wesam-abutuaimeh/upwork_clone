import styled from 'styled-components';
import { keyframes } from 'styled-components';

const waterfall = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-250%);
  }
  40%,
  60% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(250%);
}`;

export const Preloader = styled.div`
  position: fixed;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #7450fe, #21d397);
  overflow: hidden;
  z-index: 1000;
  pointer-events: none;
`;

export const Waterfall = styled.div`
  div {
    animation: ${waterfall} 1.5s infinite;
    background-color: #fafafa;
    height: 20px;
    left: 50%;
    margin-top: -10px;
    opacity: 0;
    position: absolute;
    top: 50%;
    width: 20px;
  }

  div:nth-of-type(1) {
    animation-delay: 0.25s;
    margin-left: -10px;
  }

  div:nth-of-type(2) {
    animation-delay: 0.5s;
    margin-left: 15px;
  }

  div:nth-of-type(3) {
    animation-delay: 0.75s;
    margin-left: -35px;
  }

  div:nth-of-type(4) {
    animation-delay: 1s;
    margin-left: 40px;
  }

  div:nth-of-type(5) {
    animation-delay: 1.25s;
    margin-left: -60px;
  }
`;
