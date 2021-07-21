import React, { useState } from 'react'

import axios from 'axios'
import { url } from '../../../config'

import { Alert } from 'reactstrap'

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    select: {
        width: '396px'
    }
}));


export const CadFuncionario = () => {

    const classes = useStyles();

    const [alerta, setAlerta] = useState({
        type: '',
        mensagem: ''
    })

    const [funcionario, setFuncionario] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        pais: '',
        senha: '',
        senha2: ''
    })

    const valorInput = e => setFuncionario({ ...funcionario, [e.target.name]: e.target.value })

    const cadFuncionario = async e => {
        e.preventDefault()
        //console.log(funcionario.senha1)
        if (funcionario.senha === funcionario.senha2) {
            await axios.post(url + "/cad_funcionario", funcionario)
                .then((resposta) => {
                    //console.log("Cadastrado com sucesso")
                    if (resposta.data.error) {
                        setAlerta({
                            type: 'error',
                            mensagem: 'Erro. Contate o administrador do sistema!'
                        })
                    } else {
                        setAlerta({
                            type: 'success',
                            mensagem: 'Cadastrado com sucesso!'
                        })
                        setTimeout(function () {
                            window.location.href = '/login_funcionario'
                        }, 2000)

                    }
                })
                .catch((erro) => {
                    setAlerta({
                        type: 'error',
                        mensagem: 'Erro. Contate o administrador do sistema!'
                    })
                })
        } else {
            setAlerta({
                type: 'error',
                mensagem: 'As senhas precisam ser iguais!'
            })
        }
    }


    return (
        <div>
            {alerta.type === 'success' ?
                <Alert color="success">
                    {alerta.mensagem}
                </Alert>
                :
                ""
            }
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                {alerta.type === 'error' ?
                    <Alert color="danger">
                        {alerta.mensagem}
                    </Alert>
                    :
                    ""
                }
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Novo Funcionário
                    </Typography>

                    <form onSubmit={cadFuncionario} className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="nome"
                                    name="nome"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Nome"
                                    onChange={valorInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="sobrenome"
                                    label="Sobrenome"
                                    name="sobrenome"
                                    autoComplete="sobrenome"
                                    onChange={valorInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={valorInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="telefone"
                                    label="Telefone"
                                    name="telefone"
                                    autoComplete="telefone"
                                    onChange={valorInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="endereco"
                                    label="Endereço atual"
                                    name="endereco"
                                    autoComplete="endereco"
                                    onChange={valorInput}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl className={classes.select}>
                                    <InputLabel fullWidth>Sexo</InputLabel>
                                    <Select
                                        labelId="sexo"
                                        id="sexo"
                                        name="sexo"
                                        onChange={valorInput}
                                        fullWidth
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"Masculino"}>Masculino</MenuItem>
                                        <MenuItem value={"Feminino"}>Feminino</MenuItem>
                                    </Select>

                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="cidade"
                                    label="Cidade"
                                    name="cidade"
                                    autoComplete="cidade"
                                    onChange={valorInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="estado"
                                    label="Estado"
                                    name="estado"
                                    autoComplete="estado"
                                    onChange={valorInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="pais"
                                    label="País"
                                    name="pais"
                                    autoComplete="pais"
                                    onChange={valorInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="senha"
                                    label="Senha"
                                    type="password"
                                    id="senha1"
                                    autoComplete="current-password"
                                    onChange={valorInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="senha2"
                                    label="Repita a senha"
                                    type="password"
                                    id="senha2"
                                    autoComplete="current-password"
                                    onChange={valorInput}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Cadastrar
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    )
}