import { useEffect, useState } from "react";
import { sortOpt, statusOpt, typeOpt } from "../utils/constants";
import Button from "./Button";
import Select from "./Select";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { setLoading, setError, setJobs } from "../redux/slices/JobSlices";
const Filter = () => {
  const [text, setText] = useState();
  const [debouncedText, setDebouncedText] = useState();
  const [sort, setSort] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (text === undefined) return;
    const timer = setTimeout(() => setDebouncedText(text), 500);
    return () => clearTimeout(timer);
  }, [text]);
  useEffect(() => {
    const sortParam =
      sort === "A-Z" || sort === "Z-A"
        ? "company"
        : sort === "En Yeni" || sort === "En Eski"
        ? "date"
        : undefined;
    const orderParam =
      sort === "A-Z" || sort === "En Eski"
        ? "asc"
        : sort === "A-Z" || sort === "En Yeni"
        ? "desc"
        : undefined;

    const params = {
      q: debouncedText,
      status: status || undefined,
      type: type || undefined,
      _sort: sortParam,
      _order: orderParam,
    };
    dispatch(setLoading());
    api
      .get("/jobs", { params })
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err.message)));
  }, [debouncedText, status, sort, type]);
  const handleReset = () => {
    setDebouncedText();
    setText();
    setType();
    setStatus();
    setSort();
  };
  return (
    <div className="filter-sec">
      <h2>
        filtreleme formu
        <form onReset={handleReset}>
          <div>
            <label>ara</label>
            <input onChange={(e) => setText(e.target.value)} type="text" />
          </div>
          <Select
            label="Durum"
            options={statusOpt}
            fn={(e) => setStatus(e.target.value)}
          />
          <Select
            label="Tür"
            options={typeOpt}
            fn={(e) => setType(e.target.value)}
          />
          <Select
            label="Sırala"
            options={sortOpt}
            fn={(e) => setSort(e.target.value)}
          />
          <Button type="reset" text="Filtreleri Sıfırla" />
        </form>
      </h2>
    </div>
  );
};

export default Filter;
