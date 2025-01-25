export const Input = (props) => {
  return (
    <div className="flex flex-col items-start">
      <input type="text" {...props} />
      {props.errormessage && (
        <p className="text-red-600 font-light">{props.errormessage}</p>
      )}
    </div>
  );
};
