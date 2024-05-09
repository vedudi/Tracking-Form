import { v4 } from "uuid";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import { statusOpt, typeOpt } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { createJob } from "../redux/slices/JobSlices";
import { toast } from "react-toastify";

const AddJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newJob = Object.fromEntries(formData.entries());
    newJob.id = v4();
    newJob.date = Date.now();
    api
      .post("/jobs", newJob)
      .then(() => {
        dispatch(createJob(newJob));
        toast.success("Yeni Başvuru Eklendi");
        navigate("/");
      })
      .catch(() => toast.error("uuppss sanırım bir sorun oluştu "));
  };
  return (
    <div className="add-page">
      <section className="container">
        <h2>yeni iş ekle</h2>
        <form onSubmit={handleSubmit}>
          <Input label="Pozisyon" name="position" />
          <Input label="Şirket" name="company" />
          <Input label="Lokasyon" name="location" />
          <Select label="Durum" name="status" options={statusOpt} />
          <Select label="Tür" name="type" options={typeOpt} />
          <div>
            <Button text="Gönder" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
