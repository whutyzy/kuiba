<template>
    <div class="kuiba-site-mobile">
        <iframe :src="`./mobile.html#/${componentName}?language=${language}&platform=pc&replace=${replace}`"></iframe>
    </div>
</template>

<script>
export default {
    name: 'AppMobile',
    props: {
        componentName: {
            type: String
        },
        language: {
            type: String
        },
        replace: {
            type: String
        }
    }
}
</script>
<style lang="scss">
.kuiba-site-mobile {
    margin-top: 20px;
    width: 375px;
    height: calc(100vh - 100px);
    flex-shrink: 0;
    margin-right: 38px;
    overflow: hidden;
    box-shadow: 0 0 14px 6px #eee;
    border-radius: 2px;
}
</style>
