import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { mainAPI } from "./api";
import InputTextSearch from "./components/InputTextSearch";
import UserProfile from "./components/UserProfile";
import CustomDateTimePickerV2 from "./components/CustomDateTimePickerV2";
import Loader from "./components/Loader";

import toast, { Toaster } from "react-hot-toast";
import { ImArrowUp, ImArrowDown } from "react-icons/im";

import data2 from "./data2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#20366b",
        color: theme.palette.common.white,
        fontSize: 18,
        fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
        color: theme.palette.common.white,
        fontWeight: "bold",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function TableVessels() {
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setInterval(() => {
            fetchData();
        }, 1000);
    }, []);

    const fetchData = async () => {
        const response = await mainAPI.get("horarios");
        setLoading(false);

        setRows(response.data.response);
        // setFilteredRows(response.data.response)
    };

    useEffect(() => {
        const updatedItems = rows.map((item) => {
            const match = filteredRows.find((row) => row.duv == item.duv);

            let newObj = {}
          
            if (match) {

                if (match.status != item.status) {
                    console.log("STATUS MUDADO", {
                      ...item,
                      status_updated: true,
                    });
                    newObj = {
                      ...item,
                      status_updated: true,
                    };
                }

                if (match.tempoEsperaBarra != item.tempoEsperaBarra) {
                    console.log("TEMPO ESPERA BARRA MUDADO", item);
                    newObj = {
                      ...item,
                      tempoEsperaBarra_updated: true,
                    };
                }
            }
            else{
              newObj = item
            }

            return newObj;
        });

        setFilteredRows(rows)

    }, [rows]);

    const notify = () => toast("Saved!");

    const filterItems = (element) => {
        const { value } = element.target;

        const filteredRows = rows.filter((row) => {
            console.log(row.navio.toLowerCase(), value.toLowerCase());
            return row.navio.toLowerCase().includes(value.toLowerCase());
        });

        setFilteredRows(filteredRows);
    };

    const getStatusColor = (status) => {
        let statusColor = "";
        if (status.indexOf("ANDAMENTO") != -1) statusColor = "green";
        if (status.indexOf("ATRASADO") != -1) statusColor = "orange";
        if (status.indexOf("ATRACADO") != -1) statusColor = "red";
        if (status.indexOf("REALOCADO") != -1) statusColor = "yellow";
        if (status.indexOf("CONCLUIDO") != -1) statusColor = "green";
        if (status.indexOf("CONCLUÍDO") != -1) statusColor = "green";
        return statusColor;
    };

    return (
        <>
            {loading && <Loader />}
            {!loading && (
                <div>
                    <div
                        style={{
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginRight: 20,
                        }}
                    >
                        <InputTextSearch
                            label="Pesquisar por Navio"
                            onChange={filterItems}
                        />
                        <UserProfile />
                    </div>

                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center">
                                        Data/Hora Chegada
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        Duv
                                    </StyledTableCell>
                                    <StyledTableCell>Navio</StyledTableCell>
                                    <StyledTableCell>
                                        Agente Maritimo
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        Berco
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        Status
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        Tempo Espera Barra
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredRows.map((row, index) => {
                                    const tempoEsperaBarraFormated =
                                        row.tempoEsperaBarra
                                            ? `+${Math.round(row.tempoEsperaBarra)} horas`
                                            : "";
                                    const statusColor = getStatusColor(
                                        row.status
                                    );

                                    return (
                                        <StyledTableRow
                                            key={row.navio}
                                            style={{
                                                background:
                                                    index % 2 == 1
                                                        ? "#313131"
                                                        : "#414141",
                                                color: "white",
                                            }}
                                        >
                                            <StyledTableCell align="center">
                                                {row.statusTime == 'UP' && <ImArrowUp
                                                    color="green"
                                                    size={32}
                                                />}
                                                {row.statusTime == 'DOWN' && <ImArrowDown
                                                    color="red"
                                                    size={32}
                                                />}
                                            </StyledTableCell>

                                            <StyledTableCell
                                                align="center"
                                                width={250}
                                            >
                                                {row.dtHrChegada ? (
                                                    <CustomDateTimePickerV2
                                                        value={row.dtHrChegada}
                                                        onChange={(value) => {
                                                            notify();
                                                            console.log(
                                                                "teste 123",
                                                                value
                                                            );
                                                        }}
                                                    />
                                                ) : null}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {row.duv}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                component="th"
                                                scope="row"
                                                style={{ color: "yellow" }}
                                            >
                                                {row.navio}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="left"
                                                width={350}
                                            >
                                                {row.agenteMaritimo}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {row.berco}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="left"
                                                style={{
                                                    color: statusColor,
                                                    boxShadow: "1px black",
                                                }}
                                            >
                                                {row.status}
                                                {row.status_ && '(Atualizado)'}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {tempoEsperaBarraFormated}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
            <Toaster />
        </>
    );
}
