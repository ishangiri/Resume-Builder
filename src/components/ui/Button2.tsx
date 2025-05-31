
interface ButtonProps {
  onSubmit: () => void,
  text: React.ReactNode
}

const Button2 = ({onSubmit, text} : ButtonProps) => {
  return (
          <button
            className="w-full bg-gradient-to-r from-blue-500 to-blue-900 text-white font-semibold py-1 px-3 rounded-lg hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={onSubmit}
          >
            {text}
          </button>
  )
}

export default Button2