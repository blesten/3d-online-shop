import { SERVER_URL } from './../config/key'
import axios from 'axios'

export const getDataAPI = async(url: string, token?: string) => {
  const res = await axios.get(`${SERVER_URL}/api/v1/${url}`, {
    headers: {
      Authorization: `${token}`
    },
    withCredentials: true
  })

  return res
}

export const postDataAPI = async(url: string, data: object, token?: string) => {
  const res = await axios.post(`${SERVER_URL}/api/v1/${url}`, data, {
    headers: {
      Authorization: `${token}`
    },
    withCredentials: true
  })

  return res
}

export const patchDataAPI = async(url: string, data: object, token?: string) => {
  const res = await axios.patch(`${SERVER_URL}/api/v1/${url}`, data, {
    headers: {
      Authorization: `${token}`
    },
    withCredentials: true
  })

  return res
}

export const deleteDataAPI = async(url: string, token?: string) => {
  const res = await axios.delete(`${SERVER_URL}/api/v1/${url}`, {
    headers: {
      Authorization: `${token}`
    },
    withCredentials: true
  })

  return res
}