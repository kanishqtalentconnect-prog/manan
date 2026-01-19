type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={`w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-black ${props.className}`}
    />
  );
}
