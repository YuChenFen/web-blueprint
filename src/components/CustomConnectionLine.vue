<template>
    <g>
        <path class="vue-flow__connection animated" fill="none" stroke="pink" :stroke-width="2.5"
            :d="`M${sourceX},${sourceY} L ${(sourceX + targetX) / 2} ${sourceY} L ${(sourceX + targetX) / 2} ${targetY} L ${targetX},${targetY}`" />

        <circle :cx="targetX" :cy="targetY" fill="#fff" :r="4" stroke="pink" :stroke-width="1.5" />
    </g>
</template>

<script setup>
const props = defineProps({
    sourceX: {
        type: Number,
        required: true,
    },
    sourceY: {
        type: Number,
        required: true,
    },
    targetX: {
        type: Number,
        required: true,
    },
    targetY: {
        type: Number,
        required: true,
    },
});
</script>