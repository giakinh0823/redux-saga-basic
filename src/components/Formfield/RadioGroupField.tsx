import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface RadioOptions {
    label?: string;
    value: string | number;
}

export interface RadioGroupFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label?: string;
    disabled?: boolean;
    options: RadioOptions[];
}

export function RadioGroupField({ name, control, label, disabled, options }: RadioGroupFieldProps) {
    const {
        field: { value, onChange, onBlur },
        fieldState: { error, invalid },
    } = useController({ name, control });
    return (
        <FormControl disabled={disabled}  component="fieldset" margin="normal" error={invalid}>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup onChange={onChange} onBlur={onBlur} value={value}>
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        control={<Radio />}
                    />
                ))}
                <FormHelperText>{error?.message}</FormHelperText>
            </RadioGroup>
        </FormControl>
    );
}
