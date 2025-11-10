'use client'

import { YStack, Text } from 'tamagui'
import { LazyImage } from '@my/ui'
import { useRouter } from 'solito/navigation'
import { NavigationBar } from '@my/ui'
import {
  IOScrollView,
  IOScrollViewController,
  InView,
} from 'react-native-intersection-observer';
import { useCallback, useEffect, useRef, useState } from 'react';

export function UserDetailScreen({ id }: { id: string }) {
  const scrollViewRef = useRef<IOScrollViewController>(null)
  const items = Array.from({ length: 10}, (_, i) => i + 1);

  if (!id) {
    return null
  }
  return (
    <>
      <NavigationBar title="User" />
      <YStack flex={1} width="100%">
        <IOScrollView ref={scrollViewRef} style={{ width: '100%' }}>
          <Text
            bg="$blue10"
            height={100}
            onPress={() => {
              scrollViewRef.current?.scrollTo({
                y: 100,
                animated: true,
              });
            }}
          >
            Scroll to bottom
          </Text>
          <YStack>
            {items.map((_item, index) => (
              <LazyImage width={100} height={200} key={index} source={{ uri: 'https://game-logo.d-e-7-f.com/pre/style1/en/FC_PANDADRAGONBOAT.jpg' }} />
            ))}
          </YStack>
          <Text position="absolute" t={0} l={0} r={0} text="center">Hello World </Text>
        </IOScrollView>
      </YStack>
    </>
  )
}

function Item({ index }: { index: number }) {
  const [inView, setInView] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false);
  const shouldLoad = hasLoaded || inView;

  useEffect(() => {
    console.log('InView:', index, inView)
    if (inView) setHasLoaded(true)
  }, [inView])

  const onChange = useCallback((inView: boolean) => {
    setInView(inView)
  }, [])

  const onLayoutHandler = useCallback((event) => {
    console.log('>>>>>>>>>>>', index, event)
  }, [])

  return (
    <InView onLayout={onLayoutHandler} key={index} height={100} onChange={onChange}>
      {inView && <Text bg={`#${index}F${index}F${index}F`}>
        Plain children are always rendered. Use onChange to monitor state.
      </Text>}
    </InView>
  )
}