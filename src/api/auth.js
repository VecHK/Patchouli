import vait from 'vait'
import md5 from 'blueimp-md5'
import request from 'utils/request'

export const Login = async password => {
  await vait.timeout(500)
  try {
    const token = await request({
      method: 'POST',
      url: 'auth/login',
      noToken: true,
      data: {
        pass: md5(password)
      }
    })

    // return true
    return token
  } catch (err) {
    if (err.status === 403) {
      return false
    }

    throw err
  }
}

export const checkLoginStatus = async () => {
  try {
    await request.get('auth/test')
    return true
  } catch (err) {
    if (err.status === 401) {
      return false
    }
    throw err
  }
}
