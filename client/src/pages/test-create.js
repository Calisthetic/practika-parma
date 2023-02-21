import React, {Component} from 'react'
import '../styles/global.css'
import s from '../styles/test-create.module.css'

export default class TestCreate extends Component {
  render() {
    return (
      <div className={s.container}>
      <div className={s.test_name}>
          <input className={s.test_name_input} placeholder="Название теста"/>
      </div>
      <div className={s.test_description}>
          <input className={s.test_description_input} placeholder="Описание теста"/>
      </div>
      <div className={s.question_num}>
          <button className={s.question_button}>1</button>
          <button className={s.question_add}>+</button>
      </div>
      <div className={s.options}>
          <div className={s.question_name}>
              <div className={s.question_name_text}>Название задания</div>
              <input className={s.question_name_input}/>
          </div>
          <div className={s.question_description}>
              <div className={s.question_description_text}>Описание задания</div>
              <input className={s.question_description_input}/>
          </div>

          <div className={s.answer}>
              <div className={s.answer_text}>Ответ 4</div>
              <input className={s.answer_input}/>
          </div>
          <div className={s.answer}>
              <div className={s.answer_text}>Ответ 4</div>
              <input className={s.answer_input}/>
          </div>
          <div className={s.answer}>
              <div className={s.answer_text}>Ответ 4</div>
              <input className={s.answer_input}/>
          </div>
          <div className={s.answer}>
              <div className={s.answer_text}>Ответ 4</div>
              <input className={s.answer_input}/>
          </div>
          <div className={s.right_answer}>
              <div className={s.right_answer_text}>Правильный ответ</div>
              <div className={s.answer_list}>
                  <select name="" id="">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                  </select>
              </div>
          </div>
          <div className={s.question_accept_button}>
              <button className={s.accept_button}>Готово</button>
          </div>       
      </div>
    </div>
    )
  }
}