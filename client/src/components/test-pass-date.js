import React, { useState, useEffect } from "react";
import "../styles/user-profile.css"

function TestPassDate(props) {
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
  if (ResultData[0].complete_time !== undefined) {
    return (
      <div>{(ResultData[0].complete_time).substr(0,10)}</div>
    )
  }
}
export default TestPassDate