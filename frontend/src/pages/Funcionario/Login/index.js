import React, {useState} from 'react'
import { Menu } from '../../../components/Menu'
import axios from 'axios'
import {url} from '../../../config'

import {Alert} from 'reactstrap'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 12, 0),
        width: '200px',
    },
}));


export const LoginFuncionario = () => {
    const classes = useStyles();

    const [alerta, setAlerta] = useState({
        type: '',
        mensagem: ''
    })

    const [login, setLogin] = useState({
        email: '',
        senha: ''
    })
    const valorInput = e => setLogin({...login, [e.target.name] : e.target.value})

    const verificaEmail = async e => {
        e.preventDefault()
        const resposta = await axios.post(url + "/login_funcionario", login)
        if(resposta.data.erro === true){
            setAlerta({
                type: 'error',
                mensagem: 'Usuário ou senha incorretos!'
            })
        }else{
            const id_funcionario = resposta.data.user.id
            window.location.href='/dash_funcionario/'+id_funcionario;
        }

    }

    return (
        <div>
            <Menu />

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login Fiscal
                    </Typography>

                    {alerta.type === 'error' ?
                    <Alert color="danger">
                        {alerta.mensagem}        
                    </Alert>
                    :
                    ""
                    }

                    <form className={classes.form} onSubmit={verificaEmail}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            onChange = {valorInput}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="senha"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange = {valorInput}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Entrar
                        </Button>
                    </form>
                    <Button
                    href="/cad_funcionario"
                            type=""
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                           Sou novo
                        </Button>
                </div>
            </Container>

        </div>
    )
}