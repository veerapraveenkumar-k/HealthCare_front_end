import { Component } from 'react'
import LoginHeader from '../LoginHeader'
import './index.css'

const viewConstent = {
    ceratingAccountView: 'CREATEACC',
    faileure: 'FAIL',
    loadingView: 'LOADING',
    successView: 'SUCCESS',
}

class CreateAccount extends Component {

    state = {
        createAccountView: viewConstent.ceratingAccountView,
        email: '',
        role: 'Patient',
        otp: '',
        password: '',
        errorMsg: ''
    }

    onChangeNewEmail = event => {
        this.setState({email: event.target.value})
    }

    changeRole = event => {
        this.setState({role: event.target.value})
    }

    onChangeNewPass = (event) => {
        this.setState({password: event.target.value})
    }

    createAccFail = (data) => {
        this.setState({errorMsg: data.error_msg})
    }

    createAccSuccess = (data) => {
        this.setState({email: '', password: '', role: 'Patient', errorMsg: ''})
        this.props.history.replace('/login')
    }

    createAcc = async event => {
        event.preventDefault()
        //this.setState({createAccountView: viewConstent.loadingView})
        const {email, role, password} = this.state
        const url = 'https://healthcare-app-wnc2.onrender.com/api/create-account'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email, role: role, password: password})
        })
        const data = await response.json()
        if(data.error_msg){
            this.createAccFail(data)
        } else {
            this.createAccSuccess(data)
    }
}

    creatingAccount = () => {
        const {email, errorMsg, role, password} = this.state
        return (
            <form className='login-form' onSubmit={this.createAcc}>
                <div className='input-container'>
                    <p className='input-label-text'>
                        Enter Your Email:
                    </p>
                    <input className='input-box' type='text' placeholder='email' onChange={this.onChangeNewEmail} value={email}/>
                </div>
                <div className='input-container'>
                    <p className='input-label-text'>
                        Choose Your Role:
                    </p>
                    <select className='input-box' onChange={this.changeRole} value={role}>
                        <option vlaue='Admin'>Admin</option>
                        <option vlaue='Patient'>Patient</option>
                        <option vlaue='Doctor'>Doctor</option>
                        <option vlaue='Staff'>Staff</option>
                    </select>
                    </div>
                <div className='input-container'>
                    <p className='input-label-text'>
                        Enter Your Password:
                    </p>
                    <input className='input-box' type='password' placeholder='password' onChange={this.onChangeNewPass} value={password}/>
                    </div>
                    <button className='send-otp-btn' type='submit'>Create Account</button>
                    {errorMsg.length === 0 ? null : <p className='error-msg'>{errorMsg}</p>}
            </form>
        )
    }

    renderLoading = () => {
        return (
            <div data-testId='Loader'>
                <h1>Loading</h1>
            </div>
        )
    }

    renderRespectiveCreateAccountView = () => {
        const {createAccountView} = this.state
        switch(createAccountView){
            case viewConstent.ceratingAccountView:
                return this.creatingAccount()
            case viewConstent.loadingView:
                return this.renderLoading()
            case viewConstent.successView:
                return <h1>SUCCESS</h1>
            default:
                return null
        }
    }

    moveLogin = () => {
        this.props.history.replace('/login')
    }

    render() {
        return (
            <>
            <LoginHeader />
            <div className='create-account-bg'>
                {this.renderRespectiveCreateAccountView()}
                <button className='login-header-sm-btn sm-login-btn' type='button' onClick={this.moveLogin}>Login</button>
            </div>
            </>
        )
    }
}

export default CreateAccount