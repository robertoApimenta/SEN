import React, { useEffect, useState } from 'react';

import axios from 'axios'
import { url } from '../../../config'
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

import {
    Alert,
    Table
} from 'reactstrap';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

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
        paddingBottom: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(0),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        maxWidth: "xxl"
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

export const EstudaEm = (props) => {
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

    const [data, setData] = useState([])

    const getAlunos = async () => {
        await axios.get(url + "/listar_alunos")
            .then((resposta) => {
                //console.log(resposta.data.clientes)
                setData(resposta.data.alunos)
            }).catch((erro) => {
                console.log("erro")
            })
    }
    useEffect(() => {
        getAlunos()
    }, [])

    


    const deletarAluno = async (id) => {
        await axios.delete(url + "/deletar_aluno/" + id)
            .then(() => {
                setAlerta({
                    type: 'success',
                    mensagem: 'Aluno deletado com sucesso!'
                })
                getAlunos()
            })
            .catch(() => {
                setAlerta({
                    type: 'error',
                    mensagem: 'Erro. Contate o administrador do sistema!'
                })
            })
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
                        Esduda em
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

                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nome</th>
                                                    <th>Sobrenome</th>
                                                    <th>Email</th>
                                                    <th>Telefone</th>
                                                    <th>Endereço atual</th>
                                                    <th>Cidade</th>
                                                    <th>Estado</th>
                                                    <th>País</th>
                                                    <th>Universidade</th>
                                                    <th>Curso</th>
                                                    <th>Área de estudo</th>
                                                    <th>Ano de início</th>
                                                    <th className="text-center">Opções</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map(item => (
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.nome}</td>
                                                        <td>{item.sobrenome}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.telefone}</td>
                                                        <td>{item.endereco}</td>
                                                        <td>{item.cidade}</td>
                                                        <td>{item.estado}</td>
                                                        <td>{item.pais}</td>
                                                        <td>{item.universidade}</td>
                                                        <td>{item.curso}</td>
                                                        <td>{item.estudo}</td>
                                                        <td>{item.ano}</td>
                                                        
                                                        <td className="text-center">
                                                            <Link to={"/notas_aluno/" + idFuncionario + "." + item.id }>
                                                                Notas
                                                            </Link><br></br>
                                                            <Link to={"/relatorio/" + idFuncionario + "." + item.id }>
                                                                Relatório
                                                            </Link><br></br>
                                                            <Link to={"/editar_aluno/" + idFuncionario + "." + item.id }>
                                                                <EditIcon color="primary" />
                                                            </Link><br></br>
                                                            <Link onClick={() => deletarAluno(item.id)}>
                                                                <DeleteForeverIcon color="secondary" />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>

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