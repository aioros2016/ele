import Goods from './components/goods/Goods.vue'
import Ratings from './components/ratings/Ratings.vue'
import Seller from './components/seller/Seller.vue'

export default [
	{
	    path: '/Goods',
	    component: Goods
	},
	{
	    path: '/Ratings',
	    component: Ratings
	},
	{
	    path: '/Seller',
	    component: Seller
	},
	{ 
		path: '/', 
		redirect: '/Index' 
	},
	{ 
	    path: '*',
	    redirect: '/Index'
	}
];
