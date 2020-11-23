import crypto from 'crypto'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { AppStore } from '../store/index'
import { setAppLoadingAction } from '@actions/index'

export const decryptIncomingResponse = (response: AxiosResponse) => {
  AppStore.dispatch(setAppLoadingAction(false))
  let key = process.env.AES_KEY
  let iv = response.data.iv
  let decipher = crypto.createDecipheriv('aes-256-ctr', key, iv)
  let decrypted = decipher.update(response.data.data, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  response.data = JSON.parse(decrypted)
  return response
}

export const encryptOutgoingRequest = (request: AxiosRequestConfig) => {
  let key = process.env.AES_KEY
  let iv = crypto.randomBytes(8).toString('hex')
  let cipher = crypto.createCipheriv('aes-256-ctr', key, iv)
  let encrypted = cipher.update(JSON.stringify(request.data), 'utf8', 'hex')
  encrypted += cipher.final('hex')
  request.data = {
    data: encrypted,
    iv
  }
  return request
}
