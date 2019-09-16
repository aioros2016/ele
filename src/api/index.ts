/*
 * @Author: lizhigang
 * @Date: 2019/9/9
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import { get, AxiosPromise } from './helpers'

interface RequestFn {
  (params: SellerId): AxiosPromise
}

interface SellerId {
  id: string
}

const getSeller: RequestFn = get('/api/seller')
const getGoods: RequestFn = get('/api/goods')
const getRatings: RequestFn = get('/api/ratings')

export {
  getSeller,
  getGoods,
  getRatings
}
