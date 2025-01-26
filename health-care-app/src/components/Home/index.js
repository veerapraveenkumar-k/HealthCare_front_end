import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

const Home = () => {
    const jwtToken = Cookies.get('jwtToken')
    if(jwtToken === undefined){
        return <Redirect to="/login"/>
    }
    const decodedToken = jwtDecode(jwtToken)
    switch(decodedToken.role){
        case 'Patient':
            return <Redirect to="/patient-acc"/>
        case 'Admin':
            return <Redirect to="/Admin"/>
        case 'Doctor':
            return <Redirect to="/doctor"/>
        case 'Staff':
            return <Redirect to="/staff"/>
        default:
            return null
    }
}

export default Home