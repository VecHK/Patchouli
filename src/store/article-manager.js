import { observable } from 'mobx'

export default (superClass = class { }) =>
  class ArticleManagerStore extends superClass {
    @observable publishList = []

    @observable categories = {
      left: [],
      right: []
    }
  }
