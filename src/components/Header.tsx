import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Navbar, Container, Button } from "react-bootstrap";
import "../styles/Header.css";
import profileIcon from "../assets/profileIcon.svg";
import searchIcon from "../assets/searchIcon.svg";

interface HeaderProps {
  pageTitle: string;
  showSearchIcon?: boolean;
}

function Header({ pageTitle, showSearchIcon = true }: HeaderProps) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  return (
    <>
      <Navbar expand="lg" className="header-container">
        <Container className="d-flex justify-content-between align-items-center">
          <Link to="/profile" className="navbar-brand mt-5">
            <img
              src={profileIcon}
              alt="Profile"
              data-testid="profile-top-btn"
              className="profile-icon"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>

          <h1 data-testid="page-title" className="page-title mt-5">
            {pageTitle}
          </h1>

          {showSearchIcon && (
            <>
              <img
                src={searchIcon}
                alt="Search"
                data-testid="search-top-btn"
                className="search-icon mt-5"
                style={{ filter: "brightness(0) invert(1)", cursor: "pointer" }}
                onClick={toggleSearch}
              />
            </>
          )}
        </Container>
      </Navbar>

      {isSearchVisible && (
        <div className="search-bar">
          <SearchBar />
        </div>
      )}
    </>
  );
}

export default Header;
