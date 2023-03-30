import Brands from "../../components/Brands/Brands";
import Categories from "../../components/Categories/Categories";
import Banner from "../../components/Banner/Banner";
import Layout from "../../components/Layout/Layout";

const HomePage = () => {
  return (
    <Layout>
      <div>
        <Banner></Banner>
        <Brands></Brands>
        <Categories></Categories>
      </div>
    </Layout>
  );
};

export default HomePage;
