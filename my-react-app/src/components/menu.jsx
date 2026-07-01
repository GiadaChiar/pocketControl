
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";




function Menu() {


    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    //logic to change text in base of width of the display
    const [isSmall, setSmall] = useState(window.innerWidth < 500) //display < 500 true


    //follow this code
    useEffect(() => {

        const handleSize = () => {
            setSmall(window.innerWidth < 500);
        }

        window.addEventListener("resize", handleSize);

        return () => {
            window.removeEventListener("resize", handleSize);
        };

    }, []);//only one 




    return (
        <>
            <nav className="navbar bg-white border-buttom fixed-top">
                <div className="container-fluid">
                    {/* Change text > 500*/}
                    <Link className="navbar-brand" to="/">
                        {isSmall ? "Gestisci le tue finanze" : "Inizia oggi a risparmiare con noi!"}
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasDarkNavbar"
                        aria-controls="offcanvasDarkNavbar"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="offcanvas offcanvas-end text-bg-dark"
                        id="offcanvasDarkNavbar"
                        aria-labelledby="offcanvasDarkNavbarLabel"
                    >
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="NavbarLabel">
                                Naviga
                            </h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${location.pathname === "/login" ? "disabled-link" : ""}`}
                                        to="/login"
                                        onClick={(e) => {
                                            if (location.pathname === "/login") {
                                                e.preventDefault();
                                            }
                                        }}
                                        aria-disabled={location.pathname === "/login"}
                                    >
                                        Accedi
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${location.pathname === "/register" ? "disabled-link" : ""}`}
                                        to="/register"
                                        onClick={(e) => {
                                            if (location.pathname === "/register") {
                                                e.preventDefault();
                                            }
                                        }}
                                        aria-disabled={location.pathname === "/register"}
                                    >
                                        Registrati
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${location.pathname === "/dashboard" ? "disabled-link" : ""}`}
                                        to="/dashboard"
                                        onClick={(e) => {
                                            if (location.pathname === "/dashboard") {
                                                e.preventDefault();
                                            }
                                        }}
                                        aria-disabled={location.pathname === "/dashboard"}
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${location.pathname === "/insert" ? "disabled-link" : ""}`}
                                        to="/insert"
                                        onClick={(e) => {
                                            if (location.pathname === "/insert") {
                                                e.preventDefault();
                                            }
                                        }}
                                        aria-disabled={location.pathname === "/insert"}
                                    >
                                        Inserimenti
                                    </Link>
                                </li>
                                <li className="nav-item out">
                                    <button className="nav-link btn btn-link" data-bs-dismiss="offcanvas" onClick={handleLogout} >
                                        Esci
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Menu;
