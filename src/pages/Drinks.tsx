import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <div>
      <h1>
        <Header pageTitle="Drinks" showSearchIcon />
      </h1>
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
