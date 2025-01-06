'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { IoSettingsSharp } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ColumnDef } from '@tanstack/react-table';
import { setTableChecklist } from '@/redux/reducers/tableCollumn/tableReducer';
import { Checkbox } from '../ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface TProps {
    columns: ColumnDef<any>[];
    tableName: string;
}

const ColumnSettings = ({ columns, tableName }: TProps) => {
    const dispatch = useAppDispatch();
    const { tableChecklist } = useAppSelector((state) => state.table);
    const checkList = tableChecklist.find((item) => item.route === tableName);

    const [open, setOpen] = useState(false);

    const options = columns?.map(({ header }) => ({
        label: typeof header === 'function' ? '' : header,
        value: typeof header === 'function' ? '' : header,
    }));

    const width = window.innerWidth;

    useEffect(() => {
        if (!checkList) {
            dispatch(
                setTableChecklist({
                    route: tableName,
                    list: options.map((o) => o.value),
                }),
            );
        }
    }, [tableName, checkList]);

    const handleChange = (value: string) => {
        let newList = checkList?.list ? [...checkList.list] : [];
        const exist = checkList?.list?.find((li) => li === value);
        if (exist) {
            newList = checkList?.list?.filter((li) => li !== value) || [];
        } else {
            newList.push(value);
        }
        console.log(newList);
        dispatch(setTableChecklist({ route: tableName, list: newList }));
    };
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant='edit' size={'icon'}>
                        <IoSettingsSharp />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='-right-10 w-36 p-2'>
                    <DropdownMenuLabel>
                        <p className='font-semibold text-sm pb-1 mb-2 border-b border-border-color'>
                            Column Settings
                        </p>
                    </DropdownMenuLabel>

                    <div className='space-y-1'>
                        {options?.map((op, i) => (
                            <div
                                onClick={() => handleChange(op.value as string)}
                                className='text-sm flex items-center gap-1 '
                                key={i}
                            >
                                <Checkbox
                                    checked={checkList?.list.includes(
                                        op?.value as string,
                                    )}
                                />
                                {op?.value}
                            </div>
                        ))}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ColumnSettings;
