import {useEffect, useState} from "react";
import {bookingDraft, bookingPaid, bookingOnProgress, bookingAll} from "../service/ticketAdminService.js";
import Admin from "./Navbar.jsx";

const Order = () => {
    const [BookingAlls, setBookingAll] = useState([]);
    const [BookingDrafts, setBookingDraft] = useState([]);
    const [BookingOnProgress, setBookingOnProgress] = useState([]);
    const [BookingPaids, setBookingPaid] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const all = await bookingAll();
                const draft = await bookingDraft();
                const onProgress = await bookingOnProgress();
                const paid = await bookingPaid();

                if (isMounted) {
                    setBookingAll(all);
                    setBookingDraft(draft);
                    setBookingOnProgress(onProgress);
                    setBookingPaid(paid);
                }
            } catch (error) {
                console.error("Error fetching booking data:", error);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    const [activeTab, setActiveTab] = useState('all');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="h-screen flex flex-col bg-[#F7F9FA]">
            <Admin/>
            <div className="w-full h-full  px-[7.25rem]  pt-9 ">
                <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                    <div className="text-5xl text-center mb-6">Manage orders</div>
                    <div className="flex items-center mb-4 order-tab justify-center">
                        <button
                            type="button"
                            onClick={() => handleTabClick('all')}
                            className={`${
                                activeTab === 'all' ? 'active ' : ''
                            }bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4 rounded-tl-md rounded-bl-md hover:text-gray-600`}
                        >
                            All
                        </button>
                        <button
                            type="button"
                            onClick={() => handleTabClick('draft')}
                            className={`${
                                activeTab === 'draft' ? 'active ' : ''
                            }bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4 hover:text-gray-600`}
                        >
                            Draft
                        </button>
                        <button
                            type="button"
                            onClick={() => handleTabClick('onprogress')}
                            className={`${
                                activeTab === 'onprogress' ? 'active ' : ''
                            }bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4 hover:text-gray-600`}
                        >
                            On Progress
                        </button>
                        <button
                            type="button"
                            onClick={() => handleTabClick('paid')}
                            className={`${
                                activeTab === 'paid' ? 'active ' : ''
                            }bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4 rounded-tr-md rounded-br-md hover:text-gray-600`}
                        >
                            Paid
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <table className={`${activeTab === 'all' ? '' : 'hidden'} w-full ml-52 mr-52`}>
                            <thead>
                            <tr>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Direction</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">User</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Home Town</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Destination</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Quantity</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Status</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {BookingAlls.map((BookingAll) => (
                                <tr key={BookingAll.ticket_booking_id}>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-gray-600 text-sm font-medium hover:text-blue-500 truncate">{BookingAll.Direction.direction}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">{BookingAll.User.first_name}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">{BookingAll.HomeTown.place}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">{BookingAll.DestinationCity.place}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">{BookingAll.quantity}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                  <span className={`inline-block p-1 rounded font-medium text-[12px] leading-none ${
                                      BookingAll.Status.status === 'Draft' ? 'bg-blue-500/10 text-blue-500' :
                                          BookingAll.Status.status === 'Onprogress' ? 'bg-yellow-500/10 text-yellow-500' :
                                              BookingAll.Status.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : ''}`}>
                                    {BookingAll.Status.status}
                                  </span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <a href={`/order/detail/` + BookingAll.ticket_booking_id}>
                                            <button
                                                type="button"
                                                className={`bg-blue-600 text-sm font-medium text-white py-2 px-4 rounded-tl-md rounded-bl-md rounded-br-md rounded-tr-md`}>
                                                Detail
                                            </button>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <table className={`w-full ml-52 mr-52 ${activeTab === 'draft' ? '' : 'hidden'}`}>
                            <thead>
                            <tr>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Direction</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">User</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Home Town</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Destination</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Quantity</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Status</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {BookingDrafts.map((BookingDraft) => (
                                <tr key={BookingDraft.ticket_booking_id}>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-gray-600 text-sm font-medium hover:text-blue-500 truncate">{BookingDraft.Direction.direction}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">{BookingDraft.User.first_name}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">{BookingDraft.HomeTown.place}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">{BookingDraft.DestinationCity.place}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">{BookingDraft.quantity}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-blue-500/10 text-blue-500 font-medium text-[12px] leading-none">{BookingDraft.Status.status}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <a href={`/order/detail/` + BookingDraft.ticket_booking_id}>
                                            <button
                                                type="button"
                                                className={`bg-blue-600 text-sm font-medium text-white py-2 px-4 rounded-tl-md rounded-bl-md rounded-br-md rounded-tr-md`}>
                                                Detail
                                            </button>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <table className={`w-full ml-52 mr-52 ${activeTab === 'onprogress' ? '' : 'hidden'}`}>
                            <thead>
                            <tr>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Direction</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">User</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Home Town</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Destination</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Quantity</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Status</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {BookingOnProgress.map((BookingOnProgres) => (
                                <tr key={BookingOnProgres.ticket_booking_id}>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 truncate">{BookingOnProgres.Direction.direction}</a>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">{BookingOnProgres.User.first_name}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">{BookingOnProgres.HomeTown.place}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">{BookingOnProgres.DestinationCity.place}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">{BookingOnProgres.quantity}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-yellow-500/10 text-yellow-500 font-medium text-[12px] leading-none">{BookingOnProgres.Status.status}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <button
                                            type="button"
                                            className={`bg-blue-600 text-sm font-medium text-white py-2 px-4 rounded-tl-md rounded-bl-md rounded-br-md rounded-tr-md`}>
                                            <a href={`/order/detail/` + BookingOnProgres.ticket_booking_id}>Detail</a>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <table className={`w-full ml-52 mr-52 ${activeTab === 'paid' ? '' : 'hidden'}`}>
                            <thead>
                            <tr>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Direction</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">User</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Home Town</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Destination</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Quantity</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Status</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {BookingPaids.map((BookingPaid) => (
                                <tr key={BookingPaid.ticket_booking_id}>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 truncate">{BookingPaid.Direction.direction}</a>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">{BookingPaid.User.first_name}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">{BookingPaid.HomeTown.place}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">{BookingPaid.DestinationCity.place}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">{BookingPaid.quantity}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">{BookingPaid.Status.status}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <a href={`/order/detail/` + BookingPaid.ticket_booking_id}>
                                            <button
                                                type="button"
                                                className={`bg-blue-600 text-sm font-medium text-white py-2 px-4 rounded-tl-md rounded-bl-md rounded-br-md rounded-tr-md`}>
                                                Detail
                                            </button>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default  Order;
