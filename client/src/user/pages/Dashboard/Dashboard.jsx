import React, { useEffect, useState } from 'react';
import { Button, Tabs } from 'antd';
import Sidebar from '../../components/Sidebar';
import CommonTable from '../../components/CommonTable';
import { fetchUserData } from '../../../features/user/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaList, FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

function Dashboard() {
    const [activeKey, setActiveKey] = useState('1');
    const { status } = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUserData())
        }
    }, [dispatch, status])

    return (
        <div>
            <Sidebar />
            <main className="py-4 w-full lg:w-[calc(100%-16rem)] ms-auto">
                <div className="px-4 sm:px-6 lg:px-6">
                    <div className="mb-3">
                        <div className="w-full flex flex-col md:flex-row md:justify-between items-start md:items-center">
                            <div className="mb-2 md:mb-0">
                                <h1 className="text-xl font-semibold">Dashboard</h1>
                            </div>
                            <div className="flex gap-2">
                                <Button type="primary" onClick={() => navigate("/user/add-booking")}>
                                    <FaPlus /> New Booking
                                </Button>
                                <Button type="primary" onClick={() => navigate("/user/booking-list")}>
                                    <FaList />Booking List
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Tabs
                            defaultActiveKey="1"
                            activeKey={activeKey}
                            onChange={(key) => setActiveKey(key)}
                        >
                            <TabPane tab="Upcoming Bookings" key="1">
                                <CommonTable filter="upcoming" />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
