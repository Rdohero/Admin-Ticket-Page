import Swal from "sweetalert2";

const Admin = () => {
    const logOut = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            buttonsStyling: true
        });
        swalWithBootstrapButtons.fire({
            title: "Apakah Kamu yakin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#DC3545",
            confirmButtonText: "Yes, Log Out!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                window.localStorage.clear();
                window.sessionStorage.clear();
                window.location.href = "/";
            }
        });
    };

    return (
        <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Admin</span>
                </a>
                <a onClick={logOut} className="text-[20px] block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Log Out</a>
            </div>
        </nav>

    );
};


export default Admin;