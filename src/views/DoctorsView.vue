<template>
    <div class="doctors-view">
        <StaffTable :table-data="doctors" staff-type="doctor" />
    </div>
</template>

<script setup lang="ts">
import StaffTable from '@/components/StaffTable.vue';
import { useStaffStore } from '@/stores/staff.ts';

const staffStore = useStaffStore();
const { doctors } = staffStore;
</script>
