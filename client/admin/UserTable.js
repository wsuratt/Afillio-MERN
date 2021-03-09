import React from 'react';
import Table from 'antd/lib/table';
import Switch from 'antd/lib/switch';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'ID',
    dataIndex: '_id',
    responsive: ['lg']
  },
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text, record) => (
      <Link to={`/admin/dashboard/user/${record._id}`}>{text}</Link>
    )
  },
  {
    title: 'email',
    dataIndex: 'email',
    responsive: ['md']
  },
  {
    title: 'Pending',
    dataIndex: 'isPending',
    filters: [
      {
        text: 'Active',
        value: true
      },
      {
        text: 'Inactive',
        value: false
      }
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.isPending === value,
    render: (bool) => <Switch checked={bool} />
  },
  {
    title: 'Vendor',
    dataIndex: 'isVendor',
    filters: [
      {
        text: 'Active',
        value: true
      },
      {
        text: 'Inactive',
        value: false
      }
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.isVendor === value,
    render: (bool) => <Switch checked={bool} />
  }
];


function UserTable({ data }) {

  return (
    <>
      <Table
        className="clearfix"
        columns={columns}
        expandedRowRender={record => <p style={{ margin: 0 }}>{String(record.vendor.Info.company)}</p>}
        dataSource={data}
        style={{ clear: 'both' }}
        // onChange={onChange}
      />
    </>
  );
}

export default UserTable;