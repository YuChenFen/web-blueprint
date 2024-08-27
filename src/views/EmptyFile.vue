<template>
    <div>
        <BoxEmpty style="width: 300px;height: 300px;fill: #51515160;"></BoxEmpty>
        <h1>未打开文件</h1>
    </div>
</template>

<script setup>
import BoxEmpty from "../components/svg/BoxEmpty.vue"
</script>

<style scoped>
div {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    background-color: #1a1a1a;
    color: #b6b6b699;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    user-select: none;
}
</style>