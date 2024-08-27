<template>
    <input type="checkbox" :checked="modelValue" @change="onInput">
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: [Boolean],
        default: ''
    }
});

const emit = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newValue) => {
        internalValue.value = newValue;
    }
);

function onInput(event) {
    emit('update:modelValue', event.target.checked);
}
</script>

<style scoped>
input {
    cursor: pointer;
}
</style>