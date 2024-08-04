import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import { Button, Col, DatePicker, Form, Input, Row, Select, TimePicker } from 'antd'
import moment from 'moment';
import { CreateBooking, getBookingById, UpdateBooking } from '../../../api/Bookings';
import { useParams } from 'react-router-dom';
const { RangePicker } = TimePicker;
const { Item } = Form;

function EditBooking() {
    const [form] = Form.useForm();
    const params = useParams()

    const handleRangeChange = (values) => {
        if (values && values.length === 2) {
            const [startTime, endTime] = values;
            const duration = moment.duration(endTime.diff(startTime));
            const hours = duration.asHours();
            form.setFieldsValue({ totalHours: hours });
        }
    };

    const handleAmountChange = () => {
        const { totalAmount, advanceAmount } = form.getFieldsValue();
        if (totalAmount !== undefined || advanceAmount !== undefined) {
            if (totalAmount !== undefined) {
                const pendingAmount = advanceAmount !== undefined
                    ? totalAmount - advanceAmount
                    : totalAmount;
                form.setFieldsValue({ pendingAmount: pendingAmount });
            }
        }
    };

    const validateFutureDate = (_, value) => {
        if (!value || value.isAfter(moment())) {
            return Promise.resolve();
        }
        return Promise.reject('The booking date must be in the future!');
    };

    const validateAdvanceAmount = (rule, value, callback, form) => {
        // const totalAmount = form.getFieldValue('totalAmount');
        // if (value && totalAmount && value > totalAmount) {
        //     callback('Advance Amount should not be more than Total Amount!');
        // } else {
        //     callback();
        // }
    };

    const onFinish = async (values) => {
        const bookingData = {
            customerName: values.customerName,
            mobilenu: values.mobileNumber,
            date: new Date(values.date),
            time: {
                start: values.time[0].format('HH:mm'),
                end: values.time[1].format('HH:mm'),
            },
            totalHours: parseFloat(values.totalHours),
            turfOrTable: "l",
            amount: parseFloat(values.totalAmount),
            advance: parseFloat(values.advanceAmount),
            pending: values.pendingAmount,
            bookingType: values.bookingType,
            session: values.session,
        };
        await UpdateBooking(bookingData, params.id);
    };

    const getBookingsData = async () => {
        try {
            const data = await getBookingById(params.id)
            if (data) {
                form.setFieldsValue({
                    customerName: data.customerName,
                    mobileNumber: data.mobilenu,
                    date: moment(data.date),
                    time: [
                        moment(data.time.start, 'HH:mm A'),
                        moment(data.time.end, 'HH:mm A'),
                    ],
                    totalHours: data.totalHours,
                    totalAmount: data.amount,
                    advanceAmount: data.advance,
                    pendingAmount: data.pending,
                    bookingType: data.bookingType,
                    session: data.session,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (params.id) {
            getBookingsData()
        }
    }, [params.id])

    return (
        <div>
            <Sidebar />
            <main className="py-4 w-full lg:w-[calc(100%-15rem)] ms-auto">
                <div className="px-4 sm:px-6 lg:px-6">
                    <div className="mb-3 flex flex-wrap">
                        <div className="w-full sm:w-1/2">
                            <h1 className="text-xl font-semibold">Edit Booking</h1>
                        </div>
                    </div>
                    <div className='p-6'>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            onValuesChange={handleAmountChange}
                        >
                            <Row gutter={16}>
                                <Col xs={12} sm={12} lg={8}>
                                    <Item
                                        name="customerName"
                                        label="Customer name"
                                        rules={[{ required: true, message: 'Please input your name!' }]}
                                    >
                                        <Input
                                            placeholder="Name"
                                            className="h-10 border-gray-300"
                                        />
                                    </Item>
                                </Col>

                                <Col xs={12} sm={12} lg={8}>
                                    <Item
                                        name="mobileNumber"
                                        label="Mobile Number"
                                        rules={[
                                            { required: true, message: 'Please input your mobile number!' },
                                            {
                                                pattern: /^[0-9]{10}$/,
                                                message: 'Mobile number must be exactly 10 digits!'
                                            }
                                        ]}
                                    >
                                        <Input
                                            type="number"
                                            placeholder="Mobile Number"
                                            className="h-10 border-gray-300 focus:border-themeColor hover:border-themeColor rounded outline-none bg-transparent"
                                        />
                                    </Item>
                                </Col>

                                <Col xs={12} sm={12} lg={8}>
                                    <Item
                                        name="bookingType"
                                        label="Booking Type"
                                        rules={[{ required: true, message: 'Please select a booking type!' }]}
                                    >
                                        <Select
                                            placeholder="Select Type"
                                            className='h-10 custom-select w-full border-gray-300 focus:border-themeColor hover:!border-themeColor rounded outline-none bg-transparent'
                                            options={[
                                                { value: 'Hourly', label: 'Hourly' },
                                                { value: 'Full Day', label: 'Full Day' },
                                                { value: 'Half Day', label: 'Half Day' },
                                            ]}
                                        />
                                    </Item>
                                </Col>

                                <Col xs={12} sm={12} lg={8}>
                                    <Item
                                        name="table"
                                        label="Select Table"
                                        rules={[{ required: true, message: 'Please select a table!' }]}
                                    >
                                        <Select
                                            placeholder="Select Table"
                                            className='h-10 w-full border-gray-300 focus:border-themeColor hover:border-themeColor rounded outline-none bg-transparent'
                                            options={[
                                                { value: 'jack', label: 'Jack' },
                                                { value: 'lucy', label: 'Lucy' },
                                                { value: 'Yiminghe', label: 'Yiminghe' },
                                                { value: 'disabled', label: 'Disabled', disabled: true },
                                            ]}
                                        />
                                    </Item>
                                </Col>

                                <Col xs={12} sm={12} lg={8}>
                                    <Item
                                        name="date"
                                        label="Booking Date"
                                        rules={[{ required: true, message: 'Please select a date!' }, { validator: validateFutureDate }]}
                                    >
                                        <DatePicker
                                            className="h-10 w-full border-gray-300 focus:border-themeColor hover:border-themeColor rounded outline-none bg-transparent"
                                        />
                                    </Item>
                                </Col>

                                <Col xs={12} sm={12} lg={8}>
                                    <Item
                                        name="time"
                                        label="Select Time"
                                        rules={[{ required: true, message: 'Please select a time!' }]}
                                    >
                                        <RangePicker
                                            showTime={{ format: 'hh:mm A' }}
                                            format="hh:mm A"
                                            onChange={handleRangeChange}
                                            className='h-10 w-full border-gray-300 focus:border-themeColor hover:border-themeColor rounded outline-none bg-transparent'
                                        />
                                    </Item>
                                </Col>

                                <Col xs={12} sm={12} lg={8}>
                                    <Item
                                        name="totalHours"
                                        label="Total Hours"
                                    >
                                        <Input
                                            type='number'
                                            readOnly
                                            initialValues="0"
                                            placeholder='Total Hours'
                                            className="h-10 w-full border-gray-300 focus:border-themeColor hover:border-themeColor rounded outline-none bg-transparent"
                                        />
                                    </Item>
                                </Col>

                                <Col xs={12} sm={12} lg={8}>
                                    <Item
                                        name="totalAmount"
                                        label="Total Amount"
                                        rules={[{ required: true, message: 'Please input total amount!' }]}
                                    >
                                        <Input
                                            type='number'
                                            placeholder='Amount'
                                            className="h-10 w-full border-gray-300 focus:border-themeColor hover:border-themeColor rounded outline-none bg-transparent"
                                        />
                                    </Item>
                                </Col>

                                <Col xs={12} sm={12} lg={8}>
                                    <Item
                                        name="advanceAmount"
                                        label="Advance Amount"
                                        rules={[
                                            { required: true, message: 'Please input advance amount!' },
                                            // { validator: (rule, value, callback) => validateAdvanceAmount(rule, value, callback, form) }
                                        ]}
                                    >
                                        <Input
                                            type='number'
                                            placeholder='Advance Amount'
                                            className="h-10 w-full border-gray-300 focus:border-themeColor hover:border-themeColor rounded outline-none bg-transparent"
                                        />
                                    </Item>
                                </Col>

                                <Col xs={12} sm={12} lg={8}>
                                    <Item
                                        name="pendingAmount"
                                        label="Pending Amount"
                                    >
                                        <Input
                                            type='number'
                                            readOnly
                                            placeholder='Pending Amount'
                                            initialValues="0"
                                            className="h-10 w-full border-gray-300 focus:border-themeColor hover:border-themeColor rounded outline-none bg-transparent"
                                        />
                                    </Item>
                                </Col>

                                <Col xs={12} sm={12} lg={8}>
                                    <Item
                                        name="session"
                                        label="Select Session"
                                        rules={[{ required: true, message: 'Please select a session!' }]}
                                    >
                                        <Select
                                            placeholder="Select Session"
                                            className='h-10 w-full border-gray-300 focus:border-themeColor hover:border-themeColor rounded outline-none bg-transparent'
                                            options={[
                                                { value: 'Morning Session', label: 'Morning Session' },
                                                { value: 'Afternoon Session', label: 'Afternoon Session' },
                                                { value: 'Evening Session', label: 'Evening Session' },
                                            ]}
                                        />
                                    </Item>
                                </Col>
                            </Row>
                            <Button
                                type="submit"
                                htmlType="submit"
                                className='h-10 px-6 bg-themeColor border-themeColor hover:!bg-[#0dcaba] hover:!text-white hover:!border-[#0dcaba] inline-flex items-center justify-center font-medium rounded-md text-white mt-5'
                            >
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default EditBooking
