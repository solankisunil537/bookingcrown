import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Col, Row, Typography, Skeleton } from 'antd';
import { getBookingById } from '../../../api/Bookings';
import Sidebar from '../../components/Sidebar';

const { Text } = Typography;

const BookingDetail = () => {
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();

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

    useEffect(() => {
        if (params.id) {
            fetchBooking();
        }
    }, [params.id]);

    return (
        <div className='h-[100vh]'>
            <Sidebar />
            <main className="py-4 w-full lg:w-[calc(100%-15rem)] ms-auto">
                <div className="px-4 sm:px-6 lg:px-6">
                    <div>
                        <Skeleton loading={loading} active>
                            <Card title={`Booking Details - ${booking?.customerName}`} bordered>
                                {!loading && booking && (
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Customer Name:</Text>
                                                <Text>{booking.customerName}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Mobile Number:</Text>
                                                <Text>{booking.mobilenu}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Booking Date:</Text>
                                                <Text>{new Date(booking.date).toLocaleDateString("en-GB")}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Booking Type:</Text>
                                                <Text>{booking.bookingType}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Booking Time:</Text>
                                                <Text>{booking.time?.start} To {booking.time?.end}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Table Number:</Text>
                                                <Text>{booking.turfOrTable}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Amount:</Text>
                                                <Text>{booking.amount}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Advance Amount:</Text>
                                                <Text>{booking.advance}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Pending Amount:</Text>
                                                <Text>{booking.pending}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Payment Status:</Text>
                                                <Text>{booking.payment}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Cancelled:</Text>
                                                <Text>{booking.isCanceled ? "Yes" : "No"}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Session:</Text>
                                                <Text>{booking.session}</Text>
                                            </div>
                                        </Col>
                                    </Row>
                                )}
                            </Card>
                        </Skeleton>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BookingDetail;
