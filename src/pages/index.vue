<template>
    <div id="index">
        <div class="header"></div>
        <mt-header title="台湾是中国的">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div>
            <div v-for="search in searchs">{{search.nameZh}}</div>
        </div>
    </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import * as types from '@/store/types'
  export default {
    name: 'Index',
    data () {
      return {
      }
    },
    created () {
    },
    computed: {
      searchs () {
        return this.commonStore.search_data
      },
      ...mapState(['commonStore'])
    },
    mounted () {
      this.conPC()
      this.SEARCH_MUSIC({page: 1})
    },
    methods: {
      conPC () {
        // console.log('热热')
        // console.log(process.env)
      },
      ...mapActions([types.SEARCH_MUSIC])
    },
    components: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../assets/css/utils";
    .header {
        background: #291;
        width: 100%;
        height: 1.56rem;
        display: none;
    }
    .mint-header {
        height: px2em(40px, 37.5px);
        font-size: px2em(14px, 37.5px);
        .mintui {
            font-size: px2em(16px, 37.5px);
        }
        .mint-header-title {
            margin: 0;
            align-items:center;
            justify-content:center;
            height: 100%;
            display: flex;
        }
    }
</style>