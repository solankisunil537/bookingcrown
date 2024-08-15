import { Spin } from 'antd'
import React from 'react'

const contentStyle = {
    padding: 50,
    background: 'none',
    borderRadius: 4,
};
const content = <div style={contentStyle} />;

function Loader() {
    return (
        <div className=''>
            <div className='flex justify-center items-center h-screen'>
                <Spin tip="Loading..." size='large'>{content}</Spin>
            </div>
        </div>
    )
}

export default Loader
