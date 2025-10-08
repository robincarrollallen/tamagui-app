import { Segment, Sprite } from "@my/ui"
import { useStickyLogic } from "./logic"
import { ImageBackground } from "react-native"
import { SPRITE_NAME, IMAGES } from "@my/assets"
import { useRem } from "app/hooks/ResponsiveSize"
import { XStackProps, YStack, View, Text } from "tamagui"

const TabComponent = ({ tab, onPress }: { tab: { label: string, value: string }, isActive: boolean, onPress: () => void }) => {
  const rem = useRem()

  return (
    <View onPress={onPress} height="100%">
      <ImageBackground
        imageStyle={{ borderRadius: rem(8) }}
        source={IMAGES.category_game_bg_25[tab.value]}
        style={{ aspectRatio: 1, height: "100%", marginLeft: rem(8), justifyContent: "center", alignItems: "center", gap: rem(2) }}
      >
        <Sprite iconName={tab.value} source={SPRITE_NAME.CATEGORY_GAME_25} width={rem(46)} height={rem(46)} />
        <Text fontSize={rem(12)} numberOfLines={1}>{tab.label}</Text>
      </ImageBackground>
    </View>
  )
}

export function Sticky(props: XStackProps) {
  const rem = useRem()
  const homeList = useStickyLogic()

  /** 切换 tab */
  const handleTabChange = (value: string) => {
    console.log(value, '<<<<<<<<<<<<')
  }

  return (
    <YStack py={rem(12)} position="relative" {...props}>
      <Segment
        shrink
        bg="$background"
        height={rem(80)}
        tabs={homeList.map((item) => ({ label: item.name, value: item.code }))}
        TabComponent={TabComponent}
        onValueChange={handleTabChange}
      />
    </YStack>
  )
}