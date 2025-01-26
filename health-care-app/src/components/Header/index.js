import { Component } from "react"
import Cookies from 'js-cookie'
import { withRouter } from "react-router-dom/cjs/react-router-dom.min"
import { CiMenuFries } from "react-icons/ci"
import { RxCross1 } from "react-icons/rx"
import './index.css'

class Header extends Component {

    state = {
        showMenu: false
    }

    changeMenuStatus = () => {
        this.setState(preVal => ({
            showMenu: !preVal.showMenu
        }))
        this.props.onSliderChange()
        
    }

    onLogout = () => {
        Cookies.remove('jwtToken')
        this.props.history.replace('/login')
    }

    render(){
        const {showMenu} = this.state
        return (
            <div className='header-container'>
                <h1 className='header-brand'>HealthCare</h1>
                <button className='logout-btn' onClick={this.onLogout}>Logout</button>
                {!showMenu ? <CiMenuFries className="sm-menu-icon" onClick={this.changeMenuStatus}/>: <RxCross1 className="sm-menu-icon" onClick={this.changeMenuStatus}/>}
            </div>
        )
    }
}

export default withRouter(Header)