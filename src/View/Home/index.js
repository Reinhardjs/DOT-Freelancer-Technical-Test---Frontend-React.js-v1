import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Header from "../../components/Header";
import Api from "../../helper/api";

const api = new Api();
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
        maxWidth: 300,
    },
}));

export default function Home() {
    const classes = useStyles();
    const [provinsiAsalVal, setProvinsiAsalVal] = useState()
    const [kotaAsalVal, setKotaAsalVal] = useState("")
    const [provinsiTujuanVal, setProvinsiTujuanVal] = useState("")
    const [kotaTujuanVal, setKotaTujuanVal] = useState("")
    const [courierVal, setCourierVal] = useState("")

    const [provinsi, setProvinsi] = React.useState([])
    const [kotaAsal, setKotaAsal] = useState([])
    const [kotaTujuan, setKotaTujuan] = useState([])
    const [data, setData] = useState({
        origin: '',
        destination: '',
        weight: '',
        courier: '',
    })
    const [hasil, setHasil] = React.useState([])

    const handleProvince = (e) => {
        const id = e.target.value;
        const params = {
            province: id
        }
        api
            .getCity(params)
            .then(response => {
                setKotaAsal(response.data.rajaongkir.results)
                setProvinsiAsalVal(e.target.value)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleProvinceTujuan = (e) => {
        const id = e.target.value;
        const params = {
            province: id
        }
        api
            .getCity(params)
            .then(response => {
                setKotaTujuan(response.data.rajaongkir.results)
                setProvinsiTujuanVal(e.target.value)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleWeightandCourier = (name, value) => {
        const newData = data
        newData[name] = value
        setData(newData)
    }

    const handleCourier = (e) => {
        const newData = data
        newData['courier'] = e.target.value
        setData(newData)

        setCourierVal(e.target.value)
    }

    const handleKotaAsal = (e) => {
        const newData = data
        newData['origin'] = e.target.value
        setData(newData)

        setKotaAsalVal(e.target.value)
    }

    const handleKotaTujuan = (e) => {
        const newData = data
        newData['destination'] = e.target.value
        setData(newData)

        setKotaTujuanVal(e.target.value)
    }

    const cekOngkir = (e) => {
        e.preventDefault();
        
        const params = new URLSearchParams();
        params.append('origin', data.origin)
        params.append('destination', data.destination)
        const weightKg = parseFloat(data.weight) * 1000
        params.append('weight', weightKg)
        params.append('courier', data.courier)
        console.log(data)

        api
            .getCost(params)
            .then(response => {
                setHasil(response.data.rajaongkir.results[0].costs)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        api
            .getProvince()
            .then((response) => {
                setProvinsi(response.data.rajaongkir.results)
            })
            .catch((err) => console.log(err));

        console.log(data)
    }, []);

    return (
        <div className="App">

            <Header />

            <form onSubmit={cekOngkir}>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container justify="center" className={classes.root} spacing={1}>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="provinsiAsal">-- PILIH PROVINSI ASAL --</InputLabel>
                                <Select
                                    labelId="provinsiAsal"
                                    onChange={handleProvince}
                                    value={provinsiAsalVal}
                                >
                                    {provinsi.map(function (r, i) {
                                        return <MenuItem value={r.province_id}>{r.province}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="provinsi">-- PILIH PROVINSI TUJUAN --</InputLabel>
                                <Select
                                    labelId="provinsi"
                                    onChange={handleProvinceTujuan}
                                    value={provinsiTujuanVal}
                                >
                                    {provinsi.map(function (r, i) {
                                        return <MenuItem key={r.province} value={r.province_id}>{r.province}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Container>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container justify="center" className={classes.root} spacing={1}>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="kotaAsal">-- PILIH KOTA/KABUPATEN ASAL --</InputLabel>
                                <Select
                                    labelId="kotaAsal"
                                    onChange={handleKotaAsal}
                                    value={kotaAsalVal}
                                >
                                    {kotaAsal.map(function (r, i) {
                                        return <MenuItem key={r.city_name} value={r.city_id}>{r.city_name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="provinsi">-- PILIH KOTA/KABUPATEN TUJUAN --</InputLabel>
                                <Select
                                    labelId="provinsi"
                                    onChange={handleKotaTujuan}
                                    value={kotaTujuanVal}
                                >
                                    {kotaTujuan.map(function (r, i) {
                                        return <MenuItem key={r.city_name} value={r.city_id}>{r.city_name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Container>
                <hr />
                <TextField id="outlined-basic" label="Isi Berat (Kg)" variant="outlined" onChange={event => handleWeightandCourier('weight', event.target.value)} />
                <br />
                <br />
                <FormControl className={classes.formControl}>
                    <InputLabel id="courier">-- PILIH KURIR --</InputLabel>
                    <Select
                        labelId="courier"
                        onChange={handleCourier}
                        value={courierVal}
                    >
                        <MenuItem key="jne" value="jne">JNE</MenuItem>
                        <MenuItem key="pos" value="pos">POS</MenuItem>
                        <MenuItem key="tiki" value="tiki">TIKI</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <br />
                <button>Cek</button>
                <hr />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell component="th">Service</TableCell>
                            <TableCell component="th">Ongkos</TableCell>
                            <TableCell component="th">ETD</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hasil.map(function (r, i) {
                            return <TableRow key={i}>
                                <TableCell>{r.service} ({r.description})</TableCell>
                                <TableCell>{r.cost[0].value}</TableCell>
                                <TableCell>{r.cost[0].etd} hari</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </form>
        </div >
    );
}