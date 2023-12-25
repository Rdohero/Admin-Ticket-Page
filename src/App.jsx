import { Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Order from "./pages/Order.jsx";
import OrderDetail from "./pages/OrderDetail.jsx";
import Suggestion from "./pages/Suggestion.jsx";
import 'flowbite-datepicker';
import 'flowbite/dist/datepicker.turbo.js';

function App() {
    const loggedIn = window.sessionStorage.getItem("isLoggedIn");
    const loggedIn1 = window.localStorage.getItem("isLoggedIn");
    return (
        <Routes>
            <Route
                path="/"
                element={
                    (loggedIn || loggedIn1) ? (
                        <Order />
                    ) : (
                        <Login />
                    )
                }
            />
            <Route path="/order/detail/:id" element={<OrderDetail />} />
            <Route path="/order/detail/suggestion/:id" element={<Suggestion />} />
        </Routes>
    )
}

export default App
