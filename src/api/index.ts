/*
 * @Author: lizhigang
 * @Date: 2019/9/9
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import { get, AxiosPromise } from './helpers'

interface requestFn {
  (url?: undefined): AxiosPromise
}

const getSeller: requestFn = get('/api/seller')
const getGoods: requestFn = get('/api/goods')
const getRatings: requestFn = get('/api/ratings')

export {
  getSeller,
  getGoods,
  getRatings
}
