import { Component } from 'react'
import { withRouter } from 'react-router-dom';
import LoginHeader from '../LoginHeader'
import loginBg from '../../assets/loginBgImage.jpg'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import './index.css'

class Login extends Component {

    state = {
        email: '',
        password: '',
        errorMsg: ''
    }

    onChangeEmail = event => {
        this.setState({email: event.target.value})
    }

    onChangePassword = event => {
        this.setState({password: event.target.value})
    }

    renderEmailfeild = () => {
        const {email} = this.state
        return (
            <div className='input-container'>
                <p className='input-label-text'>Enter Your Email:</p>
                <input className='input-box' type='text' placeholder='email' onChange={this.onChangeEmail} value={email}/>
            </div>
        )
    }

    renderPasswordfeild = () => {
        const {password} = this.state
        return (
            <div className='input-container'>
                <p className='input-label-text'>Enter Your Password:</p>
                <input className='input-box' type='password' placeholder='password' onChange={this.onChangePassword} value={password}/>
            </div>
        )
    }

    loginFail = (data) => {
        this.setState({errorMsg: data.error_msg})
    }

    loginSuccess = (data) => {
        Cookies.set('jwtToken', data.jwt_token, {expires: 30})
        this.setState({email: '', password: '', errorMsg: ''})
        this.props.history.replace('/')
    }

    login = async event => {
        event.preventDefault()
        const {email, password} = this.state
        const url = 'https://healthcare-app-wnc2.onrender.com/api/login'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email, password: password})
        })
        const data = await response.json()
        if(data.error_msg){
            this.loginFail(data)
        }else {
            this.loginSuccess(data)
        }
    }

    moveCreatAcc = () => {
        this.props.history.replace('/create-account')
    }

    render() {
        const jwtToken = Cookies.get('jwtToken')
        if(jwtToken !== undefined){
            return <Redirect to="/"/>
        }
        const {errorMsg} = this.state
        return (
            <div className='login-bg-container' style={{
                backgroundImage: `url(${loginBg})`,
            }}>
                <LoginHeader/>
                <div className='login-form-bg'>
                    <form className='login-form' onSubmit={this.login}>
                       {this.renderEmailfeild()}
                       {this.renderPasswordfeild()}
                       <button className='login-btn' type="submit">Login</button>
                       {errorMsg.length === 0 ? null : <p className='error-msg'>{errorMsg}</p>}
                    </form>
                </div>
                <button className='login-header-sm-btn' type='button' onClick={this.moveCreatAcc}>Create Account</button>
            </div>
        )
    }
}

export default withRouter(Login)