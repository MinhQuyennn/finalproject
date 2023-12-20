import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {
  const pathBackEnd = "http://localhost:8081";
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


  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
        handleUserDialogClose();
    }
};

  useEffect(() => {
    // Fetch the user's full name from the server based on the account ID
    const fetchFullName = async () => {
      try {
        const accountID = localStorage.getItem('accountID');
        const response = await fetch(`http://localhost:8081/getFullNameByID/${accountID}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setFullName(data.Account[0].full_name);
        }
      } catch (error) {
        console.error('Error fetching full name:', error);
      }
    };
    fetchFullName();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 120);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const dialog = document.querySelector('.dialog');
    
      if (isUserDialogOpen && dialog && !dialog.contains(event.target)) {
        // Clicked outside the open dialog, close it
        handleUserDialogClose();
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  if (localStorage.getItem("currentRole") === 'user') {
    return (
      <header className={cx('header', { sticky: isSticky })}>
        <Link to="/home" className={cx('logo')}>
                  Code<span>Xplore</span>
        </Link>
      

        <ul className={cx('navlist', { active: isMenuOpen })}>
          <li><a href="#">Home</a></li>
          <li>
            <a href="#about">About</a>

            </li>
          <li><a href="#services">Services</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <span className={cx('top-btnn')} onClick={handleUserIconClick}>
          <div className='accountName'>{fullName}</div>
        </span>

      </header>
    )
  }
  else if (localStorage.getItem("currentRole") === 'admin') {
    return (
      <header className={cx('header', { sticky: isSticky })}>
        <Link to="/homeAd" className={cx('logo')}>
        Code<span>Xplore</span>
        </Link>
      

        <ul className={cx('navlist', { active: isMenuOpen })}>
          <li>
            <Link to="/homeAd">
              Home
            </Link>
          </li>
          <li>
            <Link to="/homeAd/viewUser">
              View User
            </Link></li>
          <li>
            <Link to="/homeAd/viewBooking">
             View Booking
            </Link>
          </li>
        </ul>

        <span className={cx('top-btnn')} onClick={handleUserIconClick}>
          <div className='accountName'>{fullName}</div>
        </span>

      </header>

    )
  }
  else {
    return (
      <header className={cx('header', { sticky: isSticky })}>
              <Link to="/home" className={cx('logo')}>
                    Code<span>Xplore</span>
            </Link>
            <Link to ="/">
        <div
          className={cx('bx', 'bx-menu')}
          id="menu-icon"
        >       
        </div>
        </Link>
      </header>
    )
  }
}

export default Header;
