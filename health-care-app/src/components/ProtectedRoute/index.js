import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'

const ProtectedRoute = (props) => {
    const jwtToken = Cookies.get('jwtToken')
    if(jwtToken === undefined){
        return <Redirect to="/login"/>
    }
    return <Route {...props}/>
}

export default ProtectedRoute