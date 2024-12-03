<template>
    <el-dialog
        class="add-staff-modal"
        :model-value="modelValue"
        :title="title"
        width="500"
        @open="initForm"
        @close="emit('update:modelValue', false)"
        @closed="clearForm"
    >
        <div class="add-staff-modal__form">
            <el-input v-model="form.lastName" placeholder="Фамилия" :formatter="formatInput" />
            <el-input v-model="form.firstName" placeholder="Имя" :formatter="formatInput" />
            <el-input v-model="form.middleName" placeholder="Отчество" :formatter="formatInput" />

            <el-select v-model="form.department" placeholder="Выберите отделение">
                <el-option v-for="item in departmentsOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>

            <template v-for="field in staffTypeConfig[staffType].additionalFields">
                <el-checkbox v-model="form[field.key]" :label="field.label" />
            </template>
        </div>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="emit('update:modelValue', false)">Отмена</el-button>
                <el-button type="primary" :disabled="!formIsFilled" @click="handleOk">{{ okText }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { toRefs, computed, reactive } from 'vue';
import { departmentsOptions } from '@/utils/constants.ts';
import type { Staff, StaffType } from '@/types/Staff.ts';
import { useStaffStore } from '@/stores/staff.ts';
import { storeToRefs } from 'pinia';

interface Props {
    modelValue: boolean;
    type: 'add' | 'edit';
    staffType: StaffType;
    editingStaff?: Staff;
}

const props = defineProps<Props>();
const { modelValue, type, staffType, editingStaff } = toRefs(props);

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();

const staffStore = useStaffStore();
const { addDoctor, editDoctor, addNurse, editNurse } = staffStore;

const form = reactive<Record<string, any>>({
    id: -1,
    firstName: '',
    middleName: '',
    lastName: '',
    department: '',
});

const formIsFilled = computed<boolean>(() => form.firstName && form.lastName && form.department);

const okText = computed(() => (type.value === 'add' ? 'Добавить' : 'Сохранить'));
const title = computed(() => {
    const titleMap: Record<StaffType, string> = {
        doctor: 'доктора',
        nurse: 'медсестру',
    };
    let titleString = '';
    titleString = type.value === 'add' ? 'Добавить ' : 'Редактировать ';
    titleString += titleMap[staffType.value];
    return titleString;
});

function handleOk() {
    const staffActionsMap: Record<StaffType, any> = {
        doctor: {
            add: addDoctor,
            edit: editDoctor,
        },
        nurse: {
            add: addNurse,
            edit: editNurse,
        },
    };

    const staff = staffActionsMap[staffType.value];
    console.log('form', form);
    staff[type.value](form);

    emit('update:modelValue', false);
}

function initForm() {
    if (type.value === 'edit' && editingStaff.value) {
        form.id = editingStaff.value.id;
        form.firstName = editingStaff.value.firstName;
        form.middleName = editingStaff.value.middleName;
        form.lastName = editingStaff.value.lastName;
        form.department = editingStaff.value.department;
    }

    staffTypeConfig[staffType.value].additionalFields.forEach((field) => {
        form[field.key] = editingStaff.value?.[field.key as keyof Staff];
    });
}

function clearForm() {
    form.id = -1;
    form.firstName = '';
    form.middleName = '';
    form.lastName = '';
    form.department = '';
    staffTypeConfig[staffType.value].additionalFields.forEach((field) => {
        form[field.key] = '';
    });
}

const staffTypeConfig = {
    doctor: {
        additionalFields: [{ key: 'isHead', type: 'checkbox', label: 'Назначить заведующим отделения' }],
    },
    nurse: {
        additionalFields: [],
    },
};

function formatInput(value: string) {
    return value.replace(/[^a-zA-Zа-яА-ЯёЁ\-]/g, '');
}
</script>

<style scoped>
.add-staff-modal__form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 32px;
}
</style>
