import { CustomIcon } from 'components/v2_base/common/icon'
import Auth from 'context/AuthContext'
import {
  fetchAndActivate,
  getRemoteConfig,
  getValue,
} from 'firebase/remote-config'
import useResponsive from 'hooks/useDesktopScreen'
import { firebaseApp } from 'lib/firebase'
import React, { FC, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getEditor,
  handlePromoterBannerConfig,
  handlePromoterBannerOpen,
} from 'slices/editor'

export const PromoteBanner: FC = () => {
  const dispatch = useDispatch()
  const { isPremium, openModalPremium, userInfoBackend, loading } =
    Auth.useContainer()
  const { isOpenPromoteBanner: isOpen, promoterBannerConfig } =
    useSelector(getEditor)
  const { isMobile } = useResponsive()

  const checkCurrentPremiumUser =
    userInfoBackend?.subscriber?.status === 'active'
  const checkCurrentTrialUser =
    userInfoBackend?.subscriber?.status === 'trialing'

  const onAction = useCallback(() => {
    if (promoterBannerConfig.type === 'openLink') {
      return
    }
    if (promoterBannerConfig.type === 'openPopup') {
      openModalPremium()
    }
  }, [promoterBannerConfig, openModalPremium])

  const onClose = useCallback(() => {
    dispatch(handlePromoterBannerOpen(false))
    localStorage.setItem('snapedit_banner_user_closed', 'true')
  }, [dispatch])

  const fetchAndActiveRemoteConfig = useCallback(async () => {
    const remoteConfig = getRemoteConfig(firebaseApp)
    remoteConfig.settings = {
      minimumFetchIntervalMillis: 1800000,
      fetchTimeoutMillis: 5000,
    }

    try {
      await fetchAndActivate(remoteConfig)
      const config = getValue(remoteConfig, 'promote_banner_config')
      if (config) {
        const configFromFirebase = JSON.parse(config.asString())
        dispatch(handlePromoterBannerConfig(configFromFirebase))
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }, [dispatch])

  // useEffect(() => {
  //   fetchAndActiveRemoteConfig()
  // }, [fetchAndActiveRemoteConfig])

  // useEffect(() => {
  //   if (loading) return
  //   if (!loading && (isPremium || promoterBannerConfig)) return

  //   const timeFromLocal = localStorage.getItem('snapedit_banner_config')
  //   const isUserClosedBefore = localStorage.getItem(
  //     'snapedit_banner_user_closed'
  //   )
  //   if (isUserClosedBefore && timeFromLocal) {
  //     if (
  //       isUserClosedBefore === 'true' &&
  //       Date.now() - +timeFromLocal > 24 * 60 * 60 * 1000
  //     ) {
  //       dispatch(handlePromoterBannerOpen(true))
  //       localStorage.setItem('snapedit_banner_user_closed', 'false')
  //       localStorage.setItem(
  //         'snapedit_banner_config',
  //         new Date().getTime().toString()
  //       )
  //     }
  //     if (isUserClosedBefore === 'false') {
  //       dispatch(handlePromoterBannerOpen(true))
  //     }
  //   } else {
  //     dispatch(handlePromoterBannerOpen(true))
  //     localStorage.setItem('snapedit_banner_user_closed', 'false')
  //     localStorage.setItem(
  //       'snapedit_banner_config',
  //       new Date().getTime().toString()
  //     )
  //   }
  // }, [dispatch, isPremium, loading, onClose, promoterBannerConfig])

  // useEffect(() => {
  //   if (isMobile) onClose()
  // }, [isMobile, onClose])

  // if (
  //   !loading &&
  //   (isPremium || checkCurrentPremiumUser || checkCurrentTrialUser)
  // )
  return null

  return (
    !isMobile &&
    isOpen &&
    promoterBannerConfig && (
      <div className="fixed top-0 h-9 z-50 w-full bg-gray-800 cursor-pointer">
        <div
          className="inline-flex justify-center items-center gap-2 w-full  px-5 py-2"
          onClick={onAction}
        >
          <div className="px-2 py-0.5 bg-white rounded-2xl text-center text-xs font-bold">
            <span className="ai-gradient inline-block ">
              {promoterBannerConfig.textLabel}
            </span>
          </div>
          <div
            className="text-center text-white text-sm font-normal leading-tight"
            dangerouslySetInnerHTML={{ __html: promoterBannerConfig.mainText }}
          />
          <button className="text-center text-white text-sm font-semibold underline">
            {promoterBannerConfig.textLink}
          </button>
        </div>
        <button className="absolute top-1 right-2 z-[60]" onClick={onClose}>
          <CustomIcon type="close" className="text-[#8C8D9C]" />
        </button>
      </div>
    )
  )
}
