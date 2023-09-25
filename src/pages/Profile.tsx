import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  return (
    <div>
      <h1>
        <Header pageTitle="Profile" showSearchIcon={ false } />
      </h1>
      <Footer />
    </div>
  );
}

export default Profile;
