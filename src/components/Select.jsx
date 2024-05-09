const Select = ({ label, options, name,fn }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select onChange={fn} id={name} name={name} required>
        <option hidden value={''}>seçiniz</option>
        {options.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
