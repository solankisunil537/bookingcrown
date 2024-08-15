import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../features/user/UserSlice';
import { FaInfoCircle } from 'react-icons/fa';
import CreatePlan from '../model/CreatePlan';
import moment from 'moment';

const columns = (activeKey, showModal) => [
    {
        title: 'Name',
        dataIndex: 'name',
        align: "center"
    },
    {
        title: 'Mobile Nu.',
        dataIndex: 'mobileNumber',
        align: "center"
    },
    {
        title: 'B-Type',
        dataIndex: 'bussinessType',
        align: "center"
    },
    {
        title: 'B-Name',
        dataIndex: 'bussinessName',
        align: "center"
    },
    ...(activeKey === "1" ? [
        {
            title: 'Active Plan',
            dataIndex: 'activePlan',
            align: "center"
        },
        {
            title: 'Starting Date',
            dataIndex: 'startDate',
            align: "center",
            render: (text) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Ending Date',
            dataIndex: 'endDate',
            align: "center",
            render: (text) => moment(text).format('DD-MM-YYYY'),
        }
    ] : []),
    ...(activeKey === "2" ? [{
        title: 'Set Plan',
        key: 'actions',
        align: "center",
        render: (record) => (
            <FaInfoCircle className='text-[20px] mx-auto text-themeColor' onClick={() => showModal(record.key)} />
        )
    }] : []),
];

function UsersTable({ activeKey }) {
    const { allUsers, status } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const showModal = (record) => {
        setSelectedId(record)
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllUsers());
        }
    }, [dispatch, status]);

    const now = moment();
    const data = allUsers
        .filter((user) => {
            const hasPlan = user.planData && user.planData.planType;
            const hasExpiredPlan = hasPlan && moment(user.planData.endDate).isBefore(now);

            if (activeKey === "1") {
                return hasPlan
            } else if (activeKey === "2") {
                return hasExpiredPlan || !hasPlan;
            }
            return false;
        })
        .map((user) => ({
            key: user._id,
            name: user.name,
            mobileNumber: user.mobilenu,
            bussinessType: user.businessType,
            bussinessName: user.businessName,
            createdAt: user.createdAt,
            activePlan: user.planData ? user.planData.planType : '',
            startDate: user.planData ? user.planData.startDate : '',
            endDate: user.planData ? user.planData.endDate : ''
        }));

    return (
        <div>
            <Table
                columns={columns(activeKey, showModal)}
                dataSource={data}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 'max-content' }}
                size='middle'
                className='border border-gray-300 rounded-lg'
            />

            <CreatePlan showModel={open} handleCancel={handleCancel} selectedId={selectedId} />
        </div>
    )
}

export default UsersTable
