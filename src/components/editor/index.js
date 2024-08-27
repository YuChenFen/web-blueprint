import loader from '@monaco-editor/loader';
import * as monaco from 'monaco-editor';

loader.config({ monaco });
loader.config({
    paths: {
        vs: '../../../node_modules/monaco-editor/min/vs',
    },
    'vs/nls': {
        availableLanguages: {
            '*': 'zh-cn',
        },
    }
})
let _monaco = null;

async function getMonaco() {
    if (!_monaco) {
        _monaco = await loader.init();
        addEditorAction(_monaco);
    }
    return _monaco;
}

function addEditorAction(monaco) {
    let { editor, KeyMod, KeyCode } = monaco;
    editor.addEditorAction({
        id: "F1",
        label: "F1",
        contextMenuOrder: 1,
        contextMenuGroupId: "navigation",
        keybindings: [KeyMod.chord(KeyCode.F1)],
        run: (e) => {
            e._domElement.requestFullscreen();
        }
    })
}





export default getMonaco;