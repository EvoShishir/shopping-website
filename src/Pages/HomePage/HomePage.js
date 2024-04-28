import Brands from "../../components/Brands/Brands";
import Categories from "../../components/Categories/Categories";
import Banner from "../../components/Banner/Banner";
import Layout from "../../components/Layout/Layout";

const HomePage = () => {
  return (
    <Layout>
      <div>
        <Banner></Banner>
        <br />
        <Brands></Brands>
        <br />
        <br />
        <Categories></Categories>
        <br />
      </div>
    </Layout>
  );
};

export default HomePage;
