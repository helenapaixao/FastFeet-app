import Svg, { Path, G, ClipPath, Defs, Rect } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
};

export default function LogoSymbol({ width = 100, height = 110 }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 100 110" fill="none">
      <G clipPath="url(#logo_clip)">
        <Path
          d="M88.6469 57.6708L99.2688 49.5909L92.0992 8.75781L79.0662 21.6639L79.7146 25.3785L90.0625 15.1386L95.8712 48.2804L86.7472 55.2306L85.1032 56.4778L85.6421 58.4661L90.6197 76.9396L60.4984 92.069L57.6214 93.515L59.1832 96.3077L65.1198 106.918H42.1589L37.0809 101.233H32.9253L40.7616 110H70.3988L61.9049 94.8165L94.2821 78.5573L88.6469 57.6708Z"
          fill="white"
        />
        <Path
          d="M77.4403 69.7995L45.0723 86.0496L53.5662 101.233H23.9198L0 74.4811L75.2575 0L82.4271 40.8331L71.8052 48.913L55.0732 61.6474L72.8372 52.7089L77.4403 69.7995Z"
          fill="#FFBE00"
        />
      </G>
      <Defs>
        <ClipPath id="logo_clip">
          <Rect width={100} height={110} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
