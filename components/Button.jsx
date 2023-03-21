
export default function Button({ children, type = "button", ...restProps }) {
  return (
    <button
      type={type}
      className="text-white mx-1 bg-orange-500 hover:bg-orange-400 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center items-center flex "
      {...restProps}
    >
      {children}
    </button>
  );
}