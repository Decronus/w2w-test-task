<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderVue from '@/components/HeaderVue.vue';
</script>

<template>
    <div id="app">
        <HeaderVue />

        <RouterView />
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
