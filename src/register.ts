/*
 * @Author: lizhigang
 * @Date: 2019/9/9
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import { createAPI } from 'cube-ui'
import Vue from 'vue'
import HeaderDetail from 'components/header-detail/header-detail.vue'
import ShopCartList from 'components/shop-cart-list/shop-cart-list.vue'
import ShopCartSticky from 'components/shop-cart-sticky/shop-cart-sticky.vue'
import Food from 'components/food/food.vue'

// @ts-ignore
createAPI(Vue, HeaderDetail)

// @ts-ignore
createAPI(Vue, ShopCartList)

// @ts-ignore
createAPI(Vue, ShopCartSticky)

// @ts-ignore
createAPI(Vue, Food)
