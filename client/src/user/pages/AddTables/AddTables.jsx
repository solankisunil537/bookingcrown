import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import Sidebar from '../../components/Sidebar';
import { createTableList } from '../../../api/Table';

const AddTables = () => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            // await createTableList(values)
            form.resetFields();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Sidebar />
            <main className="py-4 w-full lg:w-[calc(100%-15rem)] ms-auto">
                <div className="px-4 sm:px-6 lg:px-6">
                    <div className="mb-3 flex flex-wrap">
                        <div className="w-full sm:w-1/2">
                            <h1 className="text-xl font-semibold">Add Table List</h1>
                        </div>
                    </div>
                    <Card className='w-1/2 p-ato'>
                        <Form
                            form={form}
                            onFinish={handleSubmit}
                            layout="vertical"
                            autoComplete="off"
                        >
                            <Card style={{ marginBottom: '16px' }}>
                                <Form.Item
                                    name="tableNumber"
                                    label="Add Number Of Tables"
                                    rules={[{ required: true, message: 'Please input the table number!' }]}
                                >
                                    <Input type='number' placeholder="Table Number" className='h-10' />
                                </Form.Item>
                            </Card>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Save</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default AddTables;
