import { Tabs } from 'expo-router'
import { Pressable, Platform } from 'react-native'
import { LinearGradient } from '@tamagui/linear-gradient'
import {
  YStack,
  XStack,
  styled,
  Text,
  Circle,
  useTheme,
  TamaguiElement,
} from 'tamagui'
import {
  Home,
  User,
  Plus,
  Search,
  Heart,
  Camera,
} from '@tamagui/lucide-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// 自定义 TabBar 背景容器
const TabBarBackground = styled(YStack, {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: 80,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  overflow: 'hidden',
})

// 中间特殊按钮
const CenterButton = styled(Circle, {
  position: 'absolute',
  size: 60,
  backgroundColor: '$blue10',
  borderWidth: 4,
  borderColor: '$background',
  shadowColor: '$shadowColor',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
  zIndex: 10,
  top: -30,
  left: '50%',
  marginLeft: -30,
  
  pressStyle: {
    scale: 0.95,
  },
  
  hoverStyle: {
    backgroundColor: '$blue11',
  },
})

// 自定义 Tab 按钮
const CustomTabButton = ({ 
  focused, 
  icon: Icon, 
  label, 
  onPress 
}: {
  focused: boolean
  icon: any
  label: string
  onPress: () => void
}) => {
  const theme = useTheme()
  
  return (
    <Pressable onPress={onPress}>
      <YStack
        alignItems="center"
        justifyContent="center"
        paddingVertical="$2"
        paddingHorizontal="$3"
        minHeight={50}
        animation="quick"
        opacity={focused ? 1 : 0.6}
        scale={focused ? 1.1 : 1}
      >
        <Icon
          size={24}
          color={focused ? theme.blue10.val : theme.color.val}
        />
        <Text
          fontSize={12}
          fontWeight={focused ? "600" : "400"}
          color={focused ? "$blue10" : "$color"}
          marginTop="$1"
        >
          {label}
        </Text>
      </YStack>
    </Pressable>
  )
}

// 自定义 TabBar 组件
const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets()
  const theme = useTheme()
  
  return (
    <YStack>
      {/* TabBar 背景 */}
      <TabBarBackground>
        {/* 渐变背景 */}
        <LinearGradient
          colors={[
            theme.background.val,
            theme.backgroundHover.val,
            theme.backgroundPress.val,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
        
        {/* 可选：背景图片 */}
        {/* <ImageBackground
          source={{ uri: 'your-background-image-url' }}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
            style={{ flex: 1 }}
          />
        </ImageBackground> */}
      </TabBarBackground>

      {/* Tab 按钮容器 */}
      <XStack
        height={80}
        paddingBottom={insets.bottom}
        alignItems="center"
        justifyContent="space-around"
        paddingHorizontal="$4"
        zIndex={5}
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key]
          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          // 根据路由名称选择图标
          const getTabIcon = (routeName: string) => {
            switch (routeName) {
              case 'home':
                return Home
              case 'search':
                return Search
              case 'profile':
                return User
              case 'favorites':
                return Heart
              default:
                return Home
            }
          }

          // 如果是中间位置，渲染占位符
          if (index === Math.floor(state.routes.length / 2)) {
            return <YStack key={route.key} flex={1} />
          }

          return (
            <YStack key={route.key} flex={1} alignItems="center">
              <CustomTabButton
                focused={isFocused}
                icon={getTabIcon(route.name)}
                label={options.title || route.name}
                onPress={onPress}
              />
            </YStack>
          )
        })}
      </XStack>

      {/* 中间特殊按钮 */}
      <CenterButton
        onPress={() => {
          // 处理中间按钮点击事件
          console.log('Center button pressed')
          // 可以导航到特殊页面或打开模态框
          // navigation.navigate('camera') 或 navigation.navigate('add')
        }}
      >
        <Plus size={28} color="white" />
        {/* 或者使用相机图标 */}
        {/* <Camera size={28} color="white" /> */}
      </CenterButton>
    </YStack>
  )
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: '首页',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: '搜索',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '我的',
        }}
      />
      {/* 可以添加更多标签页 */}
      <Tabs.Screen
        name="favorites"
        options={{
          title: '收藏',
        }}
      />
    </Tabs>
  )
}