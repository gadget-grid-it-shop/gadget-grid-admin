import { createSlice } from '@reduxjs/toolkit';

type TColumnSetting = {
    route: string;
    list: string[];
};

type TInitailState = {
    tableChecklist: TColumnSetting[];
};

const initialState: TInitailState = {
    tableChecklist: [],
};

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setTableChecklist: (state, action) => {
            const { route, list } = action.payload;
            if (route && list) {
                const exist = state.tableChecklist.find(
                    (c) => c.route === route,
                );
                if (exist) {
                    exist.list = list;
                } else {
                    state.tableChecklist.push({ route: route, list: list });
                }
            }
        },
    },
});

export const { setTableChecklist } = tableSlice.actions;

export default tableSlice.reducer;
