<template>
    <div id="app">
        <transition>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {}
    },
    created () {
    },
    mounted () {
    },
    methods: {},
    components: {}
  }
</script>

<style lang="scss">
    #app {
        background: #877;
        position: absolute;
        top:0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }
</style>
