import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const CarSVGComponent = (props) => (
  <Svg width={30} height={30} {...props}
  >
   <G
      transform="translate(0.000000,30.000000) scale(0.100000,-0.100000)"
      fill={props.color}
      stroke="none"
    >
      <Path d="M73 248 c-26 -33 -53 -108 -53 -146 0 -45 17 -64 35 -39 18 25 172 25 190 0 19 -25 35 -6 35 41 0 26 -10 63 -28 96 l-27 55 -71 3 c-49 2 -74 -1 -81 -10z m151 -24 c14 -36 7 -39 -74 -39 -81 0 -88 3 -74 39 9 23 139 23 148 0z m-144 -89 c0 -8 -7 -15 -15 -15 -8 0 -15 7 -15 15 0 8 7 15 15 15 8 0 15 -7 15 -15z m110 5 c0 -5 -18 -10 -40 -10 -22 0 -40 5 -40 10 0 6 18 10 40 10 22 0 40 -4 40 -10z m60 -5 c0 -8 -7 -15 -15 -15 -8 0 -15 7 -15 15 0 8 7 15 15 15 8 0 15 -7 15 -15z" />
    </G>
  </Svg>
);


CarSVGComponent.defaultProps = {
    width: 30,
    height: 30,
    fill: '#fff',
    viewBox: "0 0 30 30"
  };

export default CarSVGComponent;
