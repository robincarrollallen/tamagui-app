import { useTheme } from 'tamagui';

export const useResolveColor = (color: string) => {
  const theme = useTheme();
  
  if (color?.startsWith('$')) {
    const tokenName = color.slice(1);
    return theme[tokenName]?.get()|| color;
  }
  
  return color;
};