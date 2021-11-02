import { ListResponse, Student, ListParams } from '../models';
import axiosClient from './axiosClient';

const studentApi = {
    getAll(params: ListParams): Promise<ListResponse<Student>> {
        const url = '/students';
        return axiosClient.get(url, { params });
    },
    getById(id: number): Promise<Student> {
        const url = `/students/${id}`;
        return axiosClient.get(url);
    },
    add(data: Student): Promise<Student> {
        const url = '/students';
        return axiosClient.post(url, { data });
    },
    remove(id: string): Promise<any> {
        const url = `/students/${id}`;
        return axiosClient.get(url);
    },
    update(data: Student): Promise<Student> {
        const url = `/students/${data.id}`;
        return axiosClient.get(url, { data });
    },
};

export default studentApi;
