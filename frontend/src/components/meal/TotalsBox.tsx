type BoxProps = {
  label: string;
  number: number;
  color: string;
};
const TotalsBox = ({ label, number, color }: BoxProps) => {
  return (
    <li className="bg-gray-800 p-2 flex justify-center items-center sm:w-64 w-36 rounded-lg flex-col border border-gray-600 shadow-lg ">
      <h3 className={`${color}`}>{label}</h3>
      <p className="font-semibold text-lg">{number}</p>
    </li>
  );
};
export default TotalsBox;
