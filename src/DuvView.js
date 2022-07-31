import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { mainAPI } from "./api";
import Loader from "./components/Loader";

import { useParams } from 'react-router-dom';
import moment from "moment";

export default function TableVessels() {
    const [duvDetail, setDuvDetail] = useState({})
    const [loading, setLoading] = useState(false);

    const {duv} = useParams()

    useEffect(() => {
    
        fetchData();

    }, []);

    const fetchData = async () => {
        
        setLoading(true);
        const response = await mainAPI.get(`horarios/${duv}`);
        setLoading(false);
        setDuvDetail(response.data.response)
    };

    return (
        <>
            {loading && <Loader />}
            {!loading && (
                <div>
                    
                    <div
                        style={{
                            display: 'block',
                            width: '100%',
                            textAlign: 'center',
                            marginTop: 10
                        }}
                    >
                        <span
                            style={{
                                fontSize: 40,
                                fontWeight: 'bold'
                                // color: 'white',
                            }}
                        >DUV {duv}</span>
                    </div>
                    
                    <div
                        style={{
                            width: '90%',
                            background: 'grey',
                            textAlign: 'center',
                            margin: 'auto',
                            borderRadius: 10
                        }}
                    >
                        <span
                            style={{
                                fontSize: 30,
                                background: '#414141',
                                color: 'white',
                                marginTop: 100,
                                display: 'block',
                            }}
                        >Data Chegada</span>
                        <span
                            style={{
                                fontSize: 30,
                                marginTop: 15,
                                display: 'block',
                                color: 'white'
                            }}
                        >{moment(duvDetail.dtHrChegada).format('DD/MM/YYYY hh:mm:ss')}</span>
                    </div>
                    
                </div>
            )}
        </>
    );
}
