import { Button, Card, Col, Form, Input, Row } from "antd"
import Sidebar from "../../components/Sidebar"
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../features/user/UserSlice";
import { useEffect, useState } from "react";
import { updateUserData } from "../../../api/User";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
const { Item } = Form;

function Profile() {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, status } = useSelector((state) => state.user);
    const [isFormChanged, setIsFormChanged] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const [fields, setFields] = useState([{ key: Date.now(), value: '' }])

    const addField = () => {
        setFields([...fields, { key: Date.now(), value: '' }]);
    };

    const removeField = (key) => {
        setFields(fields.filter(field => field.key !== key));
    };

    useEffect(() => {
        if (status === 'succeeded') {
            const userData = {
                name: user.data.name,
                email: user.data.email,
                mobileNumber: user.data.mobilenu,
                address: user.data.address,
                businessType: user.data.businessType,
                businessName: user.data.businessName,
                tableTurfList: user.data.itemList.length
            };
            setInitialValues(userData);
            form.setFieldsValue(userData);
            setIsFormChanged(false);
        }
    }, [status, user, form]);

    const requiredFields = [
        'name',
        'email',
        'mobileNumber',
        'address',
        'businessType',
        'businessName'
    ];

    const handleValuesChange = () => {
        const currentValues = form.getFieldsValue();
        const allFieldsPresent = requiredFields.every(field => currentValues.hasOwnProperty(field));

        if (!allFieldsPresent) {
            console.warn("Form is missing required fields");
            setIsFormChanged(false);
        } else {
            setIsFormChanged(JSON.stringify(currentValues) !== JSON.stringify(initialValues));
        }

    };

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUserData())
        }
    }, [dispatch, status])

    const onFinish = async (values) => {
        let itemList = [];
        if (values.tableTurfList) {
            const parsedTableNumber = parseFloat(values.tableTurfList);
            itemList = Array.from({ length: parsedTableNumber }, (_, i) => i + 1);
        } else {
            const farmHotelList = Object.keys(values)
                .filter(key => key.startsWith('farmHotelList_'))
                .map(key => values[key]);
            itemList = farmHotelList || [];;
        }
        const formData = {
            name: values.name,
            email: values.email,
            mobilenu: values.mobileNumber,
            businessType: values.businessType,
            businessName: values.businessName,
            address: values.address,
            itemList: itemList
        };
        try {
            await updateUserData(formData);
            navigate("/user/dashboard")
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    const renderItemList = () => {
        if (user?.data?.bookingType === "daily") {
            const existingFields = user?.data?.itemList?.map((item, i) => ({ key: i, value: item })) || [];
            const allCurrentFields = [...existingFields, ...fields];
            const fieldsToRender = allCurrentFields.length > 0 ? allCurrentFields : [{ key: 0, value: '' }];
            const shouldShowRemoveButton = fieldsToRender.length > 1;
            return (
                <>
                    <Col xs={24} sm={24} md={18} lg={16} className="mb-[10px]">
                        <Form.Item
                            label="Farms/Hotels"
                            className="mb-0"
                        >
                            {fieldsToRender.map(field => (
                                <div key={field.key} className="flex gap-2 items-center mb-[10px]">
                                    <Form.Item
                                        name={`farmHotelList_${field.key}`}
                                        initialValue={field.value}
                                        rules={[
                                            { required: true, message: 'Please input your Farm/Hotel name!' },
                                        ]}
                                        noStyle
                                    >
                                        <Input
                                            type="text"
                                            placeholder="Farm/Table"
                                            className="h-10"
                                            onChange={(e) => {
                                                const newFields = fields.map(f =>
                                                    f.key === field.key ? { ...f, value: e.target.value } : f
                                                );
                                                setFields(newFields);
                                            }}
                                        />
                                    </Form.Item>
                                    {shouldShowRemoveButton && !existingFields.some(f => f.key === field.key) && (
                                        <Button
                                            type="primary"
                                            className="h-10"
                                            onClick={() => removeField(field.key)}
                                        >
                                            X
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </Form.Item>
                    </Col>
                    <Button type="primary" className="ml-[7px] md:mt-[30px] h-10" onClick={addField}>
                        Add More
                    </Button>
                </>
            );
        }
        return null;
    };

    return (
        <div>
            <Sidebar />
            <main className="py-4 w-full lg:w-[calc(100%-16rem)] ms-auto">
                <div className="px-4 sm:px-6 lg:px-6">
                    <div className="mb-3 flex flex-wrap">
                        <div className="w-full sm:w-1/2">
                            <h1 className="text-xl font-semibold">Profile</h1>
                        </div>
                    </div>
                    <div>
                        <Form
                            layout="vertical"
                            form={form}
                            onFinish={onFinish}
                            onValuesChange={handleValuesChange}
                        >
                            <Card title="Personal Information" className="mb-4 border-gray-100 shadow-lg">
                                <Row gutter={16}>
                                    <Col xs={12} sm={12} lg={8}>
                                        <Item
                                            name="name"
                                            label="Name"
                                            rules={[{ required: true, message: 'Please input your name!' }]}
                                        >
                                            <Input
                                                type="text"
                                                placeholder="Name"
                                                className="h-10"
                                            />
                                        </Item>
                                    </Col>

                                    <Col xs={12} sm={12} lg={8}>
                                        <Item
                                            label="Your Email"
                                            name="email"
                                            rules={[
                                                { required: true, message: 'Please input your email!' },
                                                { type: 'email', message: 'The input is not valid E-mail!' }
                                            ]}
                                        >
                                            <Input
                                                placeholder="Email"
                                                className="h-10 w-full"
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
                                                className="h-10"
                                            />
                                        </Item>
                                    </Col>

                                    <Col xs={12} sm={12} lg={8}>
                                        <Item
                                            name="address"
                                            label="Address"
                                            rules={[
                                                { required: true, message: 'Please input your address!' }
                                            ]}
                                        >
                                            <TextArea
                                                type="text"
                                                placeholder="Address"
                                                className="h-10"
                                            />
                                        </Item>
                                    </Col>
                                </Row>
                            </Card>

                            <Card title="Bussiness Information" className="mb-4 border-gray-100 shadow-lg">
                                <Row gutter={16}>
                                    <Col xs={12} sm={12} lg={12}>
                                        <Item
                                            name="businessType"
                                            label="Bussiness Type"
                                            rules={[
                                                { required: true, message: 'Please input your bussiness type!' },
                                            ]}
                                        >
                                            <Input
                                                type="text"
                                                placeholder="Bussiness Type"
                                                className="h-10"
                                            />
                                        </Item>
                                    </Col>

                                    <Col xs={12} sm={12} lg={12}>
                                        <Item
                                            name="businessName"
                                            label="Bussiness Name"
                                            rules={[
                                                { required: true, message: 'Please input your bussiness name!' },
                                            ]}
                                        >
                                            <Input
                                                type="text"
                                                placeholder="Bussiness Name"
                                                className="h-10"
                                            />
                                        </Item>
                                    </Col>

                                    {user?.data?.bookingType === "hourly" ? (
                                        <Col xs={12} sm={12} lg={8}>
                                            <Item
                                                name="tableTurfList"
                                                label="Add Number Of Turf"
                                                rules={[{ required: true, message: 'Please enter a number of tables!' }]}
                                            >
                                                <Input
                                                    type="text"
                                                    placeholder="Number of Tables"
                                                    className="h-10"
                                                />
                                            </Item>
                                        </Col>
                                    ) : (
                                        renderItemList()
                                    )}
                                </Row>
                            </Card>

                            <Button
                                type="primary"
                                htmlType="submit"
                                className='h-10'
                                disabled={!isFormChanged}
                            >
                                Update Profile
                            </Button>
                        </Form>
                    </div>
                </div >
            </main >
        </div >
    )
}

export default Profile
