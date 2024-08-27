<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useFileStore } from '../store/fileStore';
import AddFileSvg from '../components/svg/AddFileSvg.vue';
import FlowSvg from '../components/svg/FlowSvg.vue';
import FileContextMenu from '../components/contextMenu/FileContextMenu.vue';

const fileStore = useFileStore();
const { currentFile } = storeToRefs(fileStore);
const { fileList, addFile, openFile } = fileStore;
const isDragging = ref(false);
const width = ref(250);
let startX = 0;

// 文件上下文菜单
const fileContextmenuX = ref(-1);
const fileContextmenuY = ref(-1);
const selectFile = ref(null);
function onFileContextmenu(event, file) {
    event.preventDefault();
    let { clientX: x, clientY: y } = event;
    fileContextmenuX.value = x;
    fileContextmenuY.value = y;
    selectFile.value = file;
}

// 大小改变监听
function onMouseDown(event) {
    event.preventDefault();
    startX = event.clientX;
    isDragging.value = true;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
}
function onMouseUp() {
    isDragging.value = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
}
function onMouseMove(event) {
    if (isDragging.value) {
        const deltaX = event.clientX - startX;
        if (width.value + deltaX < window.innerWidth - 250 && width.value + deltaX > 150) {
            width.value += deltaX;
            startX = event.clientX;
        }
    }
}

</script>

<template>
    <div class="sidebar" :style="{ width: width + 'px' }">
        <div class="resize" @mousedown="onMouseDown"></div>
        <header>
            <p>资源管理器</p>
            <div class="icon-container">
                <div class="icon-item" @click="addFile">
                    <AddFileSvg class="icon"></AddFileSvg>
                    <p class="tip">新建文件</p>
                </div>
            </div>
        </header>
        <main>
            <div class="file-list">
                <div class="file-item" :class="{ active: currentFile === file }" v-for="(file, index) in fileList"
                    :key="index" @contextmenu="onFileContextmenu($event, file)" @dblclick="openFile(file)">
                    <FlowSvg class="icon"></FlowSvg>
                    <component :is="file.component"></component>
                </div>
            </div>
        </main>
        <footer></footer>
    </div>
    <teleport to="body">
        <FileContextMenu v-model:x="fileContextmenuX" v-model:y="fileContextmenuY" :file="selectFile">
        </FileContextMenu>
    </teleport>
</template>

<style scoped>
.sidebar {
    position: relative;
    width: 250px;
    height: 100%;
    user-select: none;
    color: #ffffff;
    background-color: #252525;
    fill: #ffffff;

    & .resize {
        height: 100%;
        width: 10px;
        background: #a3ddffbb;
        position: absolute;
        top: 0;
        right: 0;
        cursor: ew-resize;
        opacity: 0;
        transform: translateX(5px);
        z-index: 1;
        transition: opacity 0.5s ease-in-out 0.2s;

        &:hover,
        &:active {
            opacity: 1;
        }

    }

    & header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 10px 10px 10px 15px;
        border-bottom: 1px solid #636363;
        cursor: pointer;

        & .icon-container {
            display: flex;
            align-items: center;
            opacity: 0;
            transition: opacity 0.5s cubic-bezier(0.445, 0.050, 0.550, 0.950);

            & .icon-item {
                display: flex;
                align-items: center;
                position: relative;

                & .icon {
                    width: 15px;
                    height: 15px;
                    padding: 2px;
                    border-radius: 2px;

                    &:hover {
                        background-color: #7979792a;
                    }
                }

                & .tip {
                    position: absolute;
                    font-size: 0.8rem;
                    border: 1px solid #6a6a6a;
                    border-radius: 2px;
                    padding: 2px 10px;
                    white-space: nowrap;
                    top: 100%;
                    left: 50%;
                    transform: translate(-50%, 5px);
                    z-index: -1;
                    background: #292929cc;
                    color: aliceblue;
                    /* display: none; */
                    opacity: 0;
                }

                &:hover .tip {
                    /* display: block; */
                    z-index: 1;
                    opacity: 1;
                    transition: opacity 0.5s ease-in-out 0.5s;
                }
            }
        }

        &:hover .icon-container {
            opacity: 1;
        }
    }

    & main {
        overflow-y: auto;
        height: calc(100% - 50px);

        & .file-list {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            width: 100%;

            & .file-item {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 10px;
                box-sizing: border-box;
                width: 100%;
                padding: 5px 15px;
                cursor: pointer;

                & .icon {
                    width: 1rem;
                    height: 1rem;
                    flex: 0 0 1rem;
                }

                & :deep(.file-name) {
                    font-size: 1rem;
                    font-weight: 100;
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                & :deep(.rename-input) {
                    position: relative;
                    flex: 1;

                    :deep(& .file-input) {
                        width: 100%;
                        box-sizing: border-box;
                        height: 100%;
                        outline: none;
                        padding: 2px 5px;
                        border: 1px solid rgb(0, 55, 255);
                    }

                    :deep(& .file-input-tip) {
                        position: absolute;
                        box-sizing: border-box;
                        width: 100%;
                        top: 100%;
                        left: 0;
                        padding: 5px 10px;
                        background-color: #e6404547;
                        border: 1px solid #f00;
                        border-top-width: 0px;
                        color: #ffffff;
                        display: none;
                    }
                }

                &:hover {
                    background-color: #79797925;
                }

                &.active {
                    background-color: #dddddd2b;
                }
            }
        }
    }
}
</style>