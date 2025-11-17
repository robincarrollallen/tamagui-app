import { Icon } from "./Icon";
import { useRem } from "app/store";
import { Image } from "expo-image";
import { ICONS, SVG } from "@my/assets";
import { XStack, Text, YStackProps } from "tamagui";


export function VipTag({ level = 0, size = 24, fontSize = 10, ...props }: { level?: number, size?: number, fontSize?: number } & YStackProps) {
  const rem = useRem()

  return (
    <XStack gap={rem(4)} items="center" height={rem(size)} {...props}>
      <Icon uri={SVG[`bg_vip_${Math.ceil((level + 1) / 5)}`]} height={rem(size)} width={rem(size * 2)} style={{ position: 'absolute', left: rem(size / 2) }}/>
      <Image source={ICONS[`vip_${level + 1}`]} style={{ height: '100%', aspectRatio: 1 }} />
      <XStack gap={rem(2)}>
        <Text fontSize={rem(fontSize)} fontStyle="italic">VIP</Text>
        <Text fontSize={rem(fontSize)} fontWeight="bold" fontStyle="italic">{level}</Text>
      </XStack>
    </XStack>
  ) 
}