/*
 * @Author: lizhigang
 * @Date: 2019/9/9
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import axios from 'axios'

interface getRequest {
  (url: string): (params: any) => AxiosPromise
}

interface listResponse<T = any> {
  errno: number
  data: T
}

export interface AxiosPromise<T = any> extends Promise<listResponse<T>> {}

export const get: getRequest = function(url: string) {
  return function (params: any): AxiosPromise {
    return axios.get(url, {
      params
    }).then((res: any) => {
      const { errno, data } = res.data
      if (errno === 0) {
        return data
      }
    }).catch(err => {
      console.error(err)
    })
  }
}
