import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Navbar, Container, Button } from "react-bootstrap";
import "../styles/Header.css";

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
    <Navbar expand="lg" className="header-container">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Link para o perfil */}
        <Link to="/profile" className="navbar-brand mt-5">
          <img
            src="src/assets/profileIcon.svg"
            alt="Profile"
            data-testid="profile-top-btn"
            className="profile-icon"
            style={{ filter: "brightness(0) invert(1)" }} // Ícone branco
          />
        </Link>

        {/* Título da página */}
        <h1 data-testid="page-title" className="page-title mt-5">
          {pageTitle}
        </h1>

        {/* Ícone de busca como imagem */}
        {showSearchIcon && (
          <>
            <img
              src="src/assets/searchIcon.svg"
              alt="Search"
              data-testid="search-top-btn"
              className="search-icon mt-5"
              style={{ filter: "brightness(0) invert(1)", cursor: "pointer" }} // Ícone branco
              onClick={toggleSearch} // Ação de toggle ao clicar no ícone
            />
            {isSearchVisible && (
              <div className="search-bar">
                <SearchBar />
              </div>
            )}
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
