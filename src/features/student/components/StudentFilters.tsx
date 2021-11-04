import { Button, Grid, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { City, ListParams } from 'models';
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { SearchRounded } from '@mui/icons-material';

export interface StudentFiltersProps {
    filter: ListParams;
    cityList: City[];

    onChange?: (newFilter: ListParams) => void;
    onSearchChange?: (newSearch: ListParams) => void;
}

export default function StudentFilters({
    filter,
    cityList,
    onChange,
    onSearchChange,
}: StudentFiltersProps) {
    const searchRef = React.useRef<HTMLInputElement>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return;
        const newFilter = { ...filter, name_like: e.target.value, _page: 1 };
        onSearchChange(newFilter);
    };

    const handleCityChange = (e: SelectChangeEvent<any>) => {
        if (!onChange) return;
        const newFilter = { ...filter, city: e.target.value, _page: 1 };
        onChange(newFilter);
    };

    const handleSortChange = (e: SelectChangeEvent<any>) => {
        if (!onChange) return;
        const value = e.target.value;
        const [_sort, _order] = value ? value.split('.', 2) : [undefined, undefined];
        const newFilter = { ...filter, _sort, _order };
        onChange(newFilter);
    };

    const handleClearFilter = () => {
        if (!onChange) return;
        const newFilter = {
            ...filter,
            _sort: undefined,
            _order: undefined,
            city: undefined,
            name_like: undefined,
            _page: 1,
        };
        onChange(newFilter);
        if(searchRef.current) searchRef.current.value = '';
    };

    return (
        <div>
            <Grid container spacing={3} sx={{ alignItems: 'center' }}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Search by name</InputLabel>
                        <OutlinedInput
                            label="Search by name"
                            defaultValue={filter.name_like}
                            onChange={handleSearchChange}
                            endAdornment={<SearchRounded color="primary" />}
                            inputRef={searchRef}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            value={filter.city || ''}
                            onChange={handleCityChange}
                        >
                            <MenuItem>All</MenuItem>
                            {cityList.map((city) => (
                                <MenuItem key={city.code} value={city.code}>
                                    {city.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Sort by"
                            value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
                            onChange={handleSortChange}
                        >
                            <MenuItem>No sort</MenuItem>
                            <MenuItem value={'name.asc'}>Name A-Z</MenuItem>
                            <MenuItem value={'name.desc'}>Name Z-A</MenuItem>
                            <MenuItem value={'mark.asc'}>Mark tăng dần</MenuItem>
                            <MenuItem value={'mark.desc'}>Mark giảm dần</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={1}>
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={handleClearFilter}
                    >
                        Clear
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}
