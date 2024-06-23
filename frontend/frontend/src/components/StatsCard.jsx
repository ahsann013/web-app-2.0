import React, { useEffect, useState } from 'react';

const StatsCard = ({ title, fetchData }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setValue(data);
    };

    getData();
  }, [fetchData]);

  return (
    <div className="flex flex-col justify-center bg-white p-4 rounded-lg shadow-md m-2">
      <h2 className="text-lg text-black font-semibold">{title}</h2>
      <p className="flex flex-col text-2xl items-end   text-black font-bold">{value}</p>
    </div>
  );
};

export default StatsCard;
