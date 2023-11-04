const Table = ({ date, description, debit = "", credit = "", balance }) => {
  return (
    <tr>
      <td className="border-t-2 border-b-2 border-gray-300 px-4 py-2">
        {date}
      </td>
      <td className="border-t-2 border-b-2 border-gray-300 px-4 py-2">
        {description}
      </td>
      <td className="border-t-2 border-b-2 border-gray-300 px-4 py-2 text-red-600">
        {debit ? `-${debit}` : ""}
      </td>
      <td className="border-t-2 border-b-2 border-gray-300 px-4 py-2 text-green-600">
        {credit ? `+${credit}` : ""}
      </td>
      <td className="border-t-2 border-b-2 border-gray-300 px-4 py-2">
        {balance}
      </td>
    </tr>
  );
};

export default Table;
