import React from 'react';
import { Button, message, notification, Popconfirm } from 'antd';
import { callDeleteUser } from '@/config/api';
interface IProps {
    access_token: string;
    getData: any;
    userId: any;
}

const DeleteUserModel = (props: IProps) => {

    const { access_token, getData,userId } = props;
    const confirmDelete = async () => {
            try {
                
                const response = await callDeleteUser(userId) 
                if (response.data) {
                    message.success("Delete user thành công");
                    await getData();
                } else {
                    notification.error({
                        message: 'Có lỗi xảy ra',
                        description: response.message
                    });
                }
              
            } catch (error) {
                message.error((error as Error).message);
            }
    };
    return (<>
        <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={confirmDelete}
            okText="Yes"
            cancelText="No"
        >
            <Button type="primary" danger>
                Delete
            </Button>
        </Popconfirm>
    </>)
}

export default DeleteUserModel