import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobList from "./pages/JobList";
import AddJob from "./pages/AddJob";
import Header from "./components/Header";
import api from "./utils/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setError, setJobs, setLoading } from "./redux/slices/JobSlices";

const App = () => {
  const dispatch = useDispatch();
  const getData=()=>{
      dispatch(setLoading());
    api
      .get("/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err.message)));
  }

  useEffect(() => {
  getData()
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<JobList retry={getData}/>} />
        <Route path="/new" element={<AddJob />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
