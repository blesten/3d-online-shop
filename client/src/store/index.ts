import { ISaved, ICart, IUserState } from './../utils/interface'
import { proxy } from 'valtio'

const state = proxy<
  {
    saved: ISaved[],
    cart: ICart[],
    user: Partial<IUserState>
  }
>({
  saved: [],
  cart: [],
  user: {
    loading: true
  }
})

export default state