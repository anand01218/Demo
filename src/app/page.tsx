//@refresh
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/components/layouts/DefaultWrapper";
import DashboardRouter from "@/components/pagesUI/apps/home/DashboardRouter";

const Home = () => {
  return (
    <>
      <MetaData pageTitle="HRM Dashboard">
        <Wrapper>
          <div className="w-full max-w-full overflow-x-hidden">
            <DashboardRouter />
          </div>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default Home;
