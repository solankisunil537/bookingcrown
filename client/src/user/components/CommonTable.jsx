import { DatePicker, Input, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaInfoCircle } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';
import { fetchAllBookings } from '../../features/bookings/BookingSlice';
import { fetchUserData } from '../../features/user/UserSlice';
import { DeleteBooking } from '../../api/Bookings';

const { confirm } = Modal;
const { Option } = Select;

const commonColumns = [
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
    }
];

const hourlyColumns = [
    {
        title: 'Table/Turf',
        dataIndex: 'item',
        key: 'item',
        align: 'center',
        responsive: ['xs', 'sm'],
    },
    {
        title: 'Start Time',
        dataIndex: 'startTime',
        key: 'startTime',
        align: 'center',
        responsive: ['xs', 'sm'],
    },
    {
        title: 'End Time',
        dataIndex: 'endTime',
        key: 'endTime',
        align: 'center',
        responsive: ['xs', 'sm'],
    },
    {
        title: 'Total Hours',
        dataIndex: 'totalHours',
        key: 'totalHours',
        align: 'center',
        responsive: ['xs', 'sm'],
    },
];

const dailyColumns = [
    {
        title: 'Farm/Hotel',
        dataIndex: 'item',
        key: 'item',
        align: 'center',
        responsive: ['xs', 'sm'],
    },
    {
        title: 'Session',
        dataIndex: 'session',
        key: 'session',
        align: 'center',
        responsive: ['xs', 'sm'],
    },
];

const actionColumns = (handleEdit, handleDelete, navigateDetailPage) => [
    {
        title: 'View Details',
        dataIndex: 'details',
        key: 'details',
        align: 'center',
        responsive: ['xs', 'sm'],
        render: (text, record) => (
            <div>
                <FaInfoCircle onClick={() => navigateDetailPage(record)} type="link" className='text-[20px] text-themeColor m-auto' />
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
                <FaEdit onClick={() => handleEdit(record.key)} type="link" className="mr-2 text-[18px] text-themeColor" />
                <MdDelete onClick={() => handleDelete(record.key)} type="link" danger className='text-[18px] text-red-600' />
            </div>
        ),
    },
];

function CommonTable({ filter }) {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();
    const { bookings, status } = useSelector((state) => state.bookings);
    const userState = useSelector((state) => state.user);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllBookings());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (userState.status === "idle") {
            dispatch(fetchUserData())
        }
    }, [dispatch])

    const months = Array.from({ length: 12 }, (_, i) => moment().month(i).format('MMMM'));

    const filteredData = bookings
        .filter((booking) => {
            switch (filter) {
                case 'upcoming':
                    return new Date(booking.date) >= new Date();
                default:
                    return true;
            }
        })
        .filter((booking) => {
            const searchLower = searchText.toLowerCase();
            return (
                booking.mobilenu.toString().includes(searchText) ||
                booking.customerName.toLowerCase().includes(searchLower)
            );
        })
        .filter((booking) => {
            if (selectedMonth === null) return true;
            const bookingDate = new Date(booking.date);
            return moment(bookingDate).format('MMMM') === selectedMonth;
        })
        .filter((booking) => {
            if (selectedDate === null) return true;
            const bookingDate = moment(booking.date).format('DD-MM-YYYY');
            return bookingDate === selectedDate;
        })
        .map((booking) => ({
            key: booking._id,
            customerName: booking.customerName,
            mobilenu: booking.mobilenu,
            date: booking.date,
            startTime: booking.time?.start,
            endTime: booking.time?.end,
            item: booking.item,
            totalHours: booking.totalHours,
            session: booking.session
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

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
                const data = await DeleteBooking(id);
                if (data.success) {
                    dispatch(fetchAllBookings());
                }
            }
        });
    };

    const navigateDetailPage = (record) => {
        if (userState.user.data?.bookingType === "hourly") {
            navigate(`/user/hourly-booking-details/${record.key}`);
        } else {
            navigate(`/user/daily-booking-details/${record.key}`);
        }
    };

    const totalHours = userState.user.data?.bookingType === 'hourly'
        ? filteredData.reduce((sum, booking) => sum + (booking.totalHours || 0), 0)
        : null;

    const columns = [
        ...commonColumns,
        ...(userState.user.data?.bookingType === 'hourly' ? hourlyColumns : dailyColumns),
        ...actionColumns(handleEdit, handleDelete, navigateDetailPage),
    ];

    return (
        <div>
            <div className="mb-4 flex justify-end gap-2 md:gap-7">
                <Input
                    placeholder="Search by Name or Mobile Number"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className='w-full md:w-1/3 h-8 mb-2 md:mb-0'
                />
                <Select
                    placeholder="Search by Month"
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
                <DatePicker
                    placeholder='Search by date'
                    format="DD-MM-YYYY"
                    onChange={(date) => setSelectedDate(date ? date.format('DD-MM-YYYY') : null)}
                    className='w-full md:w-1/3'
                />
            </div>
            <div className='custom-scrollbar'>
                <Table
                    rowKey="key"
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 'max-content' }}
                    size='middle'
                    className='border border-gray-300 rounded-lg' />
            </div>
        </div>
    );
}

export default CommonTable;
