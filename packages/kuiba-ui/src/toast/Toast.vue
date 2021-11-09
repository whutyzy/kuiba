<template>
    <teleport to="body">
        <div class="kuiba-toast">Toast</div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'KuibaToast'
})
</script>

<style lang="scss">
@import '../toast.scss';
</style>
