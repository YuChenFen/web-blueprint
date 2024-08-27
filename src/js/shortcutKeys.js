import { useVueFlow } from "@vue-flow/core";
import { useFileStore } from "../store/fileStore";
import { useFlowStore } from "../store/flowStore";

export default {
    install: () => {
        const { addNodes, addEdges, removeNodes, removeEdges, toObject } = useVueFlow();
        const { addFile, saveFile, saveAsFile } = useFileStore();
        const { cutSelectionObject, copySelectionObject, pasteSelectionObject } = useFlowStore();
        window.addEventListener("keydown", (event) => {
            if (event.code === "KeyS" && event.ctrlKey) {
                event.preventDefault();
                if (event.shiftKey) {
                    saveAsFile(JSON.stringify(toObject()));
                } else {
                    saveFile(JSON.stringify(toObject()));
                }
            } else if (event.code === "KeyN" && event.ctrlKey) {
                event.preventDefault();
                addFile();
            } else if (event.code === "KeyX" && event.ctrlKey) {
                event.preventDefault();
                cutSelectionObject(removeNodes, removeEdges);
            } else if (event.code === "KeyC" && event.ctrlKey) {
                event.preventDefault();
                copySelectionObject();
            } else if (event.code === "KeyV" && event.ctrlKey) {
                event.preventDefault();
                pasteSelectionObject(addNodes, addEdges);
            }
        })
    }
}