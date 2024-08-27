<script setup>
defineOptions({ name: 'Header' });
import HeaderFile from "./HeaderFile.vue";
import HeaderView from "./HeaderView.vue";
import HeaderEdit from "./HeaderEdit.vue";
import HeaderOutput from "./HeaderOutput.vue";


</script>

<template>
    <div class="header-container">
        <div class="icon"></div>
        <div class="header-menu-button" tabIndex="0" role="button">
            <p>文件(F)</p>
            <HeaderFile class="header-menu"></HeaderFile>
        </div>
        <div class="header-menu-button" tabIndex="0" role="button">
            <p>编辑(E)</p>
            <HeaderEdit class="header-menu"></HeaderEdit>
        </div>
        <div class="header-menu-button" tabIndex="0" role="button">
            <p>查看(V)</p>
            <HeaderView class="header-menu"></HeaderView>
        </div>
        <div class="header-menu-button" tabIndex="0" role="button">
            <p>输出(O)</p>
            <HeaderOutput class="header-menu"></HeaderOutput>
        </div>
    </div>
</template>

<style scoped>
.header-container {
    height: 100%;
    background: #000000cf;
    display: flex;
    gap: 5px;
    align-items: center;
    padding: 0 15px;
    color: #fff;

    & .icon {
        background-image: url("/feng.svg");
        height: 20px;
        width: 22px;
        margin-right: 10px;
        opacity: 0.6;
    }

    & .header-menu-button {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 2px;
        user-select: none;
        position: relative;

        &:hover,
        &:focus {
            background-color: #79797970;
        }

        &:focus-within {
            & .header-menu {
                display: flex;
            }
        }

        & .header-menu {
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 1;
            display: none;
        }
    }
}
</style>