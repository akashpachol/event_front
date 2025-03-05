import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { eventBooking } from '../../service/api/manager/apiMethod';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/redux/app/store';

const Donut: React.FC = () => {
  const [options, setOptions] = useState({
    labels: [] as string[],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['#333'],
      },
    },
  });

  const [series, setSeries] = useState<number[]>([]);

  const manager = useSelector((state: RootState) => state.manager);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    if (!manager.managerId) return;

    eventBooking(manager.managerId)
      .then((response) => {
        if (response.data) {
          const data = response.data as { count: number; event: string }[];
          
          const labels = data.map(item => item.event);
          const seriesData = data.map(item => item.count);

          setOptions(prevOptions => ({
            ...prevOptions,
            labels,
          }));
          setSeries(seriesData);
        } else {
          toast.error("No location data found");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="donut bg-white f mt-16 ms-8">
            <h5 className="text-xl font-bold dark:text-white ">Most Event Booked</h5>
<div className='mt-10'>
<Chart options={options} series={series} type="donut" width="380" />

</div>
    </div>
  );
}

export default Donut;
