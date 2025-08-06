import useGetRoot from "../api/useGetRoot";

const Home = () => {
  const { data, isLoading } = useGetRoot();

  return (
    <div>
      <h1 className="text-3xl font-semibold text-green-500/60">
        Welcome to home screen.
      </h1>

      {isLoading && (
        <p className="text-blue-400 text-lg italic font-semibold w-full text-center">
          Loading...
        </p>
      )}
      {data && (
        <p className="text-gray-700 text-lg italic font-semibold w-full text-center">
          {data.message}
        </p>
      )}
    </div>
  );
};

export default Home;
