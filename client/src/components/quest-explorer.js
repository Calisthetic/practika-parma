import React, { useState, useEffect } from "react";
import s from "../styles/test-pass.module.css";

function QuestExplorer(props) {
  const [QuestData, setQuestData] = useState([{}])

  useEffect(() => {
    fetch("../api/quest/" + props.QuestId, {method: 'GET'}).then(
      response => response.json()
    ).then(
      data => {
        setQuestData(data)
      }
    )
  }, [props.QuestId])
  
  return (
    <div>
      <div className={s.question_title}>{QuestData.title}</div>
      <div className={s.question_describe}>{QuestData.describe}</div>
      <div className={s.answers}>
        <div className={s.answers_row}>
          <div className={s.answer}>{QuestData.first_answer}</div>
          <div className={s.answer}>{QuestData.second_answer}</div>
        </div>
        <div className={s.answers_row}>
          <div className={s.answer}>{QuestData.third_answer}</div>
          <div className={s.answer}>{QuestData.fourth_answer}</div>
        </div>
      </div>
    </div>
  )
}
export default QuestExplorer