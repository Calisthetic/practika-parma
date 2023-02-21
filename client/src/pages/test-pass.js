import React, { useState, useEffect } from "react";
import s from "../styles/test-pass.module.css";
//import { User_Id as UserId } from "./authorisation.js";
import { Test_Id as TestId } from "./user-profile.js";
import QuestExplorer from "../components/quest-explorer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export let QuestionId = 1;
export default function TestPass() {
  // Все вопросы к тесту
  const [QuestionsData, setQuestionsData] = useState([{}]);
  useEffect(() => {
    fetch("../api/quest?test=" + TestId, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setQuestionsData(data);
      });
  }, []);
  
  // Тест
  const [TestData, setTestData] = useState([{}]);
  useEffect(() => {
    fetch("../api/test/" + TestId, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setTestData(data);
      });
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  return (
    <div className={s.container}>
      <div className={s.test_name}>
        {TestData.title}
      </div>
      <div className={s.test_description}>
        {TestData.describe}
      </div>
      
      <div className={s.question_num}>
        
        {(typeof QuestionsData[0] === 'undefined' || JSON.stringify(QuestionsData[0]) === "{}") ? (
          <p>Ошибка при загрузке вопросов</p>
        ) : (
          Object.keys(QuestionsData).map(item => (
            <button key={QuestionsData[item].id} className={s.question_button}>{Number(item) + 1}</button>
          ))
        )}
      </div>
      <div className={s.options}>
        <Slider {...settings}>
          {(typeof QuestionsData[0] === 'undefined' || JSON.stringify(QuestionsData[0]) === "{}") ? (
            <p>Ошибка при загрузке вопросов</p>
          ) : (
            Object.keys(QuestionsData).map(item => (
              <QuestExplorer key={item} QuestId={QuestionsData[item].id}/>
            ))
          )}
        </Slider>
        
        <div className={s.question_accept_button}>
          <button className={s.accept_button}>Отправить</button>
        </div>
      </div>
    </div>
  );

}
