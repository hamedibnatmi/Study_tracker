
const StatusCard = ({ title, value, icon, time = "" }) => {
    return (
        <div>
            <div className="status-card">
                <div className="status-card-header">
                    <p>{title}</p>
                    {icon}
                </div>
                <div className="status-card-content">
                    <p>{value} {time}</p>
                </div>
            </div>
        </div>
    )
}

export default StatusCard