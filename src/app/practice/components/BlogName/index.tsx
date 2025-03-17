"use client";

import { styled, keyframes, useTheme } from "styled-components";
import type { ThemeAttributesType } from "@/types/theme";

const Container = styled.a<{ $theme: ThemeAttributesType }>`
  position: relative;
  width: 60%;

  &::after {
    width: 0;
    background: none repeat scroll 0 0 transparent;
    left: 50%;
    bottom: 12px;
    content: "";
    display: block;
    height: 2px;
    position: absolute;
    background-color: ${(props) => props.$theme.revertBackground};
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
  }

  &:hover {
    &::after {
      width: 100%;
      left: 0;
      bottom: 12px;
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: inherit;
`;

const strokeAnimation = (length: number) => keyframes`
  0% {
    stroke-dashoffset: ${length}px;
  }
  20% {
    stroke-dashoffset: 0px;
  }
  100% {
    stroke-dashoffset: 0px;
  }
`;

const Svg = styled.svg`
  margin: auto;
`;

const Line = styled.line<{ length: number }>`
  stroke-dasharray: ${({ length }) => length}px;
  stroke-dashoffset: ${({ length }) => length}px;
  animation: ${({ length }) => strokeAnimation(length)} 5s ease forwards;
`;

const Circle = styled.circle`
  stroke-dasharray: 302px;
  stroke-dashoffset: 302px;
  animation: ${strokeAnimation(302)} 5s ease forwards;
`;

const Path = styled.path`
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: ${strokeAnimation(400)} 5s ease forwards;
  fill: none;
`;

export default function BlogNameAnimation() {
  const theme = useTheme();
  return (
    <Wrapper>
      <Container
        href="https://edwardchang.blog/blog"
        target="_blank"
        $theme={theme}
      >
        <Svg viewBox="30 0 900 300">
          {/* E */}
          <Line
            x1="50"
            y1="100"
            x2="50"
            y2="200"
            stroke={theme.text}
            fill="none"
            strokeWidth="10"
            length={100}
          />
          <Line
            x1="50"
            y1="105"
            x2="100"
            y2="105"
            stroke={theme.text}
            fill="none"
            strokeWidth="10"
            length={50}
          />
          <Line
            x1="50"
            y1="150"
            x2="90"
            y2="150"
            stroke={theme.text}
            fill="none"
            strokeWidth="10"
            length={40}
          />
          <Line
            x1="50"
            y1="195"
            x2="100"
            y2="195"
            stroke={theme.text}
            fill="none"
            strokeWidth="10"
            length={50}
          />

          {/* d */}
          <Line
            x1="180"
            y1="100"
            x2="180"
            y2="200"
            stroke={theme.text}
            fill="none"
            strokeWidth="10"
            length={100}
          />
          <Circle
            cx="150"
            cy="170"
            r="30"
            stroke={theme.text}
            fill="none"
            strokeWidth="10"
          />

          {/* w */}
          <Line
            x1="210"
            y1="100"
            x2="230"
            y2="200"
            stroke={theme.text}
            fill="none"
            strokeWidth="10"
            length={100}
          />
          <Line
            x1="230"
            y1="200"
            x2="250"
            y2="150"
            stroke={theme.text}
            fill="none"
            strokeWidth="10"
            length={60}
          />
          <Line
            x1="250"
            y1="150"
            x2="270"
            y2="200"
            stroke={theme.text}
            fill="none"
            strokeWidth="10"
            length={60}
          />
          <Line
            x1="270"
            y1="200"
            x2="290"
            y2="100"
            stroke={theme.text}
            fill="none"
            strokeWidth="10"
            length={100}
          />

          {/* a */}
          <Line
            x1="360"
            y1="200"
            x2="360"
            y2="150"
            stroke={theme.text}
            fill="none"
            strokeWidth="10"
            length={50}
          />
          <Circle
            cx="330"
            cy="175"
            r="25"
            stroke={theme.text}
            fill="none"
            strokeWidth="10"
          />

          {/* r */}
          <Path
            d="M 390 150 L 390 200 Q 400 140 420 160"
            stroke={theme.text}
            strokeWidth="10"
          />

          {/* d */}
          <Line
            x1="500"
            y1="100"
            x2="500"
            y2="200"
            stroke={theme.text}
            fill="none"
            strokeWidth="10"
            length={100}
          />
          <Circle
            cx="470"
            cy="170"
            r="30"
            stroke={theme.text}
            fill="none"
            strokeWidth="10"
          />

          {/* ' */}
          <Path
            d="M 525 130 Q 545 130 545 130 Q 550 150 520 170"
            stroke={theme.text}
            strokeWidth="10"
          />

          {/* s */}
          <Path
            d="M600 150 A15 15 0 1 0 585 170 A15 15 0 1 1 570 185"
            stroke={theme.text}
            strokeWidth="10"
          />

          {/* b */}
          <Line
            x1="650"
            y1="100"
            x2="650"
            y2="200"
            stroke={theme.text}
            fill="none"
            strokeWidth="10"
            length={100}
          />
          <Circle
            cx="680"
            cy="170"
            r="30"
            stroke={theme.text}
            fill="none"
            strokeWidth="10"
          />

          {/* l */}
          <Line
            x1="730"
            y1="100"
            x2="730"
            y2="200"
            stroke={theme.text}
            fill="none"
            strokeWidth="10"
            length={100}
          />

          {/* o */}
          <Circle
            cx="780"
            cy="170"
            r="30"
            stroke={theme.text}
            fill="none"
            strokeWidth="10"
          />

          {/* g */}
          <Path
            d="M 880 140 A 30 30 0 1 1 850 200 A 30 30 0 1 1 880 140 
     M 900 140 L 900 230 Q 900 260 880 270"
            stroke={theme.text}
            strokeWidth="10"
          />
        </Svg>
      </Container>
    </Wrapper>
  );
}
