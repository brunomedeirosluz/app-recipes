import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileComponent from '../components/Profile';

function Profile() {
  return (
    <div>
      <h1>
        <Header pageTitle="Profile" showSearchIcon={ false } />
      </h1>
      <ProfileComponent />
      <Footer />
    </div>
  );
}

export default Profile;
