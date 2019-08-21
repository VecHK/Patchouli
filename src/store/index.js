import TokenStore from './token'
import LoginStore from './login'
import ArticleManagerStore from './article-manager'

const createClassChain = chain => {
  const createClass = chain.shift()
  if (createClass) {
    return createClass(createClassChain(chain))
  } else {
    return class ChainReached {}
  }
}

const RootStore = createClassChain([
  TokenStore,
  LoginStore,
  ArticleManagerStore
])

export default new RootStore()
