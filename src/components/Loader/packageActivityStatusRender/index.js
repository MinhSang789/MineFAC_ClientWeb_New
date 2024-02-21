
import React, {useCallback} from "react"
import "./index.scss";
import { ACTIVITY_STATUS } from 'hooks/package.hook';
import { useIntl } from "react-intl";

function StatusRender(props) {
    const { enableTextColor, status } = props;
    const intl = useIntl();
    const t = useCallback((id) => intl.formatMessage({ id }), [intl])
    function renderStatus() {
        switch (status) {
            case ACTIVITY_STATUS.COMPLETED:
                return <div className="d-flex align-items-center">
                    <div style={{ background: "#02BB6B" }} className="status__dot_status"></div>
                    <span style={{ marginLeft: 8, color: enableTextColor ? '#141432': '#FFFFFF' }}>{t('withdrawn')}</span>
                </div>
            case ACTIVITY_STATUS.STANDBY:
                return <div className="d-flex align-items-center">
                    <div style={{ background: "#FF647C" }} className="status__dot_status"></div>
                    <span style={{ marginLeft: 8, color: enableTextColor ? '#141432': '#FFFFFF' }}>{t('waiting_for_mining')}</span>
                </div>
            case ACTIVITY_STATUS.CANCELED:
                return <div className="d-flex align-items-center">
                    <div style={{ background: "#FF647C" }} className="status__dot_status"></div>
                    <span style={{ marginLeft: 8, color: enableTextColor ? '#141432': '#FFFFFF' }}>{t('withdrawn')}</span>
                </div>
            case ACTIVITY_STATUS.COMPLETING:
                return <div className="d-flex align-items-center">
                    <div style={{ background: "#FF647C" }} className="status__dot_status"></div>
                    <span style={{ marginLeft: 8, color: enableTextColor ? '#141432': '#FFFFFF' }}>{t('liquidated')}</span>
                </div>
            case ACTIVITY_STATUS.WORKING:
            default:
                return <div className="d-flex align-items-center">
                    <div style={{ background: "#02BB6B" }} className="status__dot_status"></div>
                    <span style={{ marginLeft: 8, color: enableTextColor ? '#141432': '#FFFFFF' }}>{t('mining')}</span>
                </div>
        }
    }
    return <>{renderStatus()}</>
}

export default StatusRender;