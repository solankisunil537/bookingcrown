export const getUserRole = () => {
    const role = localStorage.getItem('role');
    return role;
};

export const getToken = () => {
    const token = localStorage.getItem('token');
    return token;
};