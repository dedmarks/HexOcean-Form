import Header from "../layouts/Header";
import Form from "../components/DishForm";
import "../styles/HomeScreen.scss";

const HomeScreen = () => {
  return (
    <div className="home_container">
      <Header />
      <Form />
    </div>
  );
};

export default HomeScreen;
