// dummy data
const boards = [{ id: '83fa4f89-8ea1-4d1c-9fee-321daa941485', name: 'PO:n taulu' },
    { id: 'd3553f65-7ed4-4f43-9847-c14e4539eb5e', name: 'devaajan taulu' },
    { id: '0f154e01-f8ba-49c8-b2dc-e374d28f7f83', name: 'jeejeeBOard3' }]

const columns = [
    {
        name: 'column1',
        boardId: '83fa4f89-8ea1-4d1c-9fee-321daa941485',
        orderNumber: 1,
        id: '28d0ce05-b1e1-4c21-9c8a-87ba1b2a0527',
    },
    {
        name: 'column2',
        boardId: 'd3553f65-7ed4-4f43-9847-c14e4539eb5e',
        orderNumber: 2,
        id: 'b23f9b7f-ab9f-4219-9604-2178751ce948',
    },
    {
        name: 'column3',
        boardId: 'd3553f65-7ed4-4f43-9847-c14e4539eb5e',
        orderNumber: 2,
        id: '0880a57b-372f-4fe7-8923-e90a92331ab6',
    },
    {
        name: 'column4',
        boardId: 'd3553f65-7ed4-4f43-9847-c14e4539eb5e',
        orderNumber: 1,
        id: '7bce34e5-385b-41e6-acd3-ceb4bd57b4f6',
    },
    {
        name: 'column5',
        boardId: '0f154e01-f8ba-49c8-b2dc-e374d28f7f83',
        orderNumber: 1,
        id: 'ce175646-4035-41f5-99d7-7d742f0e8ac5',
    },
    {
        name: 'column6',
        boardId: '0f154e01-f8ba-49c8-b2dc-e374d28f7f83',
        orderNumber: 2,
        id: 'f6209adb-91ca-476b-8269-328a82d05d4a',
    },
]

const tasks = [
    {
        title: 'task1',
        content: 'task1',
        columnId: 'f6209adb-91ca-476b-8269-328a82d05d4a',
        columnOrderNumber: 2,
        id: 'f3f3c12d-cee0-46bf-9374-f19ba8894ad6',
    },
    {
        title: 'task2',
        content: 'task2',
        columnId: 'f6209adb-91ca-476b-8269-328a82d05d4a',
        columnOrderNumber: 1,
        id: 'd29fc7da-93a1-40ec-8c56-7b619445465b',
    },
    {
        title: 'task3',
        content: 'task3',
        columnId: '7bce34e5-385b-41e6-acd3-ceb4bd57b4f6',
        columnOrderNumber: 1,
        id: 'b8d2d626-d6a8-4c9a-89f3-a77796d2b2f3',
    },
    {
        title: 'task4',
        content: 'task4',
        columnId: '7bce34e5-385b-41e6-acd3-ceb4bd57b4f6',
        columnOrderNumber: 2,
        id: '6e766c63-0684-4cf2-8a46-868cfaf84033',
    },
    {
        title: 'task5',
        content: 'task5',
        columnId: '7bce34e5-385b-41e6-acd3-ceb4bd57b4f6',
        columnOrderNumber: 3,
        id: 'e12d6ed1-c275-4047-8f3c-b50050bada6d',
    },
    {
        title: 'task6',
        content: 'task6',
        columnId: '28d0ce05-b1e1-4c21-9c8a-87ba1b2a0527',
        columnOrderNumber: 1,
        id: '7b29f130-fc89-4f16-b0ef-71a06e09110c',
    },
]

const subtasks = [
    {
        name: 'subtask1',
        done: true,
        taskId: 'b8d2d626-d6a8-4c9a-89f3-a77796d2b2f3',
        orderNumber: 2,
        id: '7ccd9f9b-a706-4fa7-a99c-d07136606840',
    },
    {
        name: 'subtask2',
        done: false,
        taskId: 'b8d2d626-d6a8-4c9a-89f3-a77796d2b2f3',
        orderNumber: 2,
        id: '3345bb1f-c8dd-46f2-a099-a1e2c347ae88',
    },
    {
        name: 'subtask3',
        done: true,
        taskId: 'b8d2d626-d6a8-4c9a-89f3-a77796d2b2f3',
        orderNumber: 1,
        id: '6a752e4c-3254-49fa-a860-f1694b4e3fb9',
    },

]

module.exports = {
    boards, columns, tasks, subtasks,
}
