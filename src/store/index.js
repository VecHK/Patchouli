import TokenStore from './token'
import LoginStore from './login'

const createClassChain = chain => {
  const createStoreClass = chain.shift()
  if (createStoreClass) {
    return createStoreClass(createClassChain(chain))
  } else {
    return class ChainReached {}
  }
}

const RootStore = createClassChain([
  TokenStore,
  LoginStore
])

export default new RootStore()
