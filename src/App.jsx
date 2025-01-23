import './App.css';
import HeaderSlider from './components/HeaderSlider.jsx';
import NavigationBar from './components/NavigationBar.jsx';
import HeaderCategories from './components/HeaderCategories.jsx';
import HeaderSearchBar from './components/HeaderSearchBar.jsx';
import ProductCard from './components/ProductCard.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer.jsx';

function App() {
  const products = [1, , 3, 4, 5, 6, 7, 8, 9]; //For testing purposes
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        gap: '2rem'
      }}
    >
      <NavigationBar />
      <HeaderCategories />
      <HeaderSearchBar />
      <HeaderSlider />
      <div
        className='d-flex flex-wrap justify-center'
        style={{ gap: '10px' }}
      >
        {products.map((product) => {
          return <ProductCard />;
        })}
      </div>
      <HeaderSlider />

      <Footer></Footer>
    </div>
  );
}

export default App;
