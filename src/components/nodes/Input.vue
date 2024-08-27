<template>
    <div class="input-wrapper">
        <input :value="internalValue" @input="onInput" @keydown="onKeyDown" :placeholder="placeholder"
            :disabled="disabled">
        <ul v-show="promptWords.length != 0 && currentItem != -1">
            <li v-for="word, index in promptWords" :key="word" @click="onInput({ target: { value: word } })"
                :class="{ active: currentItem === index }">{{ word }}</li>
        </ul>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
    promptWords: {
        type: Array,
        default: () => [],
    }
});

const emit = defineEmits(['update:modelValue']);

const promptWords = ref([]);
const currentItem = ref(-1);
const internalValue = ref(props.modelValue);

function onKeyDown(event) {
    if (event.key == 'ArrowDown') {
        event.preventDefault();
        currentItem.value = (currentItem.value + 1) % promptWords.value.length;
    } else if (event.key == 'ArrowUp') {
        event.preventDefault();
        currentItem.value = (currentItem.value - 1 + promptWords.length) % promptWords.value
            .length;
    } else if (event.key == 'Enter' && promptWords.length != -1) {
        event.preventDefault();
        onInput({ target: { value: promptWords.value[currentItem.value] } });
        currentItem.value = -1;
    }
}

watch(
    () => props.modelValue,
    (newValue) => {
        internalValue.value = newValue;
    }
);

function onInput(event) {
    emit('update:modelValue', event.target.value);
    if (props.promptWords.length != 0 && event.target.value?.trim() != '') {
        let reg = new RegExp(`^${event.target.value}`);
        promptWords.value = props.promptWords.filter((word) => reg.test(word));
        currentItem.value = 0;
    } else {
        promptWords.value = [];
        currentItem.value = -1;
    }
}
</script>

<style scoped>
.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 60px;
    height: 20px;
}

input {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 2px 5px;
    border-radius: 2px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
    font-size: 0.6rem;
    border: none;
    outline: none;
}

input:focus {
    background-color: #cdcdcd;
}

ul {
    position: absolute;
    top: 100%;
    z-index: 1;
    color: black;
    list-style: none;
    font-size: 0.6rem;
    min-width: 100%;
    background-color: #f8f8f8;
    border-radius: 2px;
    padding: 2px 0;
}

li {
    padding: 2px 5px;
    cursor: pointer;
    margin: 1px 5px;
    border-radius: 2px;
    white-space: nowrap;
}

li:hover,
li.active {
    background-color: #cdcdcd;
}
</style>