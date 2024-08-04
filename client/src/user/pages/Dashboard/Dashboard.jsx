import React, { useState } from 'react';
import { Tabs } from 'antd';
import Sidebar from '../../components/Sidebar';
import CommonTable from '../../components/CommonTable';

const { TabPane } = Tabs;

function Dashboard() {
    const [activeKey, setActiveKey] = useState('1');

    return (
        <div>
            <Sidebar />
            <main className="py-4 w-full lg:w-[calc(100%-15rem)] ms-auto">
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
                                <CommonTable filter={"upcoming"} />
                            </TabPane>
                            <TabPane tab="Current Month Bookings" key="2">
                                <CommonTable filter={'currentMonth'} />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
