import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOptions {
    label?: string;
    value: string | number;
}

export interface SelectFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label?: string;
    disabled?: boolean;
    options: SelectOptions[];
}

export function SelectField({ name, control, label, disabled, options }: SelectFieldProps) {
    const {
        field: { value, onChange, onBlur },
        fieldState: { error, invalid },
    } = useController({ name, control });
    return (
        <FormControl margin="normal" fullWidth error={invalid} disabled={disabled}>
            <InputLabel>{label}</InputLabel>
            <Select label={label} value={value} onChange={onChange} onBlur={onBlur}>
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
}
