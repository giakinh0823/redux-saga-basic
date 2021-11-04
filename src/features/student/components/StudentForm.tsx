import { Box, Button } from '@mui/material';
import { InputField, RadioGroupField, SelectField } from 'components/Formfield';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../app/hooks';

export interface StudentFormProps {
    initalValues?: Student;
    onSubmit: (formValues: Student) => void;
}

export default function StudentForm({ initalValues, onSubmit }: StudentFormProps) {
    const cityOptions = useAppSelector(selectCityOptions);
    const { control, handleSubmit } = useForm<Student>({
        defaultValues: initalValues,
    });

    const handleFormSubmit = (formValues: Student) => {
        console.log(formValues);
    };

    return <Box maxWidth={600}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            {/*form field here */}
            <InputField name="name" control={control} label="Full Name"/>
            <RadioGroupField name="gender" control={control} label="Gender" options={
                [{label: "Male", value: "male"},
                {label: "Female", value: "female"}]
            }/>
            <InputField name="age" control={control} label="Age" type="number"/>
            <InputField name="mark" control={control} label="Mark" type="number"/>
            <SelectField name="city" control={control} label="City" options={cityOptions} />

            <Box mt={3}>
                <Button type="submit" variant="contained" color="primary">Save</Button>
            </Box>
        </form>
    </Box>;
}
