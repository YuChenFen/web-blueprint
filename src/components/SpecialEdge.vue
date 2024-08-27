<template>
    <path class="edge-path" :d="d" stroke-width="2"></path>
    <path class="edge-path" :d="d" stroke-width="20" stroke-opacity="0" style="stroke-dasharray: 0"></path>
</template>

<script setup>
import { computed, useAttrs } from 'vue';
const attrs = useAttrs();
const deltaV = 20;  // 水平差
const deltaH = 10;  // 垂直差
const d = computed(() => {
    let source = {
        x: attrs.sourceNode.computedPosition.x,
        y: attrs.sourceNode.computedPosition.y,
        width: attrs.sourceNode.dimensions.width,
        height: attrs.sourceNode.dimensions.height
    };
    let target = {
        x: attrs.targetNode.computedPosition.x,
        y: attrs.targetNode.computedPosition.y,
        width: attrs.targetNode.dimensions.width,
        height: attrs.targetNode.dimensions.height
    };
    let startPoints = [[attrs.sourceX, attrs.sourceY]];
    let endPoints = [[attrs.targetX, attrs.targetY]];
    let points = [];
    let start = [attrs.sourceX, attrs.sourceY];
    let end = [attrs.targetX, attrs.targetY];
    if (attrs.sourceX > attrs.targetX) {
        startPoints.push([attrs.sourceX + deltaV, attrs.sourceY]);
        endPoints.unshift([attrs.targetX - deltaV, attrs.targetY]);
        if (attrs.sourceY < attrs.targetY) {
            startPoints.push([attrs.sourceX + deltaV, source.y + source.height + deltaH]);
            endPoints.unshift([attrs.targetX - deltaV, target.y - deltaH]);
        } else {
            startPoints.push([attrs.sourceX + deltaV, source.y - deltaH]);
            endPoints.unshift([attrs.targetX - deltaV, target.y + target.height + deltaH]);
        }
        start = startPoints[startPoints.length - 1];
        end = endPoints[0];
    }

    let mid = [
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2
    ];
    points.push(...startPoints);
    points.push([mid[0], start[1]]);
    points.push([mid[0], end[1]]);

    points.push(...endPoints);
    let d = "";
    points.forEach((p, i) => {
        if (i == 0) {
            d += `M ${p[0]} ${p[1]}`;
        } else {
            d += ` L ${p[0]} ${p[1]}`;
        }
    });
    return d;
})

</script>

<style scoped>
.edge-path {
    stroke: pink;
    fill: none;
}
</style>