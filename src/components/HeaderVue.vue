<template>
    <header class="header">
        <router-link to="/">Доктора</router-link>
        <router-link to="/nurses">Медсестры</router-link>
    </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.header {
    background-color: #f8f8f8;
    padding: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    gap: 24px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 10;

    a {
        text-decoration: none;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        color: #222222;

        &:hover {
            color: #1890ff;
        }
    }

    .router-link-active {
        color: #1890ff !important;
    }
}
</style>
