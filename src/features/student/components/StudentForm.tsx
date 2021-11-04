import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { InputField, RadioGroupField, SelectField } from 'components/Formfield';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../app/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export interface StudentFormProps {
    initalValues?: Student;
    onSubmit: (formValues: Student) => void;
}

export default function StudentForm({ initalValues, onSubmit }: StudentFormProps) {
    const cityOptions = useAppSelector(selectCityOptions);
    const [error, setError] = React.useState<string>();

    const schema = yup
        .object({
            name: yup
                .string()
                .required('Please enter name')
                .test('too-short', 'Name is too short', (value) => {
                    if(!value) return true;
                    return value?.trim()?.split(/\s+/)?.length >= 2;
                }),
            age: yup
                .number()
                .positive('Please enter position number')
                .integer('Please enter interger number')
                .max(60, 'Min is 60 age')
                .required('Please enter age')
                .typeError('Please enter a vailable number'),
            city: yup.string().required('Please enter city'),
            mark: yup
                .number()
                .positive()
                .max(0, 'Please enter min is 0')
                .max(10, 'Please enter max is 10')
                .required('Please enter mark')
                .typeError('Please enter a vailable number'),
            gender: yup
                .string()
                .oneOf(['male', 'female'], 'Please enter male or female')
                .required('Please enter gender'),
        })
        .required();

    const { control, handleSubmit, formState: {isSubmitting} } = useForm<Student>({
        defaultValues: initalValues,
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValues: Student) => {
        try {
            //Clear error
            setError('')
            await onSubmit?.(formValues);
        } catch (error: any) {
            setError(error.message)
        }
    };

    return (
        <Box maxWidth={600}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                {/*form field here */}
                <InputField name="name" control={control} label="Full Name" />
                <RadioGroupField
                    name="gender"
                    control={control}
                    label="Gender"
                    options={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                    ]}
                />
                <InputField name="age" control={control} label="Age" type="number" />
                <InputField name="mark" control={control} label="Mark" type="number" />
                {Array.isArray(cityOptions) && cityOptions.length > 0 && (
                   <SelectField name="city" control={control} label="City" options={cityOptions} />
                )}
                {error && <Alert severity="error">{error}</Alert>}
                <Box mt={3}>
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                        {isSubmitting && <CircularProgress sx={{color:"white"}} />}
                        {!isSubmitting && 'Save'}
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
