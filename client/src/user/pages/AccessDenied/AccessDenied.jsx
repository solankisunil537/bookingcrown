import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Contact from '../../../common/Contact';
import Footer from '../../../common/Footer';

function AccessDenied() {
    const navigate = useNavigate();

    return (
        <section className='bg-[#f1fafb]'>
            <main className='min-h-screen flex flex-col justify-center items-center py-8 px-4'>
                <div className='max-w-2xl w-full text-center'>
                    <h1 className='font-semibold text-3xl md:text-4xl text-red-500 mb-4'>
                        Access Denied!
                    </h1>
                    <p className='text-slate-400 mb-6'>
                        We regret to inform you that access to your account is currently restricted due to the absence of an active plan associated with your account.
                        To gain access, please contact our support team to review your account status and resolve the issue.
                    </p>
                    <Contact />
                    <div className='text-center mt-6 text-slate-400'>
                        <p>Thank you for your understanding and cooperation.</p>
                    </div>
                    <Button type='primary' className='h-10 mt-5' onClick={() => navigate("/")}>
                        Go Back To Home
                    </Button>
                </div>
            </main>

            <Footer />
        </section>
    );
}

export default AccessDenied;
