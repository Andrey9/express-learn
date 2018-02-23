import axios from 'axios'
import store from '../store/store'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:8081/api/v1',
    headers: {
      common: {
        Authorization: store.state.token
      }
    }
  })
}
