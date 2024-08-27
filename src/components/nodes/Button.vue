<template>
    <button v-bind="attrs">
        <slot></slot>
    </button>
</template>

<script setup>
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<style scoped>
button{
    background-color: #fff;
    font-size: 0.5rem;
    padding: 4px 10px;
    border: 1px solid #ccc;
    border-radius: 2px;
    cursor: pointer;
    box-shadow: none;
    white-space: nowrap;
}
button:hover{
    background-color: #e3e3e3;
}
button:active{
    background-color: #c0c0c0;
}
</style>