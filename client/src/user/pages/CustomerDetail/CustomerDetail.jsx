import { Card, Col, Row, Skeleton, Typography, Watermark } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBookingById } from '../../../api/Bookings';

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
    const watermarkProps = {
        content,
        offset,
        font: {
            color: typeof color === 'string' ? color : color.toRgbString(),
            fontSize,
        },
    };

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
        <div className=''>
            <Skeleton loading={loading} active>
                <Watermark
                    {...watermarkProps}
                >

                    <div className='h-[100vh] mx-auto px-12 md:px-20 sm:px-10 py-24 lg:py-20' >
                        <div>
                            <Text className='font-semibold' style={{ display: 'block', marginBottom: '8px' }}>
                                Hey {booking?.customerName}, Here are the details of your booking:
                            </Text>

                            <Card title={`Your Booking Details`} bordered>
                                {!loading && booking && (
                                    <Row gutter={[16, 16]}>
                                        {booking.customerName &&
                                            <Col xs={24} sm={12} md={8} lg={8}>
                                                <div className="flex gap-4 mb-1 md:mb-5">
                                                    <Text className='font-semibold'>Customer Name:</Text>
                                                    <Text>{booking.customerName}</Text>
                                                </div>
                                            </Col>
                                        }
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
                                        {booking.time && (
                                            <>
                                                <Col xs={24} sm={12} md={8} lg={8}>
                                                    <div className="flex gap-4 mb-1 md:mb-5">
                                                        <Text className='font-semibold'>Booking Time:</Text>
                                                        <Text>{booking.time.start} To {booking.time.end}</Text>
                                                    </div>
                                                </Col>
                                                <Col xs={24} sm={12} md={8} lg={8}>
                                                    <div className="flex gap-4 mb-1 md:mb-5">
                                                        <Text className='font-semibold'>Total Hours:</Text>
                                                        <Text>{booking.totalHours}</Text>
                                                    </div>
                                                </Col>
                                            </>
                                        )}
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Table/Turf:</Text>
                                                <Text>{booking.item}</Text>
                                            </div>
                                        </Col>
                                        {booking.session && (
                                            <Col xs={24} sm={12} md={8} lg={8}>
                                                <div className="flex gap-4 mb-1 md:mb-5">
                                                    <Text className='font-semibold'>Session:</Text>
                                                    <Text>{booking.session}</Text>
                                                </div>
                                            </Col>
                                        )}
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
                                    </Row>
                                )}
                            </Card>
                            <p className='mt-4 text-[14px]'>
                                Thank you for choosing our service. If you have any questions or need further assistance, please do not hesitate to contact us.
                            </p>
                        </div>
                    </div>
                </Watermark>
            </Skeleton>
        </div>
    )
}

export default CustomerDetail
