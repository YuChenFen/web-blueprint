<template>
    <path class="edge-path" :d="d" stroke-width="2"></path>
    <path class="edge-path" :d="d" stroke-width="20" stroke-opacity="0" style="stroke-dasharray: 0"></path>
</template>

<script setup>
import { computed, useAttrs } from 'vue';
const attrs = useAttrs();
const d = computed(() => {
    let startPoint = [attrs.sourceX, attrs.sourceY];
    let endPoint = [attrs.targetX, attrs.targetY];
    return `M${startPoint[0]},${startPoint[1]} C${startPoint[0]},${endPoint[1]} ${endPoint[0]},${startPoint[1]} ${endPoint[0]},${endPoint[1]}`;
})

</script>

<style scoped>
.edge-path {
    stroke: pink;
    fill: none;
}
</style>