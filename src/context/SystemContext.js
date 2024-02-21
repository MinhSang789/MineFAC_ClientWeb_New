import { handleGetAppConfigurationSuccess } from 'actions/appAction';
import moment from 'moment';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SystemConfiguration from 'services/systemConfiguration';

export const SystemContext = createContext(null);

export function SystemProvider({ children }) {
  const user = useSelector(state => state.member);
  const system = useSelector(state => state.app?.config);
  const appUserId = useSelector(state => state.member ? state.member.appUserId : null);
  const dispatch = useDispatch();

  const facPrice = useMemo(() => {
    
      let price = system?.exchangeRateCoin1;
      let _packageCurrentStage = system?.packageCurrentStage;
      console.log(system);
      console.log("_packageCurrentStage: " + _packageCurrentStage);
      if (_packageCurrentStage === 1) {
        price = system.exchangeRateCoin1
      } else if (_packageCurrentStage === 2) {
        price = system.exchangeRateCoin2;
      } else if (_packageCurrentStage === 3) {
        price = system.exchangeRateCoin3;
      } else if (_packageCurrentStage === 4) {
        price = system.exchangeRateCoin4;
      } else if (_packageCurrentStage === 5) {
        price = system.exchangeRateCoin5;
      }
      console.log(price);
      return price;
  }, [system]);

  function handleGetSAppConfigs() {
    SystemConfiguration.systemConfigurationFind().then(result => {
      const { error, data } = result;
      if (!error) {
        dispatch(handleGetAppConfigurationSuccess(data))
      }
    })
  }

  useEffect(() => {
    if (appUserId && user.token) {
      handleGetSAppConfigs();
    }
  }, [appUserId]);

  return (
    <SystemContext.Provider value={{ system, facPrice }}>
      {children}
    </SystemContext.Provider>
  )
}

export function useSystem() {
  return useContext(SystemContext);
}