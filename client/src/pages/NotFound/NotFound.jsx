import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../../common/Footer';

function NotFound() {
    const navigate = useNavigate();
    return (
        <section className='bg-[#f1fafb]'>
            <main className='min-h-screen flex flex-col justify-center items-center py-8 px-4'>
                <div className='max-w-2xl w-full text-center'>
                    <h1 className='font-semibold text-3xl md:text-4xl text-themeColor mb-4'>
                        404 - Page Not Found
                    </h1>

                    <div className='text-center mt-6 text-slate-400'>
                        <p>
                            Sorry, the page you’re looking for doesn’t exist.
                            It looks like you’ve hit a dead end. The page you’re trying to reach might have been moved, deleted, or never existed.
                        </p>
                    </div>
                    <Button type='primary' className='h-10 mt-5' onClick={() => navigate("/")}>
                        Go Back To Home
                    </Button>
                </div>
            </main>

            <Footer />
        </section>
    )
}

export default NotFound
