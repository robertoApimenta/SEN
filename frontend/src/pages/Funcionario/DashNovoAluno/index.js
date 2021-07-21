import React, { useState } from 'react';

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


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    selectEmpty: {
        marginTop: theme.spacing(2),
      },
      select: {
          width: '260px'
      }
}));

export const DashNovoAluno = (props) => {
    const [idFuncionario] = useState(props.match.params.id)

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


    const [aluno, setAluno] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        telefone: '',
        endereco: '',
        sexo:'',
        cidade: '',
        estado: '',
        pais: '',
        universidade: '',
        curso: '',
        estudo: '',
        ano: '',
        senha: '',
        senha2: ''
    })

    const valorInput = e => setAluno({ ...aluno, [e.target.name]: e.target.value })

    const cadAluno = async e => {
        e.preventDefault()
        //console.log(funcionario.senha1)
        if (aluno.senha === aluno.senha2) {
            await axios.post(url + "/cad_aluno", aluno)
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
                        Novo aluno
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
                    <ListItem component={Link} to={"/novo_aluno/" + idFuncionario} button>
                        <ListItemIcon>
                            <PersonAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Novo aluno" />
                    </ListItem>
                    <ListItem component={Link} to={"/estuda_em/" + idFuncionario} button>
                        <ListItemIcon>
                            <MenuBookIcon />
                        </ListItemIcon>
                        <ListItemText primary="Estuda em" />
                    </ListItem>
                    <ListItem component={Link} to={"/meus_dados/" + idFuncionario} button>
                        <ListItemIcon>
                            <StorageIcon />
                        </ListItemIcon>
                        <ListItemText primary="Meus dados" />
                    </ListItem>
                    <ListItem component={Link} to={"/total_alunos/" + idFuncionario} button>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Total dos alunos" />
                    </ListItem>
                    <ListItem component={Link} to={"/estuda_em/" + idFuncionario} button>
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


                                <Container component="main" maxWidth="lg">
                                    <CssBaseline />
                                    <div className={classes.paper}>

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

                                        <form onSubmit={cadAluno} className={classes.form}>
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
                                                        autoFocus
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
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        type="email"
                                                        id="email"
                                                        label="Email"
                                                        name="email"
                                                        autoComplete="email"
                                                        onChange={valorInput}
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
                                                        onChange={valorInput}
                                                    />
                                                </Grid>
                                                <Grid item xs={9}>
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
                                                        <InputLabel>Sexo</InputLabel>
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
                                                <Grid item xs={12} sm={4}>
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
                                                <Grid item xs={12} sm={4}>
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
                                                <Grid item xs={12} sm={4}>
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
                                                <Grid item xs={12} sm={3}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="universidade"
                                                        label="Universidade"
                                                        name="universidade"
                                                        onChange={valorInput}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={3}>
                                                
                                                    <FormControl className={classes.select}>
                                                        <InputLabel>Curso</InputLabel>
                                                        <Select
                                                            labelId="curso"
                                                            id="curso"
                                                            name="curso"
                                                            onChange={valorInput}
                                                            fullWidth
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value={"Graduação"}>Graduação</MenuItem>
                                                            <MenuItem value={"Pós-Graduação"}>Pós-Graduação</MenuItem>
                                                            <MenuItem value={"Doutorado"}>Doutorado</MenuItem>
                                                        </Select>
                                                        
                                                    </FormControl>
                                                
                                            

                                                </Grid>
                                                <Grid item xs={12} sm={3}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="estudo"
                                                        label="Área de estudo"
                                                        name="estudo"
                                                        onChange={valorInput}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={3}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="ano"
                                                        label="Ano de início"
                                                        name="ano"
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
                                                        id="senha"
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

                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    )
}