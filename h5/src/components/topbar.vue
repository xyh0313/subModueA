<template>
    <van-nav-bar
        title="首页"
        left-text=""
        left-arrow
        @click-left="onClickLeft"
    />
</template>

<script>
export default {
    name: 'topbar',

    methods: {

        onClickLeft() {
            if (this.$route.query.from && this.$route.query.from === 'wx') {
                // 跳转到微信
            } else {
                history.go(-1)
            }
        }
    }

}
</script>

<style>

</style>