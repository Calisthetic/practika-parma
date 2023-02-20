import React, { useRef, useState, useEffect} from 'react'
import '../styles/global.css'
import '../styles/login.css'



export default function Auth()   {
  const AuthLogin = useRef();
  const AuthPassword = useRef();
  const [UserData, setUserData] = useState([{}]);
  useEffect(() => {
    fetch("api/user?login=" + AuthLogin.current.value + '&password=' + AuthPassword.current.value, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      });
  }, []); 
  const AuthClick = () => {
    console.log(UserData)
  }
  return (
    <div class="container">
      <div class="login-block">
        <div class="login-title">Добро пожаловать</div>
        <div class="login-inputs">
          <input type="text" ref={AuthLogin} placeholder="Логин"/>
          <input type="text" ref={AuthPassword} placeholder="Пароль"/>
        </div>
        <div className='login-button' onClick={AuthClick}>Войти</div>
      </div>
    </div>
  )
}