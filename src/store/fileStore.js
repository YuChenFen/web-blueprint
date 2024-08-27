import { defineStore } from 'pinia'
import { ref, h, toRaw, computed, watch } from 'vue'

export const useFileStore = defineStore('flie', () => {
    const fileList = ref([]);
    const currentFile = ref();
    const currentFileType = ref(localStorage.getItem('currentFileType') || 'javascript');
    watch(() => currentFileType.value, (newValue) => {
        localStorage.setItem('currentFileType', newValue);
        console.log("语言已切换到：", newValue);
    })
    let isRename = false;

    function addFile(open = true) {
        if (isRename) {
            return;
        }
        let file = {
            type: 'file',
            content: '{"nodes":[],"edges":[]}',
            component: ref(h('p', { class: "file-name" }))
        }
        fileList.value.push(file)
        renameFile(file, open)
    }

    function renameFile(file, open = false) {
        file = toRaw(file);
        isRename = true;
        let renameInput = h("div", { class: "rename-input" }, [
            h("input", {
                class: "file-input",
                value: file.name || "",
                onVnodeMounted: (vnode) => {
                    vnode.el.focus();
                },
                onInput: (event) => {
                    let flag = false;
                    let newName = event.target.value;
                    let tip = event.target.nextElementSibling;
                    if (fileList.value.filter(file => file.name == newName).length !== 0 && newName !== file.name) {
                        tip.innerText = `此位置已存在文件或文件夹 ${newName} ,请选择其他名称`;
                        flag = true;
                    } else if (newName === "") {
                        tip.innerText = `必须提供文件或文件夹名`;
                        flag = true;
                    }
                    if (flag) {
                        tip.style.display = 'block';
                        event.target.style.borderColor = 'red';
                    } else {
                        tip.style.display = 'none';
                        event.target.style.borderColor = 'rgb(0, 55, 255)';
                    }
                },
                onkeydown: (event) => {
                    if (event.key === "Enter") {
                        event.target.blur();
                    }
                },
                onblur: (event) => {
                    let newName = event.target.value;
                    if (file.name === void 0 && newName === "") {
                        removeFile(file);
                        isRename = false;
                        return;
                    }
                    if (fileList.value.filter(file => file.name == newName).length !== 0 && newName !== file.name) {
                        event.target.focus();
                        return;
                    }
                    file.name = newName;
                    file.component.value = h('p', { class: "file-name", innerText: file.name });
                    if (open) {
                        openFile(file);
                    }
                    isRename = false;
                }
            }),
            h("p", { class: "file-input-tip" })
        ]);
        file.component.value = renameInput;
    }

    function removeFile(file) {
        let index = fileList.value.indexOf(file);
        if (index !== -1) {
            fileList.value.splice(index, 1);
        }
    }

    function openFile(file) {
        file = toRaw(file);
        if (file.type === 'file') {
            currentFile.value = file;
        }
        let fileNameBlock = file.name.split(".")
        let type = fileNameBlock[fileNameBlock.length - 1];
        if (type === 'html') {
            currentFileType.value = 'html';
        } else if (type === 'css') {
            currentFileType.value = 'css';
        } else if (type === 'js') {
            currentFileType.value = 'javascript';
        }
    }

    function saveFile(content, file = currentFile.value) {
        if (!file) {
            console.warn('没有找到保存文件（！当前没有打开文件）');
            return;
        }
        file.content = content;
        console.log('保存成功');
    }

    /* 文件流 */
    async function saveAsFile(content, file = currentFile.value) {
        if (!file) {
            console.warn('没有找到保存文件（！当前没有打开文件）');
            return;
        }
        try {
            let fileHandle = await window.showSaveFilePicker({
                suggestedName: file.name,
                types: [
                    {
                        description: 'JSON',
                        accept: {
                            'application/json': ['.json'],
                        },
                    },
                ],
            });
            let writable = await fileHandle.createWritable();
            await writable.write(content);
            await writable.close();
            console.log('保存成功');
        } catch (e) {
            console.error("另存为文件失败...", e);
        }
    }

    async function loadFile(flowParser) {
        try {
            let fileHandle = await window.showOpenFilePicker();
            if (fileHandle.length > 0) {
                let file = fileHandle[0];
                let fileContent = await file.getFile();
                let content = await fileContent.text();
                let fileName = file.name;
                if (flowParser) {
                    content = flowParser(content);
                }
                fileList.value.push({
                    type: 'file',
                    name: fileName,
                    content: content,
                    component: ref(h('p', { class: "file-name", innerText: fileName }))
                });
                console.log(`导入${fileName}成功`);
            }
        } catch (e) {
            console.error("加载文件失败...", e);
        }
    }

    return { fileList, currentFile, currentFileType, loadFile, addFile, removeFile, renameFile, openFile, saveFile, saveAsFile };
})