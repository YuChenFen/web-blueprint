import SpecialStepEdge from "./components/SpecialStepEdge.vue";
import SpecialStraightEdge from "./components/SpecialStraightEdge.vue";
import SpecialBezierEdge from "./components/SpecialBezierEdge.vue";

const EDGE = {
    install(Vue) {
        Vue.component("SpecialStepEdge", SpecialStepEdge);
        Vue.component("SpecialStraightEdge", SpecialStraightEdge);
        Vue.component("SpecialBezierEdge", SpecialBezierEdge);
    },
};

export default EDGE;