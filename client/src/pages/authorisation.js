import React, {useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/global.css'
import s from '../styles/login.module.css'
export let User_Id = 15;


export default function Auth()  {
  
  const navigate = useNavigate();
  const AuthClick = () => {
    if (UserData.id !== undefined)
      User_Id = UserData.id
    if (User_Id !== undefined && User_Id !== 0 && UserData.id !== undefined) {
      navigate('/user')
    }
  }
  const AuthLogin = useRef()
  const AuthPasswosd = useRef()

  const [UserData, setUserData] = useState([{}])
  const RespChange = () => {
    fetch("api/user?login=" + AuthLogin.current.value + '&password=' + AuthPasswosd.current.value, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      }
    )
  }
  return (
    <div className={s.container}>
      <div className={s.login_block}>
        <div className={s.login_title}>Добро пожаловать</div>
        <div className={s.login_inputs}>
          <input ref={AuthLogin} onChange={RespChange} type="text" placeholder="Логин"/>
          <input ref={AuthPasswosd} onChange={RespChange} type="text" placeholder="Пароль"/>
        </div>
        <div className={s.login_button} onClick={AuthClick}>Войти</div>
      </div>
    </div>
  )
}