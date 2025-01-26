import { Component } from "react"
import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import Header from '../Header'
import Tabs from '../Tabs'
import Appointmentcard from '../AppointmentCard'
import './index.css'

const patientsTabsList =[
    {tabId: 'PROFILE', displayText: 'My Profile'},
    {tabId: 'APPOINMENTS', displayText: 'My Appointments'},
    {tabId: 'UPDATE PASS', displayText: 'Update Password'},
    {tabId: 'DELETE', displayText: 'Delete Account'},
]

class Patient extends Component{
    state = {
        showSlider: true,
        activeTab: patientsTabsList[1].tabId,
        appointmentList: [],
        profile: '',
        createProfile: false
    }

    componentDidMount(){
        this.getAppointmentsList()
        this.getProfile()
    }

    getAppointmentsList = async () => {
        const jwtToken = Cookies.get('jwtToken')
        const url='https://healthcare-app-wnc2.onrender.com/api/patient/get-appointments'
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        const data = await response.json()
        const {appointment_list} = data
        this.setState({appointmentList: appointment_list})
    }

    getProfile = async () => {
        const jwtToken = Cookies.get('jwtToken')
        const url='https://healthcare-app-wnc2.onrender.com/api/patient/get-profile'
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        const data = await response.json()
        if(data.error_msg){
            this.setState({profile: ''})
        } else {
            this.setState({profile: data.profile})
        }
    }

    changeSliderStatus = () => {
        this.setState(preVal => ({
            showSlider: !preVal.showSlider
        }))
    }

    changeActiveTab = (id) => {
        this.setState({activeTab: id})
    }

    onLogout = () => {
        Cookies.remove('jwtToken')
        this.props.history.replace('/login')
    }

    changeCreateprofile = () => {
        this.setState((preVal) => ({
            createProfile: !preVal.createProfile
        }))
    }

    renderAppoinmentList = () => {
        const {appointmentList} = this.state
        if(appointmentList.length === 0){
            return (
                <div className="no-appoinment-card">
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png" className='not-fonund-img' alt="not-found"/>
                    <h1 className="no-appoinment-text">No Appointments Found</h1>
                </div>
            )
        } else {
            return <>{appointmentList.map(each => <Appointmentcard appoinmentDetails={each}/>)}</>
        }
    }

    renderMyAppoinments = () => {
        return (
            <>
                <h1 className="content-heading">My Appointments</h1>
                <div className="appoinment-list-container">
                    {this.renderAppoinmentList()}
                </div>
            </>
        )
    }


    renderProfile = () => {
        const {profile} = this.state
        if(profile === ''){
            return (
                <div className="no-appoinment-card">
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png" className='not-fonund-img' alt="not-found"/>
                    <h1 className="no-appoinment-text">You Didn't have the Profile Yet..</h1>
                    <button className="create-profile-btn">Create Profile</button>
            </div>
            )
        }else {
            return <h1>Profile</h1>
        }
    }

    renderRespectiveTab = () => {
        const {activeTab} = this.state
        switch(activeTab){
            case patientsTabsList[0].tabId:
                return this.renderProfile()
            case patientsTabsList[1].tabId:
                return this.renderMyAppoinments()
            case patientsTabsList[2].tabId:
                return <h1>Update Password</h1>
            case patientsTabsList[3].tabId:
                return <h1>Delete Account</h1>
            default: 
            return null
        }
    }

    render(){
        const {showSlider, activeTab} = this.state
        const jwtToken = Cookies.get('jwtToken')
        const decodedToken = jwtDecode(jwtToken)
        if(decodedToken.role !== 'Patient'){
            return <Redirect to="/unauthorized"/>
        }
        return (
            <div className="patient-bg-container">
                <Header onSliderChange={this.changeSliderStatus}/>
                <div className="patient-main-container">
                    {!showSlider && (
                        <div className="slider-menu">
                            <div className="slider-top-container">
                                {patientsTabsList.map(eachTab => <Tabs key={eachTab.tabId} tab={eachTab} activeTab={activeTab} onTabChange={this.changeActiveTab}/>)}
                                <button type="button" className="book-appointment-btn">Book Appoinment</button>
                            </div>
                            <button className="slider-logout-btn" onClick={this.onLogout}>Logout</button>
                        </div>
                    )}
                    <div className="patient-side-bar">
                        {patientsTabsList.map(eachTab => <Tabs key={eachTab.tabId} tab={eachTab} activeTab={activeTab} onTabChange={this.changeActiveTab}/>)}
                        <button type="button" className="book-appointment-btn">Book Appoinment</button>
                    </div>
                    <div className="patient-content-container">
                        {this.renderRespectiveTab()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Patient