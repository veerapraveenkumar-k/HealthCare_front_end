import { Component } from "react"
import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import Header from '../Header'
import Tabs from '../Tabs'

const DoctorTabsList =[
    {tabId: 'PROFILE', displayText: 'My Profile'},
    {tabId: 'APPOINMENTS', displayText: 'My Appointments'},
    {tabId: 'PATIENTS', displayText: 'Update Password'},
    {tabId: 'DOCTORS', displayText: 'Delete Account'},
]

class Doctor extends Component {

    state = {
        showSlider: true,
        activeTab: DoctorTabsList[1].tabId,
        appointmentList: [],
        profile: '',
        createProfile: false
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

    renderRespectiveTab = () => {
        const {activeTab} = this.state
        switch(activeTab){
            case DoctorTabsList[0].tabId:
                return <h1>My Profile (Doctor)</h1>
            case DoctorTabsList[1].tabId:
                return <h1>My Appointments</h1>
            case DoctorTabsList[2].tabId:
                return <h1>Update Password</h1>
            case DoctorTabsList[3].tabId:
                return <h1>Delete Account</h1>
            default: 
                return null
        }
    }

    render() {
        const {showSlider, activeTab} = this.state
        const jwtToken = Cookies.get('jwtToken')
        const decodedToken = jwtDecode(jwtToken)
        if(decodedToken.role !== 'Doctor'){
            return <Redirect to="/unauthorized"/>
        }
        return (
            <div className="patient-bg-container">
                <Header onSliderChange={this.changeSliderStatus}/>
                <div className="patient-main-container">
                    {!showSlider && (
                        <div className="slider-menu">
                            <div className="slider-top-container">
                                {DoctorTabsList.map(eachTab => <Tabs key={eachTab.tabId} tab={eachTab} activeTab={activeTab} onTabChange={this.changeActiveTab}/>)}
                                <button type="button" className="book-appointment-btn">Book Appoinment</button>
                            </div>
                            <button className="slider-logout-btn" onClick={this.onLogout}>Logout</button>
                        </div>
                    )}
                    <div className="patient-side-bar">
                        {DoctorTabsList.map(eachTab => <Tabs key={eachTab.tabId} tab={eachTab} activeTab={activeTab} onTabChange={this.changeActiveTab}/>)}
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

export default Doctor