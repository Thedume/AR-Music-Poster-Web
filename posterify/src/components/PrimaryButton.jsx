function PrimaryButton({ children, type = "button", className = "", onClick }) {
  return (
    <button
      type={type}
      className={`primary-button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;