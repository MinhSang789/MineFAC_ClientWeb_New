
import React, { useCallback } from "react"
import "./index.scss";
function TransactionRender(props) {
    const { intl } = props; 
    // const t = useCallback((id) => intl.formatMessage({ id }), [intl])
    function renderStatus() {
        switch (props.paymentStatus) {
            case "New":
                return <div className="d-flex align-items-center">
                    <div style={{ background: "#09D1FE" }} className="status__dot_status"></div>
                    <span style={{ marginLeft: 8 }}>{intl.formatMessage({ id:  'staking_new'})}</span>
                </div>
            // case "Waiting" || "Pending":
            //     return <div className="d-flex align-items-center">
            //         <div style={{ background: "#FFEC29" }} className="status__dot_status"></div>
            //         <span style={{ marginLeft: 8 }}>Chờ</span>
            //     </div>
            case "Completed":
                return <div className="d-flex align-items-center">
                    <div style={{ background: "#ADDF48" }} className="status__dot_status"></div>
                    <span style={{ marginLeft: 8 }}>{intl.formatMessage({ id:  'staking_completed'})}</span>
                </div>
            // case "Canceled":
            //     return <div className="d-flex align-items-center">
            //         <div style={{ background: "#FF647C" }} className="status__dot_status"></div>
            //         <span style={{ marginLeft: 8 }}>Từ chối</span>
            //     </div>
            default:
                return <div className="d-flex align-items-center">
                    <div style={{ background: "#FF647C" }} className="status__dot_status"></div>
                    <span style={{ marginLeft: 8 }}>{intl.formatMessage({ id:  'fail'})}</span>
                </div>
        }
    }
    return <>{renderStatus()}</>
}

export default TransactionRender;