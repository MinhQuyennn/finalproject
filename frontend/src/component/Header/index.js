import React, { useEffect, useState } from "react";
import styles from "./style.css";
import { Link } from "react-router-dom";
import logout from "../../assets/img/icons8-logout-100.png";

function Header() {
  const [isSticky, setSticky] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [fullName, setFullName] = useState(false);
  const [isUserDialogOpen, setUserDialogOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleUserIconClick = () => {
    setUserDialogOpen((prevOpen) => !prevOpen);
  };

  const handleUserDialogClose = () => {
    setUserDialogOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accountID");
    localStorage.removeItem("currentRole");
    window.location.href = "/";
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleUserDialogClose();
    }
  };

  useEffect(() => {
    const fetchFullName = async () => {
      try {
        const accountID = localStorage.getItem("accountID");
        console.log("accountIDheader:", accountID);

        const currentRole = localStorage.getItem("currentRole");
        let endpoint = "";

        if (currentRole === "customer") {
          endpoint = `/getFullNameByIDCustomer/${accountID}`;
        } else if (currentRole === "manager") {
          endpoint = `/getFullNameByIDManager/${accountID}`;
        } else if (currentRole === "employee") {
          endpoint = `/getFullNameByIDEmployee/${accountID}`;
        }

        const response = await fetch(`http://localhost:8081${endpoint}`);

        if (response.ok) {
          const data = await response.json();

          console.log("Response:", response);
          console.log("Data:", data);

          if (data.Manager && data.Manager.length > 0) {
            setFullName(data.Manager[0].fullname);
          } else if (data.Employee && data.Employee.length > 0) {
            setFullName(data.Employee[0].fullname);
          } else if (data.Customer && data.Customer.length > 0) {
            setFullName(data.Customer[0].fullname);
          } else {
            console.warn("Full name not found for the user.");
          }
        } else {
          console.error("Failed to fetch full name:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching full name:", error);
      }
    };

    fetchFullName();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (localStorage.getItem("currentRole") === "customer") {
    return (
      <header className={`header ${isSticky ? "sticky" : ""}`}>
        <Link to="/home" className="logo">
          <span>Train Booking</span>
        </Link>

        <ul className={`navlist ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/route">Home</Link>
          </li>
          <li>
            <Link to="/home/viewTicket">View Ticket History</Link>
          </li>
          <li>
            <Link to="/home/viewProfile/${accountID}">View Profile</Link>
          </li>
          <li>
            <Link to="/home/contactUs">Contact Us</Link>
          </li>
        </ul>

        <div className="top-btnn">
          <div className="accountName">{fullName}</div>
          <div className="logout" onClick={handleLogout}>
            <img src={logout}></img>
          </div>
        </div>
      </header>
    );
  } else if (localStorage.getItem("currentRole") === "manager") {
    return (
      <header className={`header ${isSticky ? "sticky" : ""}`}>
        <Link to="/homepageManager" className="logo">
          <span>Train Booking</span>
        </Link>

        <ul className={`navlist ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/homepageManager">Home</Link>
          </li>
          <li>
            <Link to="/homepageManager/viewProfile/${accountID}">
              View Profile
            </Link>
          </li>
          <li>
            <Link to="/homepageManager/viewEmployee">View Employee</Link>
          </li>
        </ul>

        <div className="top-btnn">
          <div className="accountName">{fullName}</div>
          <div className="logout" onClick={handleLogout}>
            <img src={logout}></img>
          </div>
        </div>
      </header>
    );
  } else if (localStorage.getItem("currentRole") === "employee") {
    return (
      <header className={`header ${isSticky ? "sticky" : ""}`}>
        <Link to="/homepageEmployee" className="logo">
          <span>Train Booking</span>
        </Link>

        <ul className={`navlist ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/homepageEmployee/Train">Train</Link>
          </li>
          <li>
            <Link to="/homepageEmployee/Route">Route</Link>
          </li>
          <li>
            <Link to="/homepageEmployee/Station">Station</Link>
          </li>
          <li>
            <Link to="/homepageEmployee/Trip">Trip</Link>
          </li>
          <li>
            <Link to="/homepageEmployee/Ticket">Ticket</Link>
          </li>
          <li>
            <Link to="/homepageEmployee/viewUser">View User</Link>
          </li>
        </ul>

        <div className="top-btnn">
          <div className="accountName">{fullName}</div>
          <div className="logout" onClick={handleLogout}>
            <img src={logout}></img>
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header className={`header ${isSticky ? "sticky" : ""}`}>
        <Link to="/home" className="logo">
          <span>Train Booking</span>
        </Link>
        <Link to="/">
          <div className="bx bx-menu" id="menu-icon"></div>
        </Link>
      </header>
    );
  }
}

export default Header;
