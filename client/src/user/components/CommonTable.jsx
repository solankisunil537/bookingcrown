import { Alert, Button, Input, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { fetchAllBookings } from '../../features/bookings/BookingSlice';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdCancelPresentation, MdDelete } from 'react-icons/md';
import { CancelBooking, DeleteBooking } from '../../api/Bookings';
import { CgMoreR } from "react-icons/cg";

const { confirm } = Modal;
const { Option } = Select;

const columns = (onEdit, onDelete, onCancel, navigateDetailPage) => [
    {
        title: 'Name',
        dataIndex: 'customerName',
        key: 'customerName',
        align: 'center',
        responsive: ['xs', 'sm'],
    },
    {
        title: 'Mobile Number',
        dataIndex: 'mobilenu',
        key: 'mobilenu',
        onFilter: (value, record) => record.mobilenu.toString().includes(value),
        align: 'center',
        responsive: ['xs', 'sm'],
    },
    {
        title: 'Booking Date',
        dataIndex: 'date',
        key: 'date',
        render: (text) => new Date(text).toLocaleDateString("en-GB"),
        align: 'center',
        responsive: ['xs', 'sm'],
    },
    {
        title: 'Booking Type',
        dataIndex: 'bookingType',
        key: 'bookingType',
        align: 'center',
        responsive: ['xs', 'sm'],
    },
    {
        title: 'Booking Time',
        dataIndex: 'time',
        key: 'time',
        align: 'center',
        responsive: ['xs', 'sm'],
    },
    {
        title: 'Cancel Booking',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        responsive: ['xs', 'sm'],
        render: (text, record) => (
            <div>
                <MdCancelPresentation onClick={() => onCancel(record.key)} type="link" className='text-[20px] text-red-600 m-auto' />
            </div>
        )
    },
    {
        title: 'View Details',
        dataIndex: 'details',
        key: 'details',
        align: 'center',
        responsive: ['xs', 'sm'],
        render: (text, record) => (
            <div>
                <CgMoreR onClick={() => navigateDetailPage(record.key)} type="link" className='text-[20px] text-themeColor m-auto' />
            </div>
        )
    },
    {
        title: 'Actions',
        key: 'actions',
        align: 'center',
        responsive: ['xs', 'sm'],
        render: (text, record) => (
            <div className='flex'>
                <FaEdit onClick={() => onEdit(record.key)} type="link" className="mr-2 text-[18px] text-themeColor" />
                <MdDelete onClick={() => onDelete(record.key)} type="link" danger className='text-[18px] text-red-600' />
            </div>
        ),
    },
];

function CommonTable({ filter }) {

    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [nameSearchText, setNameSearchText] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(null);
    const navigate = useNavigate()
    const { bookings, status, error } = useSelector((state) => state.bookings);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllBookings());
        }
    }, [status, dispatch]);

    const months = Array.from({ length: 12 }, (_, i) => moment().month(i).format('MMMM'));

    const filteredData = bookings
        .filter((booking) => {
            switch (filter) {
                case 'upcoming':
                    return new Date(booking.date) > new Date();
                case 'currentMonth':
                    const bookingDate = new Date(booking.date);
                    return (
                        bookingDate.getMonth() === moment().month() &&
                        bookingDate.getFullYear() === moment().year()
                    );
                default:
                    return true;
            }
        })
        .filter((booking) => booking.mobilenu.toString().includes(searchText))
        .filter((booking) => booking.customerName.toLowerCase().includes(nameSearchText.toLowerCase()))
        .filter((booking) => {
            if (selectedMonth === null) return true;
            const bookingDate = new Date(booking.date);
            return moment(bookingDate).format('MMMM') === selectedMonth;
        })
        .map((booking) => ({
            key: booking._id,
            customerName: booking.customerName,
            mobilenu: booking.mobilenu,
            date: booking.date,
            time: `${booking.time.start} To ${booking.time.end}`,
            bookingType: booking.bookingType,
        }));

    const handleEdit = (id) => {
        navigate(`/user/edit-booking/${id}`);
    };

    const handleDelete = (id) => {
        confirm({
            title: 'Are you sure you want to delete this booking?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                const data = await DeleteBooking(id)
                if (data.success) {
                    dispatch(fetchAllBookings());
                }
            }
        });
    };

    const handleCancel = (id) => {
        confirm({
            title: 'Are you sure you cancel this booking?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                const data = await CancelBooking(id)
                if (data.success) {
                    dispatch(fetchAllBookings());
                }
            }
        });
    }

    const navigateDetailPage = (id) => {
        navigate(`/user/booking-details/${id}`)
    }

    return (
        <div>
            <div className="mb-4 flex justify-end gap-2 md:gap-7">
                <Input
                    placeholder="Search Mobile Number"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className='w-full md:w-1/3 h-8 mb-2 md:mb-0'
                />
                <Input
                    placeholder="Search Customer Name"
                    value={nameSearchText}
                    onChange={(e) => setNameSearchText(e.target.value)}
                    className='w-full md:w-1/3 h-8 mb-2 md:mb-0'
                />
                <Select
                    placeholder="Select Month"
                    value={selectedMonth}
                    onChange={(value) => setSelectedMonth(value)}
                    className='w-full md:w-1/3'
                >
                    <Option value={null}>All Months</Option>
                    {months.map((month) => (
                        <Option key={month} value={month}>
                            {month}
                        </Option>
                    ))}
                </Select>
            </div>
            <div className='custom-scrollbar'>
                <Table
                    rowKey="key"
                    columns={columns(handleEdit, handleDelete, handleCancel, navigateDetailPage)}
                    dataSource={filteredData}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 'max-content' }}
                    className='border border-gray-300 rounded-lg' />
            </div>
        </div>
    )
}

export default CommonTable
