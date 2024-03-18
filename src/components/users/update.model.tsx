import { useEffect, useState } from "react";
import { IUser } from "../../types/backend";
import { Input, Modal, message, notification } from "antd";
import { callUpdateUser } from "@/config/api";


interface IProps {
    access_token: string;
    getData: any;
    setIsUpdateModalOpen: (v: boolean) => void;
    isUpdateModalOpen: boolean
    selectedUser: IUser|null;
    setSelectedUser: any;
}
const UpdateUserModel = (props: IProps) => {
    const { access_token, getData, setIsUpdateModalOpen, isUpdateModalOpen, selectedUser, setSelectedUser} = props
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        if (selectedUser) {
            setName(selectedUser.name);
            setEmail(selectedUser.email);
            setPassword(selectedUser?.password as string);
            setAge(selectedUser.age.toString()); 
            setGender(selectedUser.gender);
            setAddress(selectedUser.address);
            setRole(selectedUser.role);
        }
    }, [selectedUser]);
    const saveUser = async () => {
        try {
            const user:IUser = {
                _id:selectedUser?._id,
                name,
                email,
                password,
                age:Number(age),
                gender,
                address,
                role,}
            const response = await callUpdateUser(user) 
            if (response.data) {
                message.success("Update user thành công");
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

    const handleOk = () => {
        saveUser();
        setSelectedUser(null);
        setIsUpdateModalOpen(false);
    };
    const handleCancel = () => {
        setIsUpdateModalOpen(false);
        setSelectedUser(null);
    };
    return (
        <>
            <Modal
                title="Update User"
                open={isUpdateModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
                
            >
                <div>
                    Name
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    Email
                    <Input placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    Password
                    <Input placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    Age
                    <Input placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)} />
                </div>
                <div>
                    Gender
                    <Input placeholder="Gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)} />
                </div>
                <div>
                    Address
                    <Input placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    Role
                    <Input placeholder="Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)} />
                </div>
            </Modal>
        </>
    )
}

export default UpdateUserModel