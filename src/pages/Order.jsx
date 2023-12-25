import {useEffect, useState} from "react";
import {bookingDraft, bookingPaid, bookingOnProgress, bookingAll} from "../service/ticketAdminService.js";
import Admin from "./Navbar.jsx";
import {Button, IconButton} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import {Backdrop, CircularProgress} from "@mui/material";

const Order = () => {
    const [BookingAlls, setBookingAll] = useState([]);
    const [BookingDrafts, setBookingDraft] = useState([]);
    const [BookingOnProgress, setBookingOnProgress] = useState([]);
    const [BookingPaids, setBookingPaid] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);

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
                    setLoading(false);
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
        setCurrentPage(1);
    };

    const getTotalPagesAndItems = () => {
        let data;
        switch (activeTab) {
            case 'all':
                data = BookingAlls;
                break;
            case 'draft':
                data = BookingDrafts;
                break;
            case 'onprogress':
                data = BookingOnProgress;
                break;
            case 'paid':
                data = BookingPaids;
                break;
            default:
                data = BookingAlls;
        }

        const totalPages = Math.ceil(data.length / itemsPerPage);
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

        return { totalPages, currentItems };
    };

    const { totalPages, currentItems } = getTotalPagesAndItems();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        };
        return date.toLocaleDateString('id-ID', options)
    };

    return (
        <div className="h-screen flex flex-col bg-[#F7F9FA]">
            {
                loading === true
                    ?             <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    : null
            }
            <Admin/>
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
                {currentItems.length === 0 ?
                    <span className={`text-red-500 justify-center flex`}>No Data.</span>
                    :
                    <div className="flex justify-center">
                        <table className={`w-full ml-52 mr-52 ${activeTab === 'all' ? '' : 'hidden'}`}>
                            <thead>
                            <tr>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">User</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Direction</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Home
                                    Town
                                </th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Destination</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Quantity</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Status</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Created
                                    At
                                </th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems.map((Booking) => (
                                <tr key={Booking.ticket_booking_id}>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-gray-600 text-sm font-medium hover:text-blue-500 truncate">{Booking.User.first_name}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span
                                                className="text-[13px] font-medium text-gray-400">{Booking.Direction.direction}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-gray-400">{Booking.HomeTown.place}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span
                                                className="text-[13px] font-medium text-gray-400">{Booking.DestinationCity.place}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span
                                                className="text-[13px] font-medium text-gray-400">{Booking.quantity}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                  <span className={`inline-block p-1 rounded font-medium text-[12px] leading-none ${
                                      Booking.Status.status === 'Draft' ? 'bg-blue-500/10 text-blue-500' :
                                          Booking.Status.status === 'Onprogress' ? 'bg-yellow-500/10 text-yellow-500' :
                                              Booking.Status.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : ''}`}>
                                    {Booking.Status.status}
                                  </span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span
                                                className="text-[13px] font-medium text-gray-400">{formatDate(Booking.created_at)}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <a href={`/order/detail/` + Booking.ticket_booking_id}>
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
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">User</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Direction</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Home Town</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Destination</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Quantity</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Status</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Created At</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems.map((Booking) => (
                                <tr key={Booking.ticket_booking_id}>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span
                                            className="text-gray-600 text-sm font-medium hover:text-blue-500 truncate">{Booking.User.first_name}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span
                                            className="text-[13px] font-medium text-gray-400">{Booking.Direction.direction}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span
                                            className="text-[13px] font-medium text-gray-400">{Booking.HomeTown.place}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span
                                            className="text-[13px] font-medium text-gray-400">{Booking.DestinationCity.place}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span
                                            className="text-[13px] font-medium text-gray-400">{Booking.quantity}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span
                                            className="inline-block p-1 rounded bg-blue-500/10 text-blue-500 font-medium text-[12px] leading-none">{Booking.Status.status}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span
                                            className="text-[13px] font-medium text-gray-400">{formatDate(Booking.created_at)}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <a href={`/order/detail/` + Booking.ticket_booking_id}>
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
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">User</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Direction</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Home Town</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Destination</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Quantity</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Status</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Created At</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems.map((Booking) => (
                                <tr key={Booking.ticket_booking_id}>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <a href="#"
                                           className="text-gray-600 text-sm font-medium hover:text-blue-500 truncate">{Booking.User.first_name}</a>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span
                                            className="text-[13px] font-medium text-gray-400">{Booking.Direction.direction}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span
                                            className="text-[13px] font-medium text-gray-400">{Booking.HomeTown.place}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span
                                            className="text-[13px] font-medium text-gray-400">{Booking.DestinationCity.place}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span
                                            className="text-[13px] font-medium text-gray-400">{Booking.quantity}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span
                                            className="inline-block p-1 rounded bg-yellow-500/10 text-yellow-500 font-medium text-[12px] leading-none">{Booking.Status.status}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span
                                            className="text-[13px] font-medium text-gray-400">{formatDate(Booking.created_at)}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <button
                                            type="button"
                                            className={`bg-blue-600 text-sm font-medium text-white py-2 px-4 rounded-tl-md rounded-bl-md rounded-br-md rounded-tr-md`}>
                                            <a href={`/order/detail/` + Booking.ticket_booking_id}>Detail</a>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <table className={`w-full ml-52 mr-52 ${activeTab === 'paid' ? '' : 'hidden'}`}>
                            <thead>
                            <tr>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">User</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Direction</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Home Town</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Destination</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Quantity</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Status</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Created At</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-black py-2 px-4 bg-gray-100 text-left">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                currentItems.map((Booking) => (
                                    <tr key={Booking.ticket_booking_id}>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 truncate">{Booking.User.first_name}</a>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-gray-400">{Booking.Direction.direction}</span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-gray-400">{Booking.HomeTown.place}</span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-gray-400">{Booking.DestinationCity.place}</span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-gray-400">{Booking.quantity}</span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">{Booking.Status.status}</span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-gray-400">{formatDate(Booking.created_at)}</span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <a href={`/order/detail/` + Booking.ticket_booking_id}>
                                                <button
                                                    type="button"
                                                    className={`bg-blue-600 text-sm font-medium text-white py-2 px-4 rounded-tl-md rounded-bl-md rounded-br-md rounded-tr-md`}>
                                                    Detail
                                                </button>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                }
                    <div className={`flex justify-center gap-4 mt-7`}>
                        { currentItems.length !== 0 ?
                            <Button
                            variant="text"
                            className="flex items-center gap-2"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage <= 1}
                        >
                            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4"/> Previous
                        </Button>
                            : null
                        }
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <IconButton key={index}
                            onClick={() => setCurrentPage(index + 1 )}
                            className={index + 1 === currentPage ? 'bg-blue-500 text-white items-center flex justify-center' : 'text-black items-center justify-center flex'}
                        >
                            {index + 1}
                        </IconButton>
                        ))}
                        { currentItems.length !== 0 ?
                            <Button
                            variant="text"
                            className="flex items-center gap-2"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage >= totalPages}
                        >
                            Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4"/>
                        </Button>
                            : null
                        }
                    </div>
            </div>
        </div>
    );
}
export default  Order;
