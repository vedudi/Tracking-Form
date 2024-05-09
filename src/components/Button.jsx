

const Button = ({text, type="submit"}) => {
  return (
    <button type={type} className="button">
    <span className="button-content">{text}</span>
  </button>
  
  
  )
}

export default Button;