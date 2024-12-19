import { ISaved } from './../utils/interface'
import { proxy } from 'valtio'

const state = proxy<{saved: ISaved[]}>({
  saved: []
})

export default state