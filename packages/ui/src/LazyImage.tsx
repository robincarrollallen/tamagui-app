import { ICONS } from "@my/assets";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { useSizeTokens } from "app/store";
import { ImageProps, useTheme } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import { forwardRef, memo, useCallback, useMemo, useState } from "react";
import { InView, InViewProps } from "react-native-intersection-observer";

export const LazyImage = memo(forwardRef<InView, InViewProps & { source?: ImageProps['source'], uri?: string }>(
  ({
    uri,
    style,
    source,
    borderRadius,
    lazy = false,
    width = '100%',
    height = '100%',
    ...props
  }, 
    ref
  ) => {
  const [inView, setInView] = useState(false)
  const [error, setError] = useState(false)
  const rem = useSizeTokens()
  const theme = useTheme()

  const styles = useMemo(() => StyleSheet.create({
    inView: {
      backgroundColor: (error || (!source && !uri)) ? theme.textWeakest?.get() : 'transparent',
      borderRadius: borderRadius,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      height,
      width,
      ...style,
    },
    image: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: borderRadius,
    },
    error: {
      height: '35%',
      aspectRatio: 58/51,
      objectFit: 'cover',
    },
    gradient: {
      borderRadius: borderRadius,
    },
  }), [rem])

  const onChange = useCallback((isInView: boolean) => {
    if (isInView) {
      setInView(isInView)
    }
  }, [])

  const onError = useCallback((_error: any) => {
    setError(true)
  }, [])

  return (
    <InView
      ref={ref}
      onChange={onChange}
      style={styles.inView}
      {...props}
    >
      <LinearGradient
        inset={0}
        end={[1, 1]}
        start={[0, 0]}
        overflow="hidden"
        position="absolute"
        style={styles.gradient}
        locations={[0, .0258, .5,  .9772, 1]}
        colors={['#fff', '#fff', `rgba(255, 255, 255, 0)`, '#fff', '#fff']}
      />
      {(error || (!source && !uri)) && <Image source={ICONS.heart} style={styles.error} />}
      {((inView || !lazy) && !error && !!(source || uri)) && <Image style={styles.image} source={uri || source} onError={onError}/>}
    </InView>
  )
}))