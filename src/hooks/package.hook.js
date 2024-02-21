export const ACTIVITY_STATUS = Object.freeze({
  COMPLETED: 0,
  WORKING: 1,
  STANDBY: 2,
  CANCELED: 3,
  COMPLETING: 4,
})

export const isPackageActivityStandBy = (_package) => {
  return ACTIVITY_STATUS.STANDBY === _package.packageActivityStatus;
}

export const usePackage = () => {
  return {

  }
}