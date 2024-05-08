import {Path, Svg, Rect} from 'react-native-svg';

const WalletOutline = ({color, width, height}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
    <Rect
      x="48"
      y="144"
      width="416"
      height="288"
      rx="48"
      ry="48"
      stroke="currentColor"
      stroke-linejoin="round"
      stroke-width="32"
      fill={color == undefined ? 'black' : color}
    />
    <Path
      d="M411.36 144v-30A50 50 0 00352 64.9L88.64 109.85A50 50 0 0048 159v49"
      fill={color == undefined ? 'black' : color}
      stroke="currentColor"
      stroke-linejoin="round"
      stroke-width="32"
    />
    <Path d="M368 320a32 32 0 1132-32 32 32 0 01-32 32z" fill={color == undefined ? 'black' : "white"}/>
  </Svg>
);

export default WalletOutline;
