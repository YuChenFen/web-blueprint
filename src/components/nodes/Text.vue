<template>
    <p class="node-text">{{ text }}</p>
</template>

<script setup>
defineProps({
    text: {
        default: '',
        required: false,
    }
})
</script>

<style scoped>
.node-text{
    line-height: 14px;
    font-size: 0.6em;
    color: #e3e3e3;
    white-space: nowrap;
    transform: translateY(-1px);
}
</style>