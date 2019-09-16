<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs" :initial-index="0"></tab>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VHeader from './components/v-header/v-header.vue'
import Tab from './components/tab/tab.vue'
import Goods from './components/goods/goods.vue'
import Ratings from './components/ratings/ratings.vue'
import Seller from './components/seller/seller.vue'
import { getSeller } from './api'
import qs from 'query-string'

@Component({
  components: {
    VHeader,
      Tab
  }
})
export default class App extends Vue {
    seller: any = {
        id: qs.parse(location.search).id
    }

    // computed
    get tabs() {
        return [{
            label: '商品',
            component: Goods,
            data: {
                seller: this.seller
            }
        }, {
            label: '评论',
            component: Ratings,
            data: {
                seller: this.seller
            }
        }, {
            label: '商家',
            component: Seller,
            data: {
                seller: this.seller
            }
        }]
    }

    // methods
    _fetchSeller() {
        getSeller({
            id: this.seller.id
        }).then((seller) => {
            this.seller = seller
        })
    }

    created() {
        this._fetchSeller()
    }
}
</script>
<style lang="stylus">
  #app
    .tab-wrapper
      position: fixed
      top: 136px
      left: 0
      right: 0
      bottom: 0
</style>
