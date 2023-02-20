import React, { useState, useEffect } from "react";
import "../styles/user-profile.css"

function QuestCounter(props) {
  const [QuestsData, setQuestsData] = useState([{}])

  useEffect(() => {
    fetch("api/quest?test=" + props.TestId, {method: 'GET'}).then(
      response => response.json()
    ).then(
      data => {
        setQuestsData(data)
      }
    )
  }, [props.TestId])
  
  return (
    <div >{QuestsData.length}</div>
  )
}
export default QuestCounter