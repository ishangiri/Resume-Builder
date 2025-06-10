interface ButtonProps {
  onSubmit: () => void,
  text: React.ReactNode
}

const Button2 = ({ onSubmit, text }: ButtonProps) => {
  return (
    <button
      type="button"
      className="
        flex items-center gap-1
        bg-gradient-to-r from-blue-600 to-blue-800
        text-white font-semibold
        px-4 py-2
        rounded-xl
        shadow
        transition-all duration-200
        hover:from-blue-700 hover:to-blue-900 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        text-sm
        min-h-[38px]
      "
      onClick={onSubmit}
    >
      {text}
    </button>
  );
};

export default Button2;
