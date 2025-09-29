import { useMemo } from 'react';
import { SPRITES } from '@my/assets';
import { Image, View } from 'tamagui';

interface SpriteProps {
  iconName: string;
  source: string;
  height?: number;
  width?: number;
}

export const Sprite: React.FC<SpriteProps> = ({ 
  iconName, 
  source,
  height = 32,
  width = 32,
}) => {
  const spriteData = useMemo(() => {
    const sprite = SPRITES[source];
    if (!sprite) return null;
  
    const iconIndex = sprite.names.indexOf(iconName);
    if (iconIndex === -1) return null;

    const length = SPRITES[source].names.length;
    const rows = SPRITES[source].rows;
    const cols = Math.ceil(length / rows);
    const row = Math.floor(iconIndex / cols);
    const col = iconIndex % cols;

    return { row, col, rows, cols };
  }, [iconName, source]);

  if (!spriteData) return null;
  
  return (
    <View style={{ width, height, overflow: 'hidden' }}>
      <Image
        source={SPRITES[source].source}
        objectFit='contain'
        style={{
          width: width * spriteData.cols,
          height: height * spriteData.rows,
          marginLeft: -spriteData.col * width,
          marginTop: -spriteData.row * height,
        }}
      />
    </View>
  );
};