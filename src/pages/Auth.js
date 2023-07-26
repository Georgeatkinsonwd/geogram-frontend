import {useState, useEffect} from 'react'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import { useGetUserID } from "../hooks/useGetUserID";


function Auth() {

  const navigate = useNavigate()
  const userID = useGetUserID()

  useEffect(()=> {
    if(userID){
      navigate('/profile')
    }
    else{
      navigate('/auth')
    }
    
  },[userID,navigate])



  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  )
}


const Login = () => {
  const [, setCookies] = useCookies(["access_token"])

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3001/auth/login",{
        username,
        password
      })
      console.log(response)
      if (response.data.token){
        setCookies("access_token", response.data.token)
      window.localStorage.setItem("userID", response.data.userID)
      navigate("/profile")
      }

      if(!response.data.token){
        alert('invalid login details')
      }
      

    } catch (error) {
      console.error(error)
      navigate("/auth")
    }
    }


  return(
   <Form
   username={username}
   setUsername={setUsername}
   password={password}
   setPassword={setPassword}
   label="Login"
   onSubmit={onSubmit}
   
    />
    
  )
}

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

 
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        username,
        password
      })
      alert(response.data.message)
      setUsername("")
      setPassword("")
    
          
      
    } catch (error) {
      alert('Error, please try again')
      console.error(error)
    }


  }


  return(
    <Form
    username={username}
    setUsername={setUsername}
    password={password}
    setPassword={setPassword}
    label="Register"
    onSubmit={onSubmit}
     />
    
  )
}


const Form = ({username, setUsername, password, setPassword, label, onSubmit}) => {
  return(
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="form-group">
          <label htmlFor="username"> Username: </label>
          <input value={username} type="text" id="username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password"> Password: </label>
          <input value={password} type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
  

        <button type="submit">{label}</button>
      </form>

        
    </div>
  )
}

export default Auth