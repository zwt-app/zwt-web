import React, {useState} from 'react'
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = (startDate, onChangeDate, onChangeTime) => {

    // const [startDate, setStartDate] = useState(new Date());
    
    const CustomTimeInput = ({ date, value, onChange }) => (
        <input
            value={value}
            onChange={(e) => onChangeTime(e.target.value)}
            style={{ border: "solid 1px pink" }}
        />
    );
    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => onChangeDate(date)}
            showTimeInput
            customTimeInput={<CustomTimeInput />}
            withPortal
        />
    );
};

export default CustomDatePicker
