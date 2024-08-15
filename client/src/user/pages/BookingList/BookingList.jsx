import React from 'react'
import Sidebar from '../../components/Sidebar'
import CommonTable from '../../components/CommonTable';

function BookingList() {
    return (
        <div className='h-[100vh]'>
            <Sidebar />
            <main className="py-4 w-full lg:w-[calc(100%-16rem)] ms-auto">
                <div className="px-4 sm:px-6 lg:px-6">
                    <div className="mb-3 flex flex-wrap">
                        <div className="w-full sm:w-1/2">
                            <h1 className="text-xl font-semibold">Booking List</h1>
                        </div>
                    </div>
                    <div>
                        <CommonTable filter={"all"} />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default BookingList
