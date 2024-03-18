import React, { useState } from 'react';
import { AppstoreOutlined,HomeOutlined,UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    label: <Link to="/">Home</Link>,
    key: 'mail',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="admin/user">User</Link>,
    key: 'app',
    icon: <UserOutlined />
  }
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;