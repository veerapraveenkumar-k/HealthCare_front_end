import './index.css'

const Appointmentcard = props => {
    const {appoinmentDetails} = props
    return (
        <div className='appoinment-card'>
            <h1 className='appointment-side-heading'>Appointment ID: <span className='appointment-value-text'>{appoinmentDetails.appointment_id
            }</span></h1>
            <h1 className='appointment-description'>{appoinmentDetails.description}</h1>
            <h1 className='appointment-side-heading'>Date: <span className='appointment-value-text'>{appoinmentDetails.date
            }</span></h1>
            <h1 className='appointment-side-heading'>Status: <span className='appointment-value-text'>{appoinmentDetails.status
            }</span></h1>
            {appoinmentDetails.doctor_id !== undefined ? (
                <h1 className='appointment-side-heading'>Doctor ID: <span className='appointment-value-text'>{appoinmentDetails.doctor_id
                }</span></h1>
            ) : (
                <h1 className='appointment-side-heading'>Doctor ID: <span className='appointment-value-text'>Didn't Assigned</span></h1>
            )
        }
        </div>
    )
}

export default Appointmentcard