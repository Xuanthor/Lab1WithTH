import { callCreateUser } from "@/config/api";
import { IUser } from "@/types/backend";
import { Input, Modal, message, notification } from "antd"
import { useState } from "react";



interface IProps{
    access_token:string;
    getData :any;
    setIsCreateModalOpen :  (v:boolean) => void ;
    isCreateModalOpen : boolean
}
const CreateUserModel = (props :IProps ) =>{
    const {access_token,getData,setIsCreateModalOpen ,isCreateModalOpen} = props;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');

    const createUser = async () => {
        try {
            const user:IUser = {name,
                email,
                password,
                age:Number(age),
                gender,
                address,
                role,}
            const response = await callCreateUser(user) 
            if (response.data) {
                message.success("Thêm mới user thành công");
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
        createUser();
        setIsCreateModalOpen(false);
    };

    const handleCancel = () => {
        setIsCreateModalOpen(false);
    };
    
   
    return (
        <>
        <Modal 
            title="Add new user" 
            open={isCreateModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel}
            maskClosable={false}
            >
                <div>
                    Name
                    <Input placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    Email
                    <Input placeholder="Email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    Password
                    <Input placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    Age
                    <Input placeholder="Age" 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}/>
                </div>
                <div>
                    Gender
                    <Input placeholder="Gender" 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}/>
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
                    onChange={(e) => setRole(e.target.value)}/>
                </div>               
            </Modal>
        </>
    )
}

export default CreateUserModel