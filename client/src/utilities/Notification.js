import { notification } from 'antd';

const openNotification = (type, message, description) => {
    notification[type]({
        message,
        description,
        placement: 'topRight',
        duration: 3,
    });
};

const Notification = {
    success: (message, description) => openNotification('success', message, description),
    error: (message, description) => openNotification('error', message, description),
    info: (message, description) => openNotification('info', message, description),
    warning: (message, description) => openNotification('warning', message, description),
};

export default Notification;
