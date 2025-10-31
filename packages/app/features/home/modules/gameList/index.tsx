import { useState } from "react"
import { useGameStore } from "app/store"
import { YStack } from "tamagui"
import { GameWrapperWidget } from "app/widgets/GameWrapper"


export const GameList = () => {
  const homeList = useGameStore(state => state.homeList)
  
  return (
    <>
      {homeList.map((item) => ( 
        <YStack key={item.id} gap={10} mb={10} px={12}>
          {item.platformList.map((platform) => <GameWrapperWidget key={platform.id} platform={platform} />)}
        </YStack>
      ))}
    </>
  )
}