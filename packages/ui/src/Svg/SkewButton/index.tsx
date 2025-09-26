import { useMemo } from 'react';
import { View, ViewProps } from 'tamagui';
import { useResolveColor } from 'app/hooks/theme';
import { Svg, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface SkewButtonProps extends ViewProps {
  primaryColor?: string;
  secondaryColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export const SkewButton = ({
  primaryColor = "#12910B",
  secondaryColor = "#19CC10", 
  strokeColor = "#19CC10",
  children = null, 
  ...props
}: SkewButtonProps) => {
  const gradientId = useMemo(() => {
    const colorHash = `${primaryColor}_${secondaryColor}_${strokeColor}`.replace('#', '');
    return `gradientBadge_${colorHash}`;
  }, [primaryColor, secondaryColor]);
  
  const resolvedPrimaryColor = useResolveColor(primaryColor);
  const resolvedSecondaryColor = useResolveColor(secondaryColor);
  const resolvedStrokeColor = useResolveColor(strokeColor);
  
  return (
    <View items='center' justify='center' position="relative" {...props}>
      <Svg width="100%" height="100%" viewBox="0 0 73 30" fill="none" preserveAspectRatio="none" style={{ position: 'absolute', zIndex: -1 }}>
        <Defs>
          <LinearGradient 
            id={gradientId}
            x1="-20.2125" 
            y1="15" 
            x2="93.7125" 
            y2="15" 
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={resolvedPrimaryColor} />
            <Stop offset="1" stopColor={resolvedSecondaryColor} />
          </LinearGradient>
        </Defs>
        <Path 
          d="M9.2793 1H69.8408C71.1028 1.00014 72.0493 2.15507 71.8018 3.39258L67.1621 26.5879C66.8817 27.9902 65.6507 29 64.2207 29H3.65918C2.3972 28.9999 1.45074 27.8449 1.69824 26.6074L6.33789 3.41211C6.61835 2.00984 7.84925 1 9.2793 1Z" 
          fill={`url(#${gradientId})`}
          stroke={resolvedStrokeColor} 
          strokeWidth="2"
        />
      </Svg>
      {children}
    </View>
  );
};