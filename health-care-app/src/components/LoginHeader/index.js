import { Component } from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const btnList = [
    {
        content: 'Login',
        id: 'login',
        path: 'login'
    },
    {
        content: 'Create Account',
        id: 'createAccount',
        path: 'create-account'
    }
]

class LoginHeader extends Component{
    state = {
        activeBtn: btnList[0].id
    }

    onClickingBtn = event => {
        this.setState({activeBtn: event.target.id})
    }

    render() {
        const {activeBtn} = this.state
        return (
            <div className='login-header'>
                <h1 className='brand'>HealthCare</h1>
                <div className='login-header-btn-container'>
                {
                    btnList.map(eachBtn => <Link className="btn-link" to={`/${eachBtn.path}`}><button type="button" id={eachBtn.id} key={eachBtn.id} onClick={this.onClickingBtn} className={`login-header-btn ${activeBtn === eachBtn.id? 'active-login-header-btn': ''}`}>{eachBtn.content}</button></Link>)
                }
                </div>
            </div>
        )
    }
}

export default LoginHeader