<template>
    <path class="edge-path" :d="d" stroke-width="2"></path>
    <path class="edge-path" :d="d" stroke-width="20" stroke-opacity="0" style="stroke-dasharray: 0"></path>
</template>

<script setup>
import { computed, useAttrs } from 'vue';
const attrs = useAttrs();
const d = computed(() => {
    return `M ${attrs.sourceX} ${attrs.sourceY} L ${attrs.targetX} ${attrs.targetY}`;
})

</script>

<style scoped>
.edge-path {
    stroke: pink;
    fill: none;
}
</style>