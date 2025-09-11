import { useResponsiveSize } from 'app/hooks/ResponsiveSize'
import { LinearGradient } from 'tamagui/linear-gradient'
import { Button, XStack, YStack, Text } from '@my/ui'
import { HomeScreen } from 'app/features/home/screen'
import { Stack } from 'expo-router'
import { useTenantStore } from 'app/store'
import { Image } from 'tamagui'
export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <TamaguiCustomHeader title="Home" />,
          headerStyle: {
            backgroundColor: '#121713', // 设置背景色
          },
        }}
      />
      <HomeScreen />
    </>
  )
}

// 创建自定义 Header 组件
const TamaguiCustomHeader = ({ title }) => {
  const { rem } = useResponsiveSize()
  const { tenantInfo } = useTenantStore()

  console.log(tenantInfo, '<<<<<<<<<<<< tenantInfo')

  return (
    <YStack style={{ backgroundColor: '#121713' }}>
      <LinearGradient
        width="100%"
        colors={[
          '#121713',           // 0%
          '#121713',           // 8%
          'rgba(255,255,255,0.06)', // 8%
          'rgba(255,255,255,0)',    // 20%
          'rgba(255,255,255,0.05)', // 20%
          'rgba(255,255,255,0)',    // 32%
          'rgba(255,255,255,0.04)', // 32%
          'rgba(255,255,255,0)',    // 44%
          'rgba(255,255,255,0.03)', // 44%
          'rgba(255,255,255,0)',    // 56%
          'rgba(255,255,255,0.02)', // 56%
          'rgba(255,255,255,0)',    // 68%
          'rgba(255,255,255,0.01)', // 68%
          'rgba(255,255,255,0)',    // 80%
          '#121713'            // 100%
        ]}
        locations={[
          0, 0.08, 0.08, 0.3, 0.3, 0.52, 0.52, 0.74, 
          0.74, 0.96, 0.96, 1.18, 1.18, 1.38, 1.6
        ]}
        start={[0, 0]}
        end={[0.45, 1]} // 近似125度角
      >
        <XStack items="center" justify="space-between" height={rem(50)} py={rem(10)} px={rem(5)}>
          <Image source={{ uri: tenantInfo.siteLogo }} objectFit='contain' height='100%' width={rem(140)} />
          
          <Text fontSize="$6" fontWeight="600">
            {title}
          </Text>
          
          <Button size="$3" chromeless>
            ⋯
          </Button>
        </XStack>
      </LinearGradient>
    </YStack>
  );
};