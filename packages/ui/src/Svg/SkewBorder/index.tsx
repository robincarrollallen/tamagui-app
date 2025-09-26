import { View, ViewProps } from 'tamagui';
import { Svg, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface SkewBorderProps extends ViewProps {
  primaryColor?: string;
  secondaryColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export const SkewBorder = ({
  primaryColor = "#0D120D",
  secondaryColor = "#1D291E", 
  strokeColor = "#1D291E",
  ...props
}: SkewBorderProps) => {
  return (
    <View width="100%" height="100%" {...props}>
      <Svg width="100%" height="100%" viewBox="0 0 330 60" fill="none" preserveAspectRatio="none">
        <Defs>
          <LinearGradient 
            id="paint0_linear_10058_33954" 
            x1="194" 
            y1="-10.5" 
            x2="193" 
            y2="84.5" 
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor={primaryColor} />
            <Stop offset="1" stopColor={secondaryColor} />
          </LinearGradient>
        </Defs>
        
        <Path 
          d="M18.165 1H317.835C324.632 1.00029 329.802 7.10391 328.685 13.8086L322.685 49.8086C321.8 55.1124 317.212 58.9998 311.835 59H12.166C5.36868 59 0.197955 52.8963 1.31543 46.1914L7.31543 10.1914C8.17192 5.05313 12.5053 1.24465 17.6641 1.01172L18.165 1Z" 
          fill="url(#paint0_linear_10058_33954)" 
          stroke={strokeColor} 
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
};



