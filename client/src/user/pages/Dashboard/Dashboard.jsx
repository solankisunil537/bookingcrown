import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import Sidebar from '../../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../../features/user/UserSlice';
import CommonTable from '../../components/CommonTable';

const { TabPane } = Tabs;

function Dashboard() {
    const [activeKey, setActiveKey] = useState('1');
    const dispatch = useDispatch()
    const { user, status } = useSelector((state) => state.user);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUserData())
        }
    }, [dispatch])

    return (
        <div>
            <Sidebar />
            <main className="py-4 w-full lg:w-[calc(100%-16rem)] ms-auto">
                <div className="px-4 sm:px-6 lg:px-6">
                    <div className="mb-3 flex flex-wrap">
                        <div className="w-full sm:w-1/2">
                            <h1 className="text-xl font-semibold">Dashboard</h1>
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
                                {/* {user.data?.bookingType === "hourly" ? (<HourlyTable filter="upcoming" />) : (<DailyTable filter="upcoming" />)} */}

                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
