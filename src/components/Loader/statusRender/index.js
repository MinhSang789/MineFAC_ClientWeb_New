
import React from "react"
import "./index.scss";
function StatusRender(props) {
    function renderStatus() {
        switch (props) {
            case "New":
                return <div className="d-flex align-items-center">
                    <div style={{ background: "#09D1FE" }} className="status__dot_status"></div>
                    <span style={{ marginLeft: 8 }}>Mới</span>
                </div>
            case "Waiting" || "Pending":
                return <div className="d-flex align-items-center">
                    <div style={{ background: "#FFEC29" }} className="status__dot_status"></div>
                    <span style={{ marginLeft: 8 }}>Chờ</span>
                </div>
            case "Completed":
                return <div className="d-flex align-items-center">
                    <div style={{ background: "#ADDF48" }} className="status__dot_status"></div>
                    <span style={{ marginLeft: 8 }}>Hoàn thành</span>
                </div>
            case "Canceled":
                return <div className="d-flex align-items-center">
                    <div style={{ background: "#FF647C" }} className="status__dot_status"></div>
                    <span style={{ marginLeft: 8 }}>Từ chối</span>
                </div>
            default:
                return <div className="d-flex align-items-center">
                    <div style={{ background: "#FF647C" }} className="status__dot_status"></div>
                    <span style={{ marginLeft: 8 }}>Huỷ</span>
                </div>
        }
    }
    return <>{renderStatus()}</>
}

export default StatusRender;