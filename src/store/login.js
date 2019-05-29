import { observable } from 'mobx'

export default (superClass = class {}) =>
  class LoginStore extends superClass {
    @observable isLogin = false
  }
