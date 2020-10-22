import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
import { useDispatch } from 'react-redux'
import Project from './project-list'
// eslint-disable-next-line import/named
import { getProject } from '../redux/reducers/data'

const Main = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProject())
  }, [dispatch])
  return (
    <div className="h-screen">
      <div className="container">
        <div className="nav">
          <div className="nav-btn">
            <Link className="button">Задачи и работы</Link>
            <Link to="/project" className="button">
              <Link to="/project">Проекты</Link>
            </Link>
            <Link className="button">Календарь</Link>
            <Link to="/editor" className="button">Редактор кода</Link>
          </div>
        </div>
        <Project />
      </div>
    </div>
  )
}
export default Main
