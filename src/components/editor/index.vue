<template>
    <div ref="monacoEditorContainerRef" id="monaco-editor-container"></div>
</template>

<script setup>
import "./worker";
import getMonaco from ".";
import { onBeforeUnmount, onMounted, ref } from 'vue';
const monacoEditorContainerRef = ref(null);
const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    }
})
const emits = defineEmits(['update:modelValue', 'resize']);

let observer;
onMounted(async () => {
    // 添加大小监听
    observer = new ResizeObserver((e) => {
        emits("resize", e[0].contentRect);
    });
    observer.observe(monacoEditorContainerRef.value);

    let { editor } = await getMonaco();
    let theme = "dark";
    let model = editor.createModel(props.modelValue, "javascript");

    // 缩略图
    const minimap = {
        enabled: false,      // 显示缩略图
        autohide: false,    // true时鼠标悬浮显示
        scale: 1            // 缩放倍数
    }

    let Editor = editor.create(monacoEditorContainerRef.value, {
        theme: theme,
        autoIndex: true,
        model: model,
        tabCompletion: 'on',
        cursorSmoothCaretAnimation: false,   // 光标平滑动画
        formatOnPaste: true,                // 粘贴时格式化代码
        mouseWheelZoom: true,               // 滚轮缩放
        folding: true,                      //代码折叠
        scrollBeyondLastLine: false,         // 允许滚轮超过最后一行
        autoClosingBrackets: 'always',      // 启用自动闭合括号
        autoClosingOvertype: 'always',      // 启用在覆盖模式下自动闭合括号
        autoClosingQuotes: 'always',        // 启用自动闭合引号
        automaticLayout: true,              // 控制编辑器是否自动调整其布局以适应其容器的大小
        cursorWidth: 2,                     // 光标宽度
        fontSize: 12,                       // 设置字体大小
        codeLensFontSize: 12,               // 代码提示字体大小
        lineNumbers: 'off',                  // 控制行号显示的方式。可以是'on'、'off'或'relative'。
        lineNumbersMinChars: 3,             // 用于控制行号的最小字符数。可以设置为任何数字值。
        minimap: minimap,                   // 缩略图配置
        contextmenu: false,                 // 禁用右键菜单
        padding: {
            top: "10px",
            bottom: "5px",
            right: "5px",
        },                                  // 用于设置编辑器的填充
    });
    Editor.onDidChangeModelContent((e) => {
        emits("update:modelValue", Editor.getValue());
    });
})

onBeforeUnmount(() => {
    if (observer) {
        observer.unobserve(monacoEditorContainerRef.value);
    }
})
</script>

<style scoped>
#monaco-editor-container {
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 100px;
    overflow: hidden;
    resize: both;
}
</style>