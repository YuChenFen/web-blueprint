import CssNode from "./components/CssNode.vue";

const NODE_CSS = {
    install(Vue) {
        if (!Vue.config.globalProperties.hasOwnProperty("$nodeComponentMap")) {
            Vue.config.globalProperties.$nodeComponentMap = {};
        }
        Vue.config.globalProperties.$nodeComponentMap = {
            ...Vue.config.globalProperties.$nodeComponentMap,
            'node-css-node': CssNode,
        }
    },
};

export default NODE_CSS;