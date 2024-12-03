import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import type { Doctor, Nurse } from '@/types/Staff.ts';

export const useStaffStore = defineStore('staff', () => {
    const doctors = ref<Doctor[]>([
        {
            id: 1,
            firstName: 'Иван',
            lastName: 'Иванов',
            middleName: 'Алексеевич',
            department: 'кардиология',
            isHead: false,
        },
        {
            id: 2,
            firstName: 'Мария',
            lastName: 'Петрова',
            middleName: 'Сергеевна',
            department: 'хирургия',
            isHead: false,
        },
        {
            id: 3,
            firstName: 'Алексей',
            lastName: 'Смирнов',
            middleName: 'Владимирович',
            department: 'кардиология',
            isHead: false,
        },
        {
            id: 4,
            firstName: 'Елена',
            lastName: 'Данилова',
            middleName: 'Петровна',
            department: 'хирургия',
            isHead: true,
        },
        {
            id: 5,
            firstName: 'Дмитрий',
            lastName: 'Кузнецов',
            middleName: 'Михайлович',
            department: 'кардиология',
            isHead: false,
        },
        {
            id: 6,
            firstName: 'Анна',
            lastName: 'Лебедева',
            middleName: 'Ивановна',
            department: 'хирургия',
            isHead: false,
        },
        {
            id: 7,
            firstName: 'Сергей',
            lastName: 'Новиков',
            middleName: 'Анатольевич',
            department: 'кардиология',
            isHead: true,
        },
        {
            id: 8,
            firstName: 'Ольга',
            lastName: 'Морозова',
            middleName: 'Александровна',
            department: 'хирургия',
            isHead: false,
        },
        {
            id: 9,
            firstName: 'Владимир',
            lastName: 'Федоров',
            middleName: 'Вячеславович',
            department: 'кардиология',
            isHead: false,
        },
        {
            id: 10,
            firstName: 'Светлана',
            lastName: 'Томилова',
            middleName: 'Владимировна',
            department: 'хирургия',
            isHead: false,
        },
    ]);

    function addDoctor(doctor: Doctor) {
        if (doctor.isHead) {
            const prevHead = doctors.value.find((d) => {
                return d.isHead && d.department === doctor.department && d.id !== doctor.id;
            });
            if (!prevHead) return;
            prevHead.isHead = false;
        }
        const maxId = doctors.value.reduce((max, d) => (d.id > max ? d.id : max), 0);
        doctors.value.unshift({ ...doctor, id: maxId + 1 });
    }

    function editDoctor(doctor: Doctor) {
        if (doctor.isHead) {
            const prevHead = doctors.value.find((d) => {
                return d.isHead && d.department === doctor.department && d.id !== doctor.id;
            });
            if (!prevHead) return;
            prevHead.isHead = false;
        }
        const index = doctors.value.findIndex((d) => d.id === doctor.id);
        if (index === -1) return;
        doctors.value[index] = { ...doctor };
    }

    function deleteDoctor(id: number) {
        const index = doctors.value.findIndex((d) => d.id === id);
        if (index === -1) return;
        doctors.value.splice(index, 1);
    }

    const nurses = ref<Nurse[]>([
        {
            id: 11,
            firstName: 'Ольга',
            lastName: 'Иванова',
            middleName: 'Семеновна',
            department: 'кардиология',
        },
        {
            id: 12,
            firstName: 'Андрей',
            lastName: 'Сидоров',
            middleName: 'Игоревич',
            department: 'хирургия',
        },
        {
            id: 13,
            firstName: 'Марина',
            lastName: 'Харитонова',
            middleName: 'Григорьевна',
            department: 'кардиология',
        },
        {
            id: 14,
            firstName: 'Роман',
            lastName: 'Александров',
            middleName: 'Павлович',
            department: 'хирургия',
        },
        {
            id: 15,
            firstName: 'Татьяна',
            lastName: 'Горшкова',
            middleName: 'Юрьевна',
            department: 'кардиология',
        },
        {
            id: 16,
            firstName: 'Егор',
            lastName: 'Крылов',
            middleName: 'Дмитриевич',
            department: 'хирургия',
        },
        {
            id: 17,
            firstName: 'Ирина',
            lastName: 'Руденко',
            middleName: 'Константиновна',
            department: 'кардиология',
        },
        {
            id: 18,
            firstName: 'Михаил',
            lastName: 'Кузьмин',
            middleName: 'Николаевич',
            department: 'хирургия',
        },
        {
            id: 19,
            firstName: 'Анастасия',
            lastName: 'Гусева',
            middleName: 'Станиславовна',
            department: 'кардиология',
        },
        {
            id: 20,
            firstName: 'Виктория',
            lastName: 'Шевченко',
            middleName: 'Олеговна',
            department: 'хирургия',
        },
    ]);

    function addNurse(nurse: Nurse) {
        const maxId = doctors.value.reduce((max, n) => (n.id > max ? n.id : max), 0);
        nurses.value.unshift({ ...nurse, id: maxId + 1 });
    }

    function editNurse(nurse: Nurse) {
        const index = nurses.value.findIndex((n) => n.id === nurse.id);
        if (index === -1) return;
        nurses.value[index] = { ...nurse };
    }

    function deleteNurse(id: number) {
        const index = nurses.value.findIndex((d) => d.id === id);
        if (index === -1) return;
        nurses.value.splice(index, 1);
    }

    return { doctors, nurses, addDoctor, editDoctor, deleteDoctor, addNurse, editNurse, deleteNurse };
});
