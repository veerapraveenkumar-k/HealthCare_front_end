import { Component } from "react"
import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import Header from '../Header'
import Tabs from '../Tabs'

const StaffTabsList =[
    {tabId: 'PROFILE', displayText: 'My Profile'},
    {tabId: 'APPOINMENTS', displayText: 'Manage Appointments'},
    {tabId: 'PATIENTS', displayText: 'manage Doctors'},
    {tabId: 'DOCTORS', displayText: 'Update Password'},
    {tabId: 'UPDATE PASSWORD', displayText: 'Delete Account'},
]

class Staff extends Component {

    state = {
        showSlider: true,
        activeTab: StaffTabsList[1].tabId,
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
            case StaffTabsList[0].tabId:
                return <h1>My Profile (Staff)</h1>
            case StaffTabsList[1].tabId:
                return <h1>Manage Appoinment</h1>
            case StaffTabsList[2].tabId:
                return <h1>Manage Doctors</h1>
            case StaffTabsList[3].tabId:
                return <h1>Update Password</h1>
            case StaffTabsList[4].tabId:
                return <h1>Delete Account</h1>
            default: 
                return null
        }
    }

    render() {
        const {showSlider, activeTab} = this.state
        const jwtToken = Cookies.get('jwtToken')
        const decodedToken = jwtDecode(jwtToken)
        if(decodedToken.role !== 'Staff'){
            return <Redirect to="/unauthorized"/>
        }
        return (
            <div className="patient-bg-container">
                <Header onSliderChange={this.changeSliderStatus}/>
                <div className="patient-main-container">
                    {!showSlider && (
                        <div className="slider-menu">
                            <div className="slider-top-container">
                                {StaffTabsList.map(eachTab => <Tabs key={eachTab.tabId} tab={eachTab} activeTab={activeTab} onTabChange={this.changeActiveTab}/>)}
                                <button type="button" className="book-appointment-btn">Book Appoinment</button>
                            </div>
                            <button className="slider-logout-btn" onClick={this.onLogout}>Logout</button>
                        </div>
                    )}
                    <div className="patient-side-bar">
                        {StaffTabsList.map(eachTab => <Tabs key={eachTab.tabId} tab={eachTab} activeTab={activeTab} onTabChange={this.changeActiveTab}/>)}
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

export default Staff