
import React from "react"
import "./index.scss";

export const PACKAGE_STATUS = Object.freeze({
    NEW: 1,
    HOT: 2,
    NORMAL: 3,
    SOLD: 4,
})

function StatusRender(props) {
    function renderStatus() {
        switch (props) {
            case PACKAGE_STATUS.HOT:
                return <div className="d-flex align-items-center">
                    <div style={{ background: "#FFEC29" }} className="status__dot_status"></div>
                    <span style={{ marginLeft: 8, color: '#FFFFFF' }}>Chờ</span>
                </div>
            case PACKAGE_STATUS.NORMAL:
                return <div className="d-flex align-items-center">
                    <div style={{ background: "#02BB6B" }} className="status__dot_status"></div>
                    <span style={{ marginLeft: 8, color: '#FFFFFF' }}>Đang mở bán</span>
                </div>
            case PACKAGE_STATUS.SOLD:
                return <div className="d-flex align-items-center">
                    <div style={{ background: "#FF647C" }} className="status__dot_status"></div>
                    <span style={{ marginLeft: 8, color: '#FFFFFF' }}>Hết hàng</span>
                </div>
            case PACKAGE_STATUS.NEW:
            default:
                return <div className="d-flex align-items-center">
                    <div style={{ background: "#09D1FE" }} className="status__dot_status"></div>
                    <span style={{ marginLeft: 8, color: '#FFFFFF' }}>Sẵn sàng khai thác</span>
                </div>
        }
    }
    return <>{renderStatus()}</>
}

export default StatusRender;