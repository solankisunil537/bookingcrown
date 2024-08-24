import { Card, Col, Row, Skeleton, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBookingById } from '../../../api/Bookings';
import { FaCheckCircle } from 'react-icons/fa';
import dayjs from 'dayjs';
import { IoCall } from 'react-icons/io5';
import { Disclosure } from '@headlessui/react'

const { Text } = Typography;

function CustomerDetail() {
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    const [config, setConfig] = useState({
        content: 'Booking Crown',
        color: 'rgba(0, 0, 0, 0.1)',
        fontSize: 18,
        offset: 8,
    });

    const { content, color, fontSize, offset } = config;

    const fetchBooking = async () => {
        try {
            const response = await getBookingById(params.id);
            setBooking(response);
        } catch (error) {
            console.error('Failed to fetch booking details:', error);
        } finally {
            setLoading(false);
        }
    };

    const itemTypeMapping = {
        "Box Cricket": "Turf",
        "Cafe/Restaurant": "Table",
        "Hotel management": "Table",
        "Farm": "Farm",
    };

    const itemName = itemTypeMapping[booking?.ownerData?.businessType];

    useEffect(() => {
        if (params.id) {
            fetchBooking();
        }
    }, [params.id]);

    return (
        <div>
            <Skeleton loading={loading} active>
                {!loading &&
                    <div>
                        <div className="top-0 left-0 right-0 bg-white shadow z-50">
                            <Disclosure as="nav" className="bg-white shadow-xl">
                                <div className="mx-auto max-w-7xl py-1 px-4 sm:px-6 lg:px-8">
                                    <div className="relative flex h-16 items-center justify-between">

                                        <div className="flex flex-1 items-center justify-start">
                                            <h1 className='text-themeColor text-[18px] font-semibold'>
                                                {booking?.ownerData?.businessName}
                                            </h1>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <i className='text-themeColor'>
                                                <IoCall className='text-[23px]' />
                                            </i>
                                            <p className="text-[15px] text-slate-400">
                                                <a href={`tel:+91${booking?.ownerData?.mobilenu}`} target='_blank' rel="noopener noreferrer">
                                                    +91 {booking?.ownerData?.mobilenu}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Disclosure>
                        </div>

                        <div className='h-[100vh] mx-auto px-12 md:px-20 sm:px-10 py-14 lg:py-10' >
                            <div className='flex justify-start items-center gap-6'>
                                <div className='bg-themeColor w-[400px] shadow-xl text-white p-6 rounded-lg'>
                                    <div className='flex flex-col'>
                                        <div className='flex-1'>
                                            <i><FaCheckCircle className='text-white text-[40px] m-auto mb-3' /></i>
                                            <p>Congratulations, Your booking is successfully Done</p>
                                        </div>
                                        <div className='flex-1 bg-teal-600 rounded-lg p-3 mt-4'>
                                            <h4 className='text-center'>
                                                Booked for {dayjs(booking?.date).format('D MMMM, YYYY')}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h1 className='font-semibold text-[26px]'>Dear {booking?.customerName},</h1>
                                    <p className='mt-2 text-[16px]'>Your booking for {booking?.ownerData.businessType} is confirmed with {booking.ownerData.businessName}.</p>
                                </div>
                            </div>

                            <div className='mt-4'>
                                <Card title="Bookind Details">
                                    <Row gutter={[12, 12]}>
                                        {booking.time && (
                                            <>
                                                <Col xs={24} sm={12} md={8} lg={8}>
                                                    <div className="flex gap-4 mb-1 md:mb-3">
                                                        <Text className='font-semibold'>Booking Time:</Text>
                                                        <Text>{booking.time.start} To {booking.time.end}</Text>
                                                    </div>
                                                </Col>
                                                <Col xs={24} sm={12} md={8} lg={8}>
                                                    <div className="flex gap-4 mb-1 md:mb-3">
                                                        <Text className='font-semibold'>Total Hours:</Text>
                                                        <Text>{booking.totalHours}</Text>
                                                    </div>
                                                </Col>
                                            </>
                                        )}
                                        {booking.session && (
                                            <Col xs={24} sm={12} md={8} lg={8}>
                                                <div className="flex gap-4 mb-1 md:mb-3">
                                                    <Text className='font-semibold'>Session:</Text>
                                                    <Text>{booking.session}</Text>
                                                </div>
                                            </Col>
                                        )}
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>{itemName}:</Text>
                                                <Text>{booking.item}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-3">
                                                <Text className='font-semibold'>Amount:</Text>
                                                <Text>{booking.amount} ₹</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-3">
                                                <Text className='font-semibold'>Advance Amount:</Text>
                                                <Text>{booking.advance} ₹</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-3">
                                                <Text className='font-semibold'>Pending Amount:</Text>
                                                <Text>{booking.pending} ₹</Text>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                                <p className='mt-4 text-[14px]'>
                                    Thank you for choosing our service. If you have any questions or need further assistance, please do not hesitate to contact us.
                                </p>
                            </div>
                        </div>
                    </div>
                }
            </Skeleton>
        </div>
    )
}

export default CustomerDetail
