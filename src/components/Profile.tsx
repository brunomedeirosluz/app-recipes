import { Link, useNavigate } from 'react-router-dom';

function ProfileComponent() {
  const storedData = localStorage.getItem('user');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  let email = '';
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      email = parsedData.email;
    } catch (error) {
      console.error('email not found');
    }
  }

  return (
    <section>
      <h3 data-testid="profile-email">
        {email || 'Email not found'}
      </h3>
      <Link to="/done-recipes">
        <button data-testid="profile-done-btn">
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button data-testid="profile-favorite-btn">
          Favorite Recipes
        </button>
      </Link>
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
