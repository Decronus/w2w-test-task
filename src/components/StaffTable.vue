<template>
    <div class="staff-table">
        <div class="staff-table__toolbar">
            <h3>{{ title }}</h3>
            <el-button type="primary" @click="handleAdd">+ Добавить</el-button>
        </div>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="Id" width="80" sortable />

            <el-table-column label="ФИО" width="300" sortable :sort-method="fioSortMethod">
                <template #default="{ row }">
                    <div class="staff-table__fio-row">
                        <el-tooltip v-if="row.isHead" content="Заведующий отделением">
                            <StarIcon />
                        </el-tooltip>
                        <span>{{ row.firstName }} {{ row.middleName }} {{ row.lastName }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="Департамент" sortable :sort-method="departmentSortMethod">
                <template #default="{ row }">
                    <el-tag :type="departmentTagsColors[row.department as Department]">
                        {{ row.department }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column width="60">
                <template #default="{ row }">
                    <el-dropdown placement="bottom-end">
                        <MoreButton />
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="handleEdit(row)"> Редактировать</el-dropdown-item>
                                <el-dropdown-item style="color: #af0707" @click="handleDelete(row.id)">
                                    Удалить
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <AddStaffModal
        v-model="isAddStaffModalVisible"
        :type="modalType"
        :staff-type="staffType"
        :editing-staff="editingStaff"
    />
</template>

<script setup lang="ts">
import { ref, computed, toRefs } from 'vue';
import type { Department, Staff, StaffType } from '@/types/Staff.ts';
import StarIcon from '@/components/icons/StarIcon.vue';
import MoreButton from '@/components/buttons/MoreButton.vue';
import AddStaffModal from '@/components/modals/AddStaffModal.vue';
import { useStaffStore } from '@/stores/staff.ts';

interface Props {
    tableData: Staff[];
    staffType: StaffType;
}

const props = defineProps<Props>();
const { tableData, staffType } = toRefs(props);

const staffStore = useStaffStore();
const { deleteDoctor, deleteNurse } = staffStore;

const title = computed(() => {
    const titleMap: Record<StaffType, string> = {
        doctor: 'Доктора',
        nurse: 'Медсестры',
    };
    return titleMap[staffType.value];
});

const isAddStaffModalVisible = ref<boolean>(false);

const departmentTagsColors: Record<Department, string> = {
    хирургия: 'primary',
    кардиология: 'danger',
};

const modalType = ref<'add' | 'edit'>('add');
const editingStaff = ref<Staff>();

function handleAdd() {
    modalType.value = 'add';
    isAddStaffModalVisible.value = true;
}

function handleEdit(row: Staff) {
    editingStaff.value = row;
    modalType.value = 'edit';
    isAddStaffModalVisible.value = true;
}

function handleDelete(id: number) {
    const staffActionsMap: Record<StaffType, any> = {
        doctor: deleteDoctor,
        nurse: deleteNurse,
    };
    staffActionsMap[staffType.value](id);
}

function departmentSortMethod(a: Staff, b: Staff) {
    if (a.department < b.department) {
        return -1;
    }
    if (a.department > b.department) {
        return 1;
    }
    return 0;
}

function fioSortMethod(a: Staff, b: Staff) {
    const fullNameA = `${a.firstName} ${a.middleName} ${a.lastName}`;
    const fullNameB = `${b.firstName} ${b.middleName} ${b.lastName}`;

    if (fullNameA < fullNameB) {
        return -1;
    }
    if (fullNameA > fullNameB) {
        return 1;
    }
    return 0;
}
</script>

<style lang="scss" scoped>
.staff-table {
    &__toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    &__fio-row {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    &__edit {
        color: #1890ff;
        cursor: pointer;
    }
}
</style>
