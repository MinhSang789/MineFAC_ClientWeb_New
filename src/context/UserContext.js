import { handleSignout } from 'actions';
import { handleUpdateDetail } from 'actions';
import { routes } from 'App';
import React, { createContext, useCallback, useContext, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import AppUsers from 'services/apppUsers';

const UserContext = createContext(null);

export function userAvatar(user) {
  return user?.userAvatar || '/assets/images/person01.png';
}

export function userFullName(user) {
  return user?.companyName || [user?.firstName, user?.lastName].filter(s => s).join(' ') || user?.username;
}

export function userLevel(level) {
  switch (level) {
    case 1: 
      return <FormattedMessage id="member" />;
    case 2: 
      return <FormattedMessage id="family" />;
    case 3: 
      return <FormattedMessage id="company" />;
    case 4: 
      return <FormattedMessage id="enterprise" />;
    // eslint-disable-next-line no-fallthrough
    case 5: 
      return <FormattedMessage id="organization_2" />;
      // eslint-disable-next-line no-fallthrough
    default: 
      return <FormattedMessage id="new_member" />;
  }
}

export function userPower(level) {
  switch (level) {
    case 1: 
      return 0;
    case 2: 
      return 5;
    case 3: 
      return 10;
    case 4: 
      return 15;
    case 5: 
      return 20;
    default: 
      return 0;
  }
}

export function userRole(user, currentUser) {
  const { appUserId } = currentUser || {};
  if (user?.memberReferIdF1 === appUserId) {
    return 'F1'
  } else if (user?.memberReferIdF2 === appUserId) {
    return 'F2'
  } else if (user?.memberReferIdF3 === appUserId) {
    return 'F3'
  } else if (user?.memberRefIdF4 === appUserId) {
    return 'F4'
  } else if (user?.memberReferIdF5 === appUserId) {
    return 'F5'
  }
  return 'F1';
}

export function isVerified(user) {
  return user?.isVerified === 1;
}

export function canWithdraw(user) {
  return isVerified(user) && hasSecondaryPassword;
}

export function hasSecondaryPassword(user) {
  return user?.secondaryPassword;
}

export function UserProvider({ children }) {
  const user = useSelector(state => state.member);
  const appUserId = useSelector(state => state.member?.appUserId || null);
  const dispatch = useDispatch();
  const paths = Object.values(routes).map(route => route.path);
  const privateRoutes = Object.values(routes).filter(route => route.isAuth);
  const privatePaths = privateRoutes.map(route => route.path);
  const auth = privatePaths.includes(window.location.pathname);
  const notFound = !paths.includes(window.location.pathname);

  const refresh = useCallback(function refresh() {
    if (appUserId) {
      AppUsers.getDetailUserById({
        id: appUserId
      }).then(result => {
        const { isSuccess, data } = result
        if (isSuccess) {
          dispatch(handleUpdateDetail(data))
        }
      })
    }
  }, [appUserId]);

  function signOut() {
    dispatch(handleSignout())
    setTimeout(() => {
      window.location.href = routes.login.path;
    }, 200)
  }

  useEffect(() => {
    if (appUserId) {
      if (user.token)
          refresh();
    } else {
      if (auth || notFound) {
        window.location.href = routes.login.path;
      }
    }
  }, [appUserId, auth, notFound, refresh]);

  return (
    <UserContext.Provider value={{ user, refresh, signOut }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext);
}