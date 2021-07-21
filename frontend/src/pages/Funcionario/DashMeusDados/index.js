import React, { useState, useEffect } from 'react';

import axios from 'axios'
import { url } from '../../../config'

import { Alert } from 'reactstrap';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import StorageIcon from '@material-ui/icons/Storage';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: '100px'
    },
}));

export const DashMeusDados = (props) => {

    const [id] = useState(props.match.params.id)
    //console.log(idFuncionario)

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [alerta, setAlerta] = useState({
        type: '',
        mensagem: ''
    })

    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [endereco, setEndereco] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [pais, setPais] = useState('')
    const [senha, setSenha] = useState('')
    const [senha1, setSenha1] = useState('')

    useEffect(() => {
        const getFuncionario = async () => {
            await axios.get(url + "/listar_funcionario/" + id)
                .then((resposta) => {
                    setNome(resposta.data.funcionario.nome)
                    setSobrenome(resposta.data.funcionario.sobrenome)
                    setEmail(resposta.data.funcionario.email)
                    setTelefone(resposta.data.funcionario.telefone)
                    setEndereco(resposta.data.funcionario.endereco)
                    setCidade(resposta.data.funcionario.cidade)
                    setEstado(resposta.data.funcionario.estado)
                    setPais(resposta.data.funcionario.pais)
                    setSenha(resposta.data.funcionario.senha)
                    setSenha1(resposta.data.funcionario.senha1)
                })
                .catch(() => {
                    console.log("erro")
                })
        }
        getFuncionario()
    }, [id]);

    const editFuncionario = async e => {
        e.preventDefault()
        if (senha === senha1) {
            await axios.put(url + "/edit_funcionario", { id, nome, sobrenome, email, telefone, endereco, cidade, estado, pais, senha })
                .then(() => {
                    setAlerta({
                        type: 'success',
                        mensagem: 'Funcionario editado com sucesso!'
                    })
                })
                .catch((erro) => {
                    setAlerta({
                        type: 'error',
                        mensagem: 'Erro. Contate o administrador do sistema!' + erro
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
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Meus Dados
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />

                <List>

                    <ListItem component={Link} to={"/novo_aluno/" + id} button>
                        <ListItemIcon>
                            <PersonAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Novo aluno" />
                    </ListItem>
                    <ListItem component={Link} to={"/estuda_em/" + id} button>
                        <ListItemIcon>
                            <MenuBookIcon />
                        </ListItemIcon>
                        <ListItemText primary="Estuda em" />
                    </ListItem>
                    <ListItem component={Link} to={"/meus_dados/" + id} button>
                        <ListItemIcon>
                            <StorageIcon />
                        </ListItemIcon>
                        <ListItemText primary="Meus dados" />
                    </ListItem>
                    <ListItem component={Link} to={"/total_alunos/" + id} button>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Total dos alunos" />
                    </ListItem>
                    <ListItem component={Link} to={"/estuda_em/" + id} button>
                        <ListItemIcon>
                            <LayersIcon />
                        </ListItemIcon>
                        <ListItemText primary="Relatório" />
                    </ListItem>
                    <ListItem component={Link} to="/" button>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sair" />
                    </ListItem>

                </List>

                <Divider />

            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>

                                {alerta.type === 'error' ?
                                    <Alert color="danger">
                                        {alerta.mensagem}
                                    </Alert>
                                    :
                                    ""
                                }
                                {alerta.type === 'success' ?
                                    <Alert color="success">
                                        {alerta.mensagem}
                                    </Alert>
                                    :
                                    ""
                                }

                                <Container component="main" maxWidth="lg">
                                    <CssBaseline />
                                    <div className={classes.paper}>

                                        <form onSubmit={editFuncionario} className={classes.form} noValidate>
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
                                                        value={nome}
                                                        onChange={e => setNome(e.target.value)}
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
                                                        value={sobrenome}
                                                        onChange={e => setSobrenome(e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="email"
                                                        label="Email"
                                                        name="email"
                                                        type="email"
                                                        autoComplete="email"
                                                        value={email}
                                                        onChange={e => setEmail(e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="telefone"
                                                        label="Telefone"
                                                        name="telefone"
                                                        autoComplete="telefone"
                                                        value={telefone}
                                                        onChange={e => setTelefone(e.target.value)}
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
                                                        value={endereco}
                                                        onChange={e => setEndereco(e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="cidade"
                                                        label="Cidade"
                                                        name="cidade"
                                                        autoComplete="cidade"
                                                        value={cidade}
                                                        onChange={e => setCidade(e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="estado"
                                                        label="Estado"
                                                        name="estado"
                                                        autoComplete="estado"
                                                        value={estado}
                                                        onChange={e => setEstado(e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="pais"
                                                        label="País"
                                                        name="pais"
                                                        autoComplete="pais"
                                                        value={pais}
                                                        onChange={e => setPais(e.target.value)}
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
                                                        id="senha"
                                                        autoComplete="current-password"
                                                        value={senha}
                                                        onChange={e => setSenha(e.target.value)}
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
                                                        value={senha1}
                                                        onChange={e => setSenha1(e.target.value)}
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
                                                Salvar
                                            </Button>
                                        </form>


                                    </div>
                                </Container>

                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    )
}