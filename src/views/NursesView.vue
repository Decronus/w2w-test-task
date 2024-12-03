<template>
    <div class="nurses-view">
        <StaffTable :table-data="nurses" staff-type="nurse" />
    </div>
</template>

<style></style>
<script setup lang="ts">
import StaffTable from '@/components/StaffTable.vue';
import { useStaffStore } from '@/stores/staff.ts';

const staffStore = useStaffStore();
const { nurses } = staffStore;
</script>
