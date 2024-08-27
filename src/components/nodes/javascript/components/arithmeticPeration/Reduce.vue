<template>
    <div class="node-container">
        <header :style="getHeaderStyle()">
            <p>减法</p>
            <svg viewBox="0 0 1024 1024" width="20" height="20" class="delete-icon" @click="deleteNode">
                <path
                    d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z">
                </path>
            </svg>
            <Handle id="in-^before^" type="target" :connectable="1" :position="Position.Left"
                :is-valid-connection="onConnect" class="handle"
                style="background-color: #c3ffb1;border-color: #c3ffb1;border-radius: 0;clip-path: polygon(70% 10%, 100% 50%, 70% 90%, 0% 90%, 0 50%, 0% 10%);left: 15px;">
            </Handle>
        </header>
        <main class="nodrag">
            <div class="left">
                <div class="handle-container">
                    <Handle id="in-value1" type="target" :connectable="1" :position="Position.Left"
                        :is-valid-connection="onConnect" class="handle"
                        style="background-color: #fff;border-color: #fff;border-radius: 0;">
                        <p>1</p>
                    </Handle>
                    <div class="handle"></div>
                    <Input v-model="value1" placeholder="被减数" :disabled="attrs.data.value1Handle"></Input>
                </div>
                <div class="handle-container">
                    <Handle id="in-value2" type="target" :connectable="1" :position="Position.Left"
                        :is-valid-connection="onConnect" class="handle"
                        style="background-color: #fff;border-color: #fff;border-radius: 0;">
                        <p>1</p>
                    </Handle>
                    <div class="handle"></div>
                    <Input v-model="value2" placeholder="减数" :disabled="attrs.data.value2Handle"></Input>
                </div>
            </div>
            <div class="right">
                <div class="handle-container">
                    <Handle id="out-output" type="source" :position="Position.Right" :is-valid-connection="onConnect"
                        class="handle" style="background-color: #fff;border-color: #fff;border-radius: 0;">
                        <p>N</p>
                    </Handle>
                    <div class="handle"></div>
                    <Text text="差"></Text>
                </div>
            </div>
        </main>
    </div>
    <div>
    </div>
</template>

<script setup>
import Input from '../../../Input.vue';
import Text from '../../../Text.vue';
import { useAttrs, toRef, computed } from 'vue';
import { Position, Handle, useVueFlow } from '@vue-flow/core';
const attrs = useAttrs();

/* 挂载对应输入属性 */
const attribute = {
    "value1": "",
    "value1Handle": false,
    "value2": "",
    "value2Handle": false
}
for (let key in attribute) {
    if (!attrs.data.hasOwnProperty(key)) {
        attrs.data[key] = attribute[key];
    }
}


const value1 = toRef(attrs.data, "value1");
const value2 = toRef(attrs.data, "value2");

attrs.data.output = computed(() => {
    return `(${value1.value} - ${value2.value})`
});


const { removeNodes } = useVueFlow();

const width = attrs.data.width || 150;

function deleteNode() {
    removeNodes(attrs.id);
}

function getHeaderStyle() {
    return {
        "min-width": `${width}px`,
        "background-image": `linear-gradient(to right, ${attrs.data.titleBarColor[0]}, ${attrs.data.titleBarColor[1]})`
    }
}

function onConnect(connection) {
    // 连接验证

    return true;
}
</script>