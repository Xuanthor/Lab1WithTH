import axios from "axios"
import { IAccount, IBackendRes, IGetAccount, IModelPaginate, IUser } from "../types/backend"
import instance from "./axios"





/**
 * 
Module Auth
 */
export const callRegister = (name: string, email: string, password: string, age: number, gender: string, address: string) => {
    return instance.post<IBackendRes<IUser>>('/api/v1/auth/register', { name, email, password, age, gender, address })  as any
    
}

export const callLogin = (username: string, password: string) => {
    return instance.post<IBackendRes<IAccount>>('/api/v1/auth/login', { username, password }) as any
}

export const callFetchAccount = () => {
    return instance.get<IBackendRes<IGetAccount>>('/api/v1/auth/account') as any
}

export const callRefreshToken = () => {
    return instance.get<IBackendRes<IAccount>>('/api/v1/auth/refresh') as any
}

export const callLogout = () => {
    return instance.post<IBackendRes<string>>('/api/v1/auth/logout') as any
}


/**
 * 
Module User
 */
export const callCreateUser = (user: IUser) => {
    return instance.post<IBackendRes<IUser>>('/api/v1/users', { ...user }) as any
}

export const callUpdateUser = (user: IUser) => {
    return instance.patch<IBackendRes<IUser>>(`/api/v1/users`, { ...user }) as any
}

export const callDeleteUser = (id: string) => {
    return instance.delete<IBackendRes<IUser>>(`/api/v1/users/${id}`) as any
}

export const callFetchUser = (query: string) => {
    return instance.get<IBackendRes<IModelPaginate<IUser>>>(`/api/v1/users?${query}`) as any
}
