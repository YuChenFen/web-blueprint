import Dom from './components/Dom.vue';
import DomAttribute from './components/DomAttribute.vue';
import DomText from './components/DomText.vue';

const NODE_HTML = {
    install(Vue) {
        if (!Vue.config.globalProperties.hasOwnProperty("$nodeComponentMap")) {
            Vue.config.globalProperties.$nodeComponentMap = {};
        }
        Vue.config.globalProperties.$nodeComponentMap = {
            ...Vue.config.globalProperties.$nodeComponentMap,
            'node-dom': Dom,
            'node-dom-attribute': DomAttribute,
            'node-dom-text': DomText,
        }
    },
};

export default NODE_HTML;