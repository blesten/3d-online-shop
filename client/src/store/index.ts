import { ISaved, ICart } from './../utils/interface'
import { proxy } from 'valtio'

const state = proxy<{saved: ISaved[], cart: ICart[]}>({
  saved: [],
  cart: []
})

export default state