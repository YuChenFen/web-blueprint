<script setup>
import { ref } from 'vue';
import { useFlowStore } from '../../store/flowStore';
import { storeToRefs } from 'pinia';

const menuRef = ref(null);
const flowStore = useFlowStore();
const { setEdgeType } = flowStore;
const { edgeType } = storeToRefs(flowStore);

function onClick(type) {
    switch (type) {
        case "change-edge-type__straight":
            setEdgeType("special-straight");
            break;
        case "change-edge-type__step":
            setEdgeType("special-step");
            break;
        case "change-edge-type__bezier":
            setEdgeType("special-bezier");
            break;
    }
    menuRef.value.parentElement.blur();
}
</script>

<template>
    <div class="menu" ref="menuRef">
        <div class="menu-item">
            <div class="has-children-item-label">
                <p>边样式</p>
                <svg t="1723621107797" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4093" width="20" height="20">
                    <path
                        d="M384 354.24v315.616a34.112 34.112 0 0 0 52.96 28.448l226.656-150.752a42.688 42.688 0 0 0 0-71.072l-226.656-150.688A34.08 34.08 0 0 0 384 354.24z"
                        fill="#ccc" p-id="4094"></path>
                </svg>
            </div>
            <div class="menu children-menu">
                <div class="menu-item" @click="onClick('change-edge-type__straight')">
                    <div class="item-select">
                        <span>{{ edgeType === "special-straight" ? "√" : " " }}</span>
                        <p>直线</p>
                    </div>
                </div>
                <div class="menu-item" @click="onClick('change-edge-type__step')">
                    <div class="item-select">
                        <span>{{ edgeType === "special-step" ? "√" : " " }}</span>
                        <p>折线</p>
                    </div>
                </div>
                <div class="menu-item" @click="onClick('change-edge-type__bezier')">
                    <div class="item-select">
                        <span>{{ edgeType === "special-bezier" ? "√" : " " }}</span>
                        <p>贝塞尔曲线</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url("./headerMenu.css");

.item-select {
    display: flex;

    & span {
        min-width: 1rem;
    }
}
</style>