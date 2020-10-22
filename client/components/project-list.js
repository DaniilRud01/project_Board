import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line import/named
import { logOut, modal } from '../redux/reducers/data'
import ModalWindow from './modal'
import './style.scss'

const Project = () => {
  const dispatch = useDispatch()
  const title = useSelector((s) => s.data.title)
  return (
    <div className="content">
      {
        console.log(title)
      }
      <div className="avatar-box">
        <button className="mr-4" type="button" onClick={() => dispatch(logOut())}>
          <h4>Выйти</h4>
        </button>
        <button type="button" onClick={() => dispatch(logOut())}>
          <img
            src="https://i.ibb.co/bHVTC7J/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dcaca9a5-6802267615270566047072.png"
            alt=""
          />
        </button>
      </div>
      <div className="project">
        <div className="project-title">
          <h1>Проекты</h1>
          <ul>
            <li>
              <a href="#">Вёрстка</a>
            </li>
            <li>
              <a href="#">JavaScript</a>
            </li>
            <li>
              <a href="#">ReactJS</a>
            </li>
            <li>
              <a href="#">React-Redux</a>
            </li>
            <li>
              <a href="#">NodeJS</a>
            </li>
            <li>
              <a href="#">MongoDB</a>
            </li>
          </ul>
        </div>
        <div className="flex justify-between">
          <h1>Список проектов</h1>
          <button type="button" onClick={() => dispatch(modal(true))}>
            {' '}
            Добавить проект
          </button>
        </div>
        <div className="container-item">
          {title.map((el) => (
            <div className="project-item inline-block h-64 w-64 shadow-2xl mr-16 mb-6" key={el.name}>
              <img src={el.image} alt="" className="h-32 w-full" />
              <h2 className="name-project">{el.name}</h2>
              <p>
                {' '}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="15" height="15">
                  <g id="Calendar">
                    <path d="M57,8H52V6a4,4,0,0,0-8,0V8H36V6a4,4,0,0,0-8,0V8H20V6a4,4,0,0,0-8,0V8H7a5,5,0,0,0-5,5V53a5,5,0,0,0,5,5H35a1,1,0,0,0,0-2H7a3.009,3.009,0,0,1-3-3V22H60V39a1,1,0,0,0,2,0V13A5,5,0,0,0,57,8ZM46,6a2,2,0,0,1,4,0v6a2,2,0,0,1-4,0ZM30,6a2,2,0,0,1,4,0v6a2,2,0,0,1-4,0ZM14,6a2,2,0,0,1,4,0v6a2,2,0,0,1-4,0ZM60,20H4V13a3.009,3.009,0,0,1,3-3h5v2a4,4,0,0,0,8,0V10h8v2a4,4,0,0,0,8,0V10h8v2a4,4,0,0,0,8,0V10h5a3.009,3.009,0,0,1,3,3Z" />
                    <path d="M30,29a2,2,0,0,0-2-2H24a2,2,0,0,0-2,2v3a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2Zm-6,3V29h4v3Z" />
                    <path d="M18,29a2,2,0,0,0-2-2H12a2,2,0,0,0-2,2v3a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2Zm-6,3V29h4v3Z" />
                    <path d="M52,34a2,2,0,0,0,2-2V29a2,2,0,0,0-2-2H48a2,2,0,0,0-2,2v3a2,2,0,0,0,2,2Zm-4-5h4v3H48Z" />
                    <path d="M30,38a2,2,0,0,0-2-2H24a2,2,0,0,0-2,2v3a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2Zm-6,3V38h4v3Z" />
                    <path d="M18,38a2,2,0,0,0-2-2H12a2,2,0,0,0-2,2v3a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2Zm-6,3V38h4v3Z" />
                    <path d="M28,45H24a2,2,0,0,0-2,2v3a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2V47A2,2,0,0,0,28,45Zm-4,5V47h4v3Z" />
                    <path d="M36,34h4a2,2,0,0,0,2-2V29a2,2,0,0,0-2-2H36a2,2,0,0,0-2,2v3A2,2,0,0,0,36,34Zm0-5h4v3H36Z" />
                    <path d="M34,41a2,2,0,0,0,2,2,1,1,0,0,0,0-2V38h4a1,1,0,0,0,0-2H36a2,2,0,0,0-2,2Z" />
                    <path d="M16,45H12a2,2,0,0,0-2,2v3a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2V47A2,2,0,0,0,16,45Zm-4,5V47h4v3Z" />
                    <path d="M49,36A13,13,0,1,0,62,49,13.015,13.015,0,0,0,49,36Zm0,24A11,11,0,1,1,60,49,11.013,11.013,0,0,1,49,60Z" />
                    <path d="M54.778,44.808,47,52.586,43.465,49.05a1,1,0,0,0-1.414,1.414l4.242,4.243a1,1,0,0,0,1.414,0l8.485-8.485a1,1,0,0,0-1.414-1.414Z" />
                  </g>
                </svg>
                {el.startDate} - {el.endDate}{' '}
              </p>
              <p>
                <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <title />
                  <g id="User">
                    <path d="M41.2452,33.0349a16,16,0,1,0-18.49,0A26.0412,26.0412,0,0,0,4,58a2,2,0,0,0,2,2H58a2,2,0,0,0,2-2A26.0412,26.0412,0,0,0,41.2452,33.0349ZM20,20A12,12,0,1,1,32,32,12.0137,12.0137,0,0,1,20,20ZM8.09,56A22.0293,22.0293,0,0,1,30,36h4A22.0293,22.0293,0,0,1,55.91,56Z" />
                  </g>
                </svg>{' '}
                {el.supervisor}
              </p>
              <p>
                {' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="OutLine"
                  viewBox="0 0 512 512"
                  width="512"
                  height="512"
                >
                  <path d="M74.782,232a8,8,0,0,1-7.889-9.383A192.259,192.259,0,0,1,222.618,66.893a8,8,0,1,1,2.764,15.76A176.212,176.212,0,0,0,82.653,225.382,8,8,0,0,1,74.782,232Z" />
                  <path d="M287.99,445.229a8,8,0,0,1-1.372-15.882,176.214,176.214,0,0,0,142.73-142.729,8,8,0,1,1,15.759,2.764A192.259,192.259,0,0,1,289.382,445.107,8.051,8.051,0,0,1,287.99,445.229Z" />
                  <circle cx="72" cy="256" r="8" />
                  <circle cx="256" cy="72" r="8" />
                  <circle cx="440" cy="256" r="8" />
                  <circle cx="256" cy="440" r="8" />
                  <path d="M256,496A240,240,0,0,1,86.294,86.294,240,240,0,1,1,425.705,425.706,238.426,238.426,0,0,1,256,496Zm0-464A224,224,0,0,0,97.608,414.392,224,224,0,0,0,414.392,97.608,222.535,222.535,0,0,0,256,32Z" />
                  <path d="M296,296a8,8,0,0,0,0-16H240V264h48a48,48,0,0,0,0-96H232a8,8,0,0,0-8,8v72h-8a8,8,0,0,0,0,16h8v16h-8a8,8,0,0,0,0,16h8v56a8,8,0,0,0,16,0V296Zm24-80a32.036,32.036,0,0,1-32,32H240V184h48A32.036,32.036,0,0,1,320,216Z" />
                </svg>{' '}
                {el.admin}
              </p>
            </div>
          ))}
        </div>
        <ModalWindow />
      </div>
    </div>
  )
}
export default Project
