import { Image, ImageProps, useTheme } from "tamagui";
import { forwardRef, useCallback, useState } from "react";
import { InView, InViewProps } from "react-native-intersection-observer";
import { ICONS } from "@my/assets";

export const LazyImage = forwardRef<InView, InViewProps & { source?: ImageProps['source'], uri?: string }>(
  ({
    uri,
    width,
    height,
    source,
    borderRadius,
    style,
    ...props
  },
    ref
  ) => {
  const [inView, setInView] = useState(false)
  const [error, setError] = useState(false)
  const theme = useTheme()

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
      style={{
        backgroundColor: theme.textWeakest?.get(),
        borderRadius: borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        height,
        width,
        ...style
      }}
      {...props}
    >
      {(error || (!source && !uri)) && <Image height="50%" aspectRatio={58/51} objectFit="cover" source={ICONS.heart} />}
      {(inView && !error && !!(source || uri)) && <Image width="100%" height="100%" source={uri ? { uri } : source} onError={onError}/>}
    </InView>
  )
})