import { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <header>
      <Link to="/profile">
        <img
          src="src/images/profileIcon.svg"
          alt="Profile"
          data-testid="profile-top-btn"
        />
      </Link>
      {showSearchIcon && (
        <>
          <button onClick={ toggleSearch }>
            <img
              src="src/images/searchIcon.svg"
              alt="Search"
              data-testid="search-top-btn"
            />
          </button>
          {isSearchVisible && (
            <input
              type="text"
              placeholder="Search"
              data-testid="search-input"
              onBlur={ toggleSearch }
            />
          )}
        </>
      )}
      <h1 data-testid="page-title">{pageTitle}</h1>
    </header>
  );
}

export default Header;
