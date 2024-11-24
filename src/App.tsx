import { useEffect, useState } from "react";
import "./App.css";
import { DemoData, url } from "./utilities.ts";
import FrameContainer from "./components/frame-container/FrameContainer.tsx";

function App() {
  const [data, setData] = useState<DemoData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(url.concat(`?page=${page}&limit=10`));
      const photosData = await res.json();

      if (photosData.length) {
        setData((prevState) => [...prevState, ...photosData]);
      }
    } catch (error) {
      console.log("Error fetching request: ", (error as Error).message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !loading
    ) {
      setPage((prevState) => prevState + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {error && (
        <div className="error-container">
          <h3>{`Error loading data...`}</h3>
        </div>
      )}

      {
        <div className="main-container">
          <h1>{`InstaScroll`}</h1>
          <div className="frames-container">
            {data.map((item) => (
              <FrameContainer item={item} key={item.id} />
            ))}
          </div>
        </div>
      }
      {loading && !error && (
        <div className="loading-container">
          <h3>{`loading...`}</h3>
        </div>
      )}
    </>
  );
}

export default App;
