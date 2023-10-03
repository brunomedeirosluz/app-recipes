import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileComponent() {
  const [user, setUser] = useState({ email: '' });
  const navigate = useNavigate();

  const handleClickRecipes = () => {
    navigate('/done-recipes');
  };

  const handleClickFavorite = () => {
    navigate('/favorite-recipes');
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <section>
      <h3 data-testid="profile-email">
        {user.email || 'Email not found'}
      </h3>
      <button
        onClick={ handleClickRecipes }
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        onClick={ handleClickFavorite }
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ handleLogout }
      >
        Logout
      </button>
    </section>
  );
}

export default ProfileComponent;
