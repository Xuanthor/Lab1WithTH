import { useEffect, useRef, useState } from 'react';
import '../../styles/users.table.scss'
import { Button, Space, Table, Tag, message } from 'antd';
import type { TableProps } from 'antd';
import CreateUserModel from './create.model';
import { IBackendRes, IModelPaginate, IUser } from '../../types/backend';
import UpdateUserModel from './update.model';
import DeleteUserModel from './delete.model';
import { callLogout } from '@/config/api';
import { setLogoutAction } from '@/redux/slice/accountSlide';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hook';
import { ActionType } from '@ant-design/pro-components';
import { useDispatch } from 'react-redux';
// interface IProps {
//     access_token: string;
// }
const access_token = localStorage.getItem("access_token") as string;

const UserTable = () => {


    const tableRef = useRef<ActionType>();
    const dispatch = useDispatch();
    const [listUser, setListUser] = useState<IUser[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0

    })
    const handleAddNewClick = () => {
        setIsCreateModalOpen(true);
    };
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        try {
            const responseUsers = await fetch(`http://localhost:8000/api/v1/users/?current=${meta.current}&pageSize=${meta.pageSize}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${access_token}`
                }
            });

            if (!responseUsers.ok) {
                const errorResponse = await responseUsers.json();
                throw new Error(errorResponse.message || `HTTP error! status: ${responseUsers.status}`);
            }
            const data: IBackendRes<IModelPaginate<IUser>> | undefined = await responseUsers.json();
            if (data && data.data) {
                setListUser(data.data?.result || []);
                setMeta({
                    current: data.data.meta.current,
                    pageSize: data.data.meta.pageSize,
                    total: data.data.meta.total,
                    pages: data.data.meta.pages
                });
            } else {
                message.warning("No data available");
            }
        } catch (error) {

            message.error((error as Error).message);
        }
    }




    const columns: TableProps<IUser>['columns'] = [
        {
            title: 'Id',
            dataIndex: '_id'

        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: 'Address',
            dataIndex: 'address'
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (role) => {
                let color = role === 'USER' ? 'green' : 'geekblue';
                return (
                    <Tag color={color} key={role}>
                        {role.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">

                    <Button onClick={() => {
                        
                        setSelectedUser(record);
                        setIsUpdateModalOpen(true);
                    }}>Update</Button>
                    <DeleteUserModel getData={getData} access_token={access_token} userId={record._id} />
                </Space >
            ),
        },
    ];
    const handleOnchane = async (page: number, pageSize: number) => {
        try {
            const responseUsers = await fetch(`http://localhost:8000/api/v1/users/?current=${page}&pageSize=${pageSize}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${access_token}`
                }
            });

            if (!responseUsers.ok) {
                const errorResponse = await responseUsers.json();
                throw new Error(errorResponse.message || `HTTP error! status: ${responseUsers.status}`);
            }
            const data: IBackendRes<IModelPaginate<IUser>> | undefined = await responseUsers.json();
            if (data && data.data) {
                setListUser(data.data?.result || []);
                setMeta({
                    current: data.data.meta.current,
                    pageSize: data.data.meta.pageSize,
                    total: data.data.meta.total,
                    pages: data.data.meta.pages
                });
            } else {
                message.warning("No data available");
            }
        } catch (error) {

            message.error((error as Error).message);
        }

    }
    return (
        <div>
            <div className='headerTable'>
                <button onClick={handleAddNewClick}> + Add new</button>
            </div>

            <Table
                columns={columns}
                dataSource={listUser}
                rowKey={"_id"}
                
                scroll={{ x: true }}
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    onChange: (page: number, pageSize: number) => { handleOnchane(page, pageSize) }
                }
                }
            />
            {isCreateModalOpen && (
                <CreateUserModel
                    access_token={access_token}
                    getData={getData}
                    isCreateModalOpen={isCreateModalOpen}
                    setIsCreateModalOpen={setIsCreateModalOpen}
                />
            )}

            {isUpdateModalOpen && (
                <UpdateUserModel
                    access_token={access_token}
                    getData={getData}
                    isUpdateModalOpen={isUpdateModalOpen}
                    setIsUpdateModalOpen={setIsUpdateModalOpen}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                />
            )}

        </div>
    )
}

export default UserTable;
