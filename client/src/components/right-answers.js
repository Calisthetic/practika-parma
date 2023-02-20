import React, { useState, useEffect } from "react";
import "../styles/user-profile.css"

function RightAnswersCounter(props) {
  const [ResultData, setResultData] = useState([{}])

  useEffect(() => {
    fetch("api/result?user_id=" + props.UserId + "&test_id=" + props.TestId, {method: 'GET'}).then(
      response => response.json()
    ).then(
      data => {
        setResultData(data)
      }
    )
  }, [props.TestId, props.UserId])
  return (
    <div>{ResultData[0].correct_count}</div>
  )
}
export default RightAnswersCounter