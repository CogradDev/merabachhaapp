import {Path, Svg, Circle} from 'react-native-svg';

const ChatOutline = ({color, width, height}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
    <Path
      d="M408 64H104a56.16 56.16 0 00-56 56v192a56.16 56.16 0 0056 56h40v80l93.72-78.14a8 8 0 015.13-1.86H408a56.16 56.16 0 0056-56V120a56.16 56.16 0 00-56-56z"
      fill={color == undefined ? 'black' : color}
      stroke="currentColor"
      stroke-linejoin="round"
      stroke-width="32"
    />
    <Circle cx="160" cy="216" r="32"  fill={color == undefined ? 'black' : "white"}/>
    <Circle cx="256" cy="216" r="32"  fill={color == undefined ? 'black' : "white"}/>
    <Circle cx="352" cy="216" r="32"  fill={color == undefined ? 'black' : "white"}/>
  </Svg>
);

export default ChatOutline;
