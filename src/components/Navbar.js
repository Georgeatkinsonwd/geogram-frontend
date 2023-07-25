import {Link} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import img from "../picture/parrot.png"
import '../styles/navbarStyles.css'


function Navbar() {
    const [cookies, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()

    const logout = () => {
        setCookies("access_token", "")
        window.localStorage.removeItem("userID")
        navigate("/auth")

    }


  return (
    <div className="navbar">
        <a className="links" href="/" ><img className="logo" src={img} alt="logo" /></a>
        <Link className="links" to="/">Explore</Link>
        {!cookies.access_token ? (<Link className="links" to="/auth">Login/Register</Link>): (
        <>
        <Link className="links" to="/createpost">Create Post</Link>
        <Link className="links" to="/profile">Profile</Link>
        <span className="links" onClick={logout}>Logout</span>
        </>
        )}
        
    </div>
  )
}

export default Navbar