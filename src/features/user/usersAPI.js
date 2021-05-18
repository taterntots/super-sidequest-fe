import axios from 'axios';

export function fetchUsers() {
  return async dispatch => {
    dispatch(getUsers())

    await axios({
      method: 'get',
      url: `https://music-chunks-test-server.herokuapp.com/api/users`,
      headers: {
        Accept: 'application/json',
        Authorization: `fnAD22PlewACAJNhiqikiSxV60EEH3A3N7xdBAi1`,
      },
    })
      .then(res => {
        dispatch(getUsersSuccess(res.data))
      })
      .catch(err => {
        dispatch(getUsersFailure())
      })
  }
}