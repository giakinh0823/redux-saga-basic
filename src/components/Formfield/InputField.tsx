import { TextField } from '@mui/material';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label?: string;
}

export function InputField({ name, control, label, ...inputProps }: InputFieldProps) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error, invalid },
    } = useController({ name, control });
    return (
        <TextField
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            label={label}
            error={invalid}
            helperText={error?.message}
            inputProps={inputProps}
            fullWidth
            margin="normal"
        />
    );
}
