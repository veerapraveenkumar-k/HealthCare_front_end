import { Component } from "react"
import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import Header from '../Header'
import Tabs from '../Tabs'
import './index.css'

const AdminTabsList =[
    {tabId: 'PROFILE', displayText: 'My Profile'},
    {tabId: 'APPOINMENTS', displayText: 'Manage Appointments'},
    {tabId: 'PATIENTS', displayText: 'Manage Patients'},
    {tabId: 'DOCTORS', displayText: 'Manage Doctors'},
    {tabId: 'UPDATE PASSWORD', displayText: 'Update Password'},
]

class Admin extends Component {

    state = {
        showSlider: true,
        activeTab: AdminTabsList[1].tabId,
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
            case AdminTabsList[0].tabId:
                return <h1>My Profile (Admin)</h1>
            case AdminTabsList[1].tabId:
                return <h1>Manage Appoinment</h1>
            case AdminTabsList[2].tabId:
                return <h1>Manage Patient</h1>
            case AdminTabsList[3].tabId:
                return <h1>Manage Doctors</h1>
            case AdminTabsList[4].tabId:
                return <h1>Update Password</h1>
            default: 
                return null
        }
    }

    render() {
        const {showSlider, activeTab} = this.state
        const jwtToken = Cookies.get('jwtToken')
        const decodedToken = jwtDecode(jwtToken)
        if(decodedToken.role !== 'Admin'){
            return <Redirect to="/unauthorized"/>
        }
        return (
            <div className="patient-bg-container">
                <Header onSliderChange={this.changeSliderStatus}/>
                <div className="patient-main-container">
                    {!showSlider && (
                        <div className="slider-menu">
                            <div className="slider-top-container">
                                {AdminTabsList.map(eachTab => <Tabs key={eachTab.tabId} tab={eachTab} activeTab={activeTab} onTabChange={this.changeActiveTab}/>)}
                                <button type="button" className="book-appointment-btn">Book Appoinment</button>
                            </div>
                            <button className="slider-logout-btn" onClick={this.onLogout}>Logout</button>
                        </div>
                    )}
                    <div className="patient-side-bar">
                        {AdminTabsList.map(eachTab => <Tabs key={eachTab.tabId} tab={eachTab} activeTab={activeTab} onTabChange={this.changeActiveTab}/>)}
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

export default Admin