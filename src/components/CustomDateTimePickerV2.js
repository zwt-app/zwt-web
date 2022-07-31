import { DatePicker, Space } from 'antd';
import React from 'react';

import 'antd/dist/antd.css'
import moment from 'moment';

const { RangePicker } = DatePicker;

const CustomDateTimePickerV2 = ({value, onChange}) => (
  <Space direction="vertical" size={12}>
    <DatePicker 
        defaultValue={moment(value, 'DD-MM-YYYY hh:mm:ss')}
        showTime 
        onChange={onChange} 
        // onOk={onChange}
        style={{
            background: 'transparent',
            borderWidth: 0
            
        }}
        format={'DD/MM/YYYY hh:mm:ss'}
        inputRender={(props) => <input {...props} style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}/>}
    />
  </Space>
);

export default CustomDateTimePickerV2;