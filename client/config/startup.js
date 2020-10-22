import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { trySignIn } from '../redux/reducers/data'

const Startup = (props) => {
  const token = useSelector((s) => s.data.token)
  const dispatch = useDispatch()
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    token ? dispatch(trySignIn()) : dispatch({ type: 'UNAUTHORIZED' })
  }, [])

  return props.children
}

Startup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

export default Startup
