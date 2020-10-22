import React, { useCallback, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line import/named
import { modal, newProject } from '../redux/reducers/data'
import './style.scss'

Modal.setAppElement('#root')

const ModalWindow = () => {
  const setModal = useSelector((s) => s.data.modalWindow)
  const dispatch = useDispatch()
  const [newEvent, setNewEvent] = useState({})
  const getBase64 = useCallback((file) => {
    return new Promise((res, rej) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        res(reader.result)
      }
      reader.onerror = (error) => {
        rej(error)
      }
    })
  }, [])
  const handleOnChange = useCallback(async (e) => {
    const b64 = await getBase64(e.target.files[0])
    setNewEvent({ ...newEvent, image: b64 })
  }, [])
  return (
    <div className="flex">
      <Modal
        className="modal m-auto"
        isOpen={setModal}
        onRequestClose={() => dispatch(modal(false))}
        style={{
          overlay: {
            background: 'black',
            opacity: '75%'
          }
        }}
      >
        <div className="w-full">
          <input
            onChange={handleOnChange}
            className="bg-gray-200 mb-2 appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="file"
          />
        </div>
        <div className="w-full">
          <input
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            className="bg-gray-200 appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            placeholder="Название проекта:"
          />
        </div>
        <div className="flex">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <input
              onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded px-2 py-2 my-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="date"
              placeholder="Дата старта"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <input
              onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded px-2 py-2 my-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="date"
              placeholder="Дата конца"
            />
          </div>
        </div>
        <div className="w-full">
          <input
            onChange={(e) => setNewEvent({ ...newEvent, supervisor: e.target.value })}
            className="bg-gray-200 appearance-none border-2 border-gray-500 rounded mt-2 mb-2 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            placeholder="Руководитель проекта"
          />
        </div>
        <div className="w-full">
          <input
            onChange={(e) => setNewEvent({ ...newEvent, admin: e.target.value })}
            className="bg-gray-200 appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            placeholder="Администратор проекта"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="modal-btn mr-3"
            type="button"
            onClick={() => {
              dispatch(newProject(newEvent))
              dispatch(modal(false))
            }}
          >
            Добавить проект
          </button>
          <button className="cancel-modal" type="button" onClick={() => dispatch(modal(false))}>
            Отмена
          </button>
        </div>
      </Modal>
    </div>
  )
}
export default ModalWindow
