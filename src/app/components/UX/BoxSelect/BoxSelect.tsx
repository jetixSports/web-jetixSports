'use client'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react'

function BoxSelect({ onChange, max = 2, options, valuesDisabled = [], field, externalValue=[],setValue}: {setValue?:(i:string,j:any)=>any,externalValue?:string[], onChange?: (e: any) => any, max?: number, options: { value: string, name?: string }[], valuesDisabled?: string[], field: {name:string,onChange:(e: any) => any} }) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>(externalValue||[])
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
         if (Array.isArray(value) && value.length > max) {
            value.shift()
        }
        const newValue = typeof value === 'string' ? value.split(',') : value;
        setSelectedOptions(newValue);
        onChange?.(event)
        field.onChange(event)
    };
     useEffect(() => {
        if (externalValue) {
            setSelectedOptions(externalValue)
            if(setValue)
                setValue(field.name,externalValue)
        }
    }, [externalValue])
    return (
        <Select
            sx={{
                width: "100%",
                paddingX: "10px",
                marginY: "5px",
                backgroundColor: "#20105B",
                borderRadius: "10px",
                color: "white",
                height: 36,
            }}
            {...field}
            multiple
            value={externalValue}
            onChange={handleChange}
        >
            {options.map((item, index) => {
                return (
                    <MenuItem
                        key={index}
                        value={item.value}
                        disabled={valuesDisabled.includes(item.value) && !selectedOptions.includes(item.value)}
                        sx={{ ...(valuesDisabled.includes(item.value) && !selectedOptions.includes(item.value) ? { opacity: 0.5, } : {})}}
                    >
                        {item?.name ?? item.value}
                    </MenuItem>
                )
            })}
        </Select>
    )
}

export default BoxSelect