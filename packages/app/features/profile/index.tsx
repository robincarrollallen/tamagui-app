import { useEffect } from 'react'
import { UserInfo } from './modules/userInfo'
import { useUserStore, useVipStore } from 'app/store'
import userInfoData from 'app/data/userInfo.json'
import vipInfoData from 'app/data/vipInfo.json'

export function ProfileScreen() {

  useEffect(() => {
    useUserStore.getState().setUserInfo(userInfoData)
    useVipStore.getState().setVipInfo(vipInfoData.data)
  }, [])

  return <>
    <UserInfo />
  </>
}