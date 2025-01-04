// 'use client'

// import { Divider, Typography } from 'antd';
// import { UserDeleteOutlined } from '@ant-design/icons';

// import React from 'react';

// function Offboarding() {


//   return (
//     <>
//       <UserDeleteOutlined className='text-2xl ml-4 text-blue-600'/>
//       <Typography.Text className='text-2xl ml-4 text-blue-600'> Off boarding </Typography.Text>
//       <Divider className='mt-2'/>
//       Offboarding
//     </>
//   );
// };

// export default Offboarding;
// 'use client'

// import { Divider, Typography, Table, Button, Space, Tabs } from 'antd';
// import { UserDeleteOutlined, EditOutlined, DeleteOutlined, AlignLeftOutlined, IdcardOutlined, DollarOutlined, BookOutlined, AppstoreOutlined } from '@ant-design/icons';
// import React from 'react';

// function Offboarding() {
//   const columns = [
//     {
//       title: 'Custom Field Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Type',
//       dataIndex: 'type',
//       key: 'type',
//       render: (_: any, record: any) => (
//         <Space>
//           <AlignLeftOutlined />
//           <span>{record.type}</span>
//         </Space>
//       ),
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_: any, record: any) => (
//         <Space size="middle">
//           <Button type="text" icon={<EditOutlined />}>
//             Edit
//           </Button>
//           <Button type="text" icon={<DeleteOutlined />}>
//             Archive
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   const data = [
//     {
//       key: '1',
//       name: 'Tax File Number',
//       type: 'Short Answer',
//     },
//     {
//       key: '2', 
//       name: 'NIN',
//       type: 'Short Answer',
//     },
//     {
//       key: '3',
//       name: 'Shirt Size',
//       type: 'Short Answer',
//     },
//     {
//       key: '4',
//       name: 'Secondary Language',
//       type: 'Short Answer',
//     },
//   ];

//   const tabItems = [
//     {
//       key: 'personal',
//       label: (
//         <span>
//           <IdcardOutlined className="mr-2" />
//           Personal
//         </span>
//       ),
//       children: (
//         <>
//           <div className="flex justify-between mb-4">
//             <Typography.Text className="text-gray-600">
//               Customize fields to collect a wide variety of data points.
//             </Typography.Text>
//             <Button type="primary">New Custom Field</Button>
//           </div>
//           <Table 
//             columns={columns} 
//             dataSource={data}
//             pagination={false}
//           />
//         </>
//       ),
//     },
//     {
//       key: 'employment',
//       label: (
//         <span>
//           <AppstoreOutlined className="mr-2" />
//           Employment Info
//         </span>
//       ),
//       children: 'Employment Info Content',
//     },
//     {
//       key: 'benefits',
//       label: (
//         <span>
//           <DollarOutlined className="mr-2" />
//           Benefits
//         </span>
//       ),
//       children: 'Benefits Content',
//     },
//     {
//       key: 'training',
//       label: (
//         <span>
//           <BookOutlined className="mr-2" />
//           Training
//         </span>
//       ),
//       children: 'Training Content',
//     },
//     {
//       key: 'assets',
//       label: (
//         <span>
//           <AppstoreOutlined className="mr-2" />
//           Assets
//         </span>
//       ),
//       children: 'Assets Content',
//     },
//   ];

//   return (
//     <div className="p-6">
//       <div className="flex items-center mb-4">
//         <UserDeleteOutlined className="text-2xl text-blue-600" />
//         <Typography.Text className="text-2xl ml-4 text-blue-600">
//           Custom Fields
//         </Typography.Text>
//       </div>
//       <Divider className="mt-2 mb-6" />

//       <Tabs
//         defaultActiveKey="personal"
//         items={tabItems}
//       />
//     </div>
//   );
// }

// export default Offboarding;
'use client'

import { Divider, Typography, Table, Button, Space, Tabs } from 'antd';
import { UserDeleteOutlined, EditOutlined, DeleteOutlined, IdcardOutlined, DollarOutlined, BookOutlined, AppstoreOutlined, AlignLeftOutlined } from '@ant-design/icons';
import React from 'react';

interface TableRecord {
  key: string;
  name: string;
  type: string;
}

function Offboarding() {
  const columns = [
    {
      title: 'Custom Field Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type', 
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => (
        <Space>
          <AlignLeftOutlined />
          {text}
        </Space>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: TableRecord) => (
        <Space size="middle">
          <Button className="flex items-center gap-1 rounded-md border px-3 py-1">
            <EditOutlined />
            <span>Edit</span>
          </Button>
          <Button className="flex items-center gap-1 rounded-md border px-3 py-1">
            <DeleteOutlined />
            <span>Archive</span>
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Tax File Number',
      type: 'Short Answer',
    },
    {
      key: '2',
      name: 'NIN',
      type: 'Short Answer',
    },
    {
      key: '3',
      name: 'Shirt Size',
      type: 'Short Answer',
    },
    {
      key: '4',
      name: 'Secondary Language',
      type: 'Short Answer',
    },
  ];

  const tabItems = [
    {
      key: 'personal',
      label: (
        <span>
          <IdcardOutlined className="mr-2" />
          Personal
        </span>
      ),
      children: <Table columns={columns} dataSource={data} />,
    },
    {
      key: 'benefits',
      label: (
        <span>
          <DollarOutlined className="mr-2" />
          Benefits
        </span>
      ),
      children: 'Benefits Content',
    },
    {
      key: 'training',
      label: (
        <span>
          <BookOutlined className="mr-2" />
          Training
        </span>
      ),
      children: 'Training Content',
    },
    {
      key: 'assets',
      label: (
        <span>
          <AppstoreOutlined className="mr-2" />
          Assets
        </span>
      ),
      children: 'Assets Content',
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <UserDeleteOutlined className="text-2xl text-blue-600" />
        <Typography.Text className="text-2xl ml-4 text-blue-600">
          Custom Fields
        </Typography.Text>
      </div>
      <Divider className="mt-2 mb-6" />

      <Tabs
        defaultActiveKey="personal"
        items={tabItems}
      />
    </div>
  );
}

export default Offboarding;





