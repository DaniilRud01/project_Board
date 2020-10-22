import axios from 'axios'
import Cookies from 'universal-cookie'
import { history } from '../index'

const cookies = new Cookies()
const initialState = {
  modalWindow: false,
  title: [],
  email: '',
  password: '',
  token: cookies.get('token'),
  user: {},
  register: '',
  isLoading: true
}

const MODAL = 'MODAL'
const TITLE = 'TITLE'
const SET_EMAIL = 'SET_EMAIL'
const SET_PASSWORD = 'SET_PASSWORD'
const TOKEN = 'TOKEN'
const SYSTEM_WELCOME = 'SYSTEM_WELCOME'
const UNAUTHORIZED = 'UNAUTHORIZED'
const SET_REGISTER = 'SET_REGISTER'
const SET_LOGOUT = 'SET_LOGOUT'

export default function (state = initialState, action) {
  switch (action.type) {
    case MODAL:
      return { ...state, modalWindow: action.modalWindow }
    case TITLE:
      return { ...state, title: action.title }
    case SET_EMAIL:
      return { ...state, email: action.email }
    case SET_PASSWORD:
      return { ...state, password: action.password }
    case TOKEN:
      return { ...state, token: action.token, user: action.user, password: '' }
    case SYSTEM_WELCOME:
      return { ...state, token: action.token, user: action.user, isLoading: false }
    case SET_LOGOUT:
      return { ...state, user: action.user, token: '' }
    case UNAUTHORIZED:
      return { ...state, isLoading: false }
    case SET_REGISTER:
      return { ...state, register: action.register }
    default:
      return state
  }
}
export function modal(boolean) {
  return { type: 'MODAL', modalWindow: boolean }
}

export function newProject(event) {
  return (dispatch, getState) => {
    const project = getState().data.title
    axios.post('/api/v1/project', event)
    dispatch({ type: TITLE, title: [...project, event] })
  }
}

export function getProject() {
  return (dispatch) => {
    axios('/api/v1/project').then(({ data }) => dispatch({ type: TITLE, title: data }))
  }
}
export function setEmail(email) {
  return { type: SET_EMAIL, email }
}
export function setPassword(password) {
  return { type: SET_PASSWORD, password }
}

export function singIn() {
  return (dispatch, getState) => {
    const { email, password } = getState().data
    axios
      .post('/api/v1/auth', { email, password })
      .then(({ data }) =>
        dispatch({ type: TOKEN, token: data.token, user: data.user, password: data.password })
      )
    history.push('/project')
  }
}

export function trySignIn() {
  return (dispatch) => {
    axios('/api/v1/auth').then(({ data }) =>
      dispatch({ type: SYSTEM_WELCOME, token: data.token, user: data.user })
    )
  }
}

export function register() {
  return (dispatch, getState) => {
    const { email, password } = getState().data
    axios
      .post('/api/v1/register', { email, password })
      .then(({ data }) => dispatch({ type: SET_REGISTER, register: data }))
  }
}

export function logOut() {
  return (dispatch) => {
    axios('/api/v1/logout').then(({ data }) =>
      dispatch({ type: SET_LOGOUT, user: { logout: data } })
    )
  }
}
