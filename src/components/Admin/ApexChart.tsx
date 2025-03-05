import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { bookingCount } from "../../service/api/admin/apiMethod";
import { ApiResponseOfBooking } from "../../utils/types";
import { toast } from "react-toastify";

interface ApexChartProps {}

const yearData = [2021, 2022, 2023, 2024]; 

const ApexChart: React.FC<ApexChartProps> = () => {
  const [selectedYear, setSelectedYear] = useState<number | undefined>(yearData[3]); 
  const [bookingData, setBookingData] = useState<{ year?: number; months?: { [key: string]: number } }>({});

  const [options] = useState({
    chart: {
      height: 350,
      type: "line" as const,
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth" as const
    },
    title: {
      text: "Bookings by Month",
      align: "left" as const
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5
      }
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] // Full months
    }
  });

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const filteredSeries = [{
    name: `Bookings ${bookingData.year}`,
    data: Object.values(bookingData.months || {})
  }];

  useEffect(() => {
    if (selectedYear !== undefined) {
      getDetails(selectedYear);
    }
  }, [selectedYear]);

  const getDetails = (year: number) => {
    bookingCount(year)
      .then((response: ApiResponseOfBooking) => {
        console.log(response,'bookingData');

        if (response.data) {
          setBookingData(response.data as object);
        } else {
          toast.error("No location data found");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div id="chart" className="sm:w-full lg:w-1/2 mt-10 ms-16">
      <div className="year-filter">
        <select id="year-select" onChange={handleYearChange} value={selectedYear}>
          {yearData.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <ReactApexChart options={options} series={filteredSeries} type="line" height={350} />
    </div>
  );
};

export default ApexChart;
