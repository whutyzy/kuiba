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
    position: fixed;
    right: 30px;
    top: 88px;
    width: 375px;
    height: 725px;
    flex-shrink: 0;

    overflow: hidden;
    box-shadow: 0 0 14px 6px #eee;
    border-radius: 4px;
}
</style>
