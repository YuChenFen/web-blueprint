<template>
    <div :style="{ ...attrs.data.style, width: `${attrs.data.width}px`, height: `${attrs.data.height}px`, backgroundColor: color }"
        class="node-container">
    </div>
</template>

<script setup>
import { computed, useAttrs } from 'vue';
const attrs = useAttrs();
const h = Math.floor(Math.random() * 360);
const color = `hsla(${h}, 90%, 85%, .5)`;
if (attrs.data.hasOwnProperty("width")) {
    attrs.dimensions.width = attrs.data.width;
}
if (attrs.data.hasOwnProperty("height")) {
    attrs.dimensions.height = attrs.data.height;
}
attrs.data.width = computed(() => {
    return attrs.dimensions.width;
});
attrs.data.height = computed(() => {
    return attrs.dimensions.height;
});
</script>

<style scoped>
.node-container {
    box-sizing: border-box;
    border: 1px solid rgb(205, 205, 205);
    pointer-events: none;
}
</style>