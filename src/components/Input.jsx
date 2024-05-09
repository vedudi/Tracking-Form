import { useSelector } from "react-redux";

const Input = ({ label, name }) => {
  const { jobs } = useSelector((store) => store.job);
  const arr=jobs.map((job)=>job[name])
  const set=new Set(arr)
  const options=Array.from(set)
  console.log(jobs);
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input list={name} name={name} id={label} type="text" required/>
      <datalist id={name}>
        {options.map((item) => (
          <option value={item} />
        ))}
      </datalist>
    </div>
  );
};

export default Input;
