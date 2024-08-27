<template>
  <div class="node-container">
    <header :style="getHeaderStyle()">
      <p>代码块</p>
      <svg viewBox="0 0 1024 1024" width="20" height="20" class="delete-icon" @click="deleteNode">
        <path
          d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z">
        </path>
      </svg>
      <Handle id="in-^before^" type="target" :connectable="1" :position="Position.Left" :is-valid-connection="onConnect"
        class="handle"
        style="background-color: #c3ffb1;border-color: #c3ffb1;border-radius: 0;clip-path: polygon(70% 10%, 100% 50%, 70% 90%, 0% 90%, 0 50%, 0% 10%);left: 15px;">
      </Handle>
    </header>
    <main class="nodrag">
      <div class="left">
        <div class="handle-container">
          <Editor v-model="code" @resize="onResize" :style="{width: `${attrs.data.editorWidth}px`, height: `${attrs.data.editorHeight}px`}"></Editor>
        </div>
      </div>
    </main>
  </div>
  <div>
  </div>
</template>

<script setup>
import Editor from "../../../../editor/index.vue"
import { useAttrs, toRef } from 'vue';
import { Position, Handle, useVueFlow } from '@vue-flow/core';
const attrs = useAttrs();
const emits = defineEmits(['updateNodeInternals']);

/* 挂载对应输入属性 */
const attribute = {
    "code": "",
    "editorWidth": 0,
    "editorHeight": 0
}
for (let key in attribute) {
    if (!attrs.data.hasOwnProperty(key)) {
        attrs.data[key] = attribute[key];
    }
}

const code = toRef(attrs.data, "code");

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

function onResize(e) {
    if(Math.abs(e.width - attrs.data.editorWidth) < 100 || Math.abs(e.height - attrs.data.editorHeight) < 100){
        attrs.data.editorWidth = e.width;
        attrs.data.editorHeight = e.height;
        emits('updateNodeInternals');
    }
}
</script>