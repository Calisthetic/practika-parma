import React, { useRef, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/global.css'
import '../styles/login.css'
export let User_Id = 15;


export default function Auth()   {
  const AuthLogin = useRef();
  const AuthPassword = useRef();
  const [UserData, setUserData] = useState([{}]);
  useEffect(() => {
    fetch("api/user?login=" + AuthLogin.current.value + '&password=' + AuthPassword.current.value, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        User_Id = data.id
      });
  }, []); 
  const navigate = useNavigate();
  const AuthClick = () => {
    User_Id = UserData.id
    navigate('/user')
    
  }
  return (
    <div className="containerr">
      <div className="login-block">
        <div className="login-title">Добро пожаловать</div>
        <div className="login-inputs">
          <input defaultValue="user13" type="text" ref={AuthLogin} placeholder="Логин"/>
          <input defaultValue="pass13" type="text" ref={AuthPassword} placeholder="Пароль"/>
        </div>
        <div className='login-button' onClick={AuthClick}>Войти</div>
      </div>
    </div>
  )
}