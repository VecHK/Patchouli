import { computed, observable } from 'mobx'

const TOKEN_STORE_KEY = 'PATCHOULI_TOKEN'

const getToken = () => localStorage[TOKEN_STORE_KEY] || null
const setToken = token => {
  localStorage[TOKEN_STORE_KEY] = token
}

export default (superClass = class {}) =>
  class TokenStore extends superClass {
    @observable _token = getToken()

    @computed get token() {
      return this._token
    }

    set token(token) {
      this._token = token

      if (token) {
        setToken(token)
      } else {
        delete localStorage[TOKEN_STORE_KEY]
      }
    }
  }
