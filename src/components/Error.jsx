const Error = ({ msg, retry }) => {
  return (
    <div className="error">
      <p>uppss!! sorry... verilere ulaşırken sorun oluştu</p>
      <p className="text">{msg}</p>
      <button onClick={retry} class="button"> tekrar dene</button>
    </div>
  );
};

export default Error;
