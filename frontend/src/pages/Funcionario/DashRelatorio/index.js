import React, { useState, useEffect } from 'react';

import axios from 'axios'
import { url } from '../../../config'

import { Link } from 'react-router-dom'

import jsPDF from 'jspdf';


import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Table  } from 'reactstrap';

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



export const DashRelatorio = (props) => {
    const [idA] = useState(props.match.params.id)
    //console.log(id)
    const idAluno = idA.split(".")
    //console.log(idAluno)
    const [id2] = idAluno[0]
    const [id] = idAluno[1]
    //const [id] = useState(props.match.params.id)
    //console.log(id)
    //console.log(id2)

    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [universidade, setUniversidade] = useState('')
    const [curso, setCurso] = useState('')
    const [estudo, setEstudo] = useState('')
    const [periodo, setPeriodo] = useState('-')
    const [total, setTotal] = useState('-')
    const [aprovados, setAprovados] = useState('-')
    const [matriculados, setMatriculados] = useState('-')
    const [pendentes, setPendentes] = useState('-')

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const getAluno = async () => {
            await axios.get(url + "/listar_aluno/" + id)
                .then((resposta) => {
                    setNome(resposta.data.aluno.nome)
                    setSobrenome(resposta.data.aluno.sobrenome)
                    setUniversidade(resposta.data.aluno.universidade)
                    setCurso(resposta.data.aluno.curso)
                    setEstudo(resposta.data.aluno.estudo)

                    if((resposta.data.aluno.periodo))
                        setPeriodo(resposta.data.aluno.periodo)

                    if((resposta.data.aluno.total))
                        setTotal((resposta.data.aluno.total))

                    if((resposta.data.aluno.aprovados))
                        setAprovados(resposta.data.aluno.aprovados)

                    if((resposta.data.aluno.matriculados))
                        setMatriculados(resposta.data.aluno.matriculados)

                    if((resposta.data.aluno.pendentes))
                        setPendentes(resposta.data.aluno.pendentes)

                })
                .catch(() => {
                    console.log("erro")
                })
        }
        getAluno()
    }, [id]);

    const pdf = async e => {
        e.preventDefault()
        var doc = new jsPDF('p', 'pt')
        doc.text(20, 20, "Relatório")
        doc.text(20, 40, "Nome: ")
        doc.text(200, 40, nome)
        doc.text(20, 60, "Sobrenome: ")
        doc.text(200, 60, sobrenome)
        doc.text(20, 80, "Universidade: ")
        doc.text(200, 80, universidade)
        doc.text(20, 100, "Curso: ")
        doc.text(200, 100, curso)
        doc.text(20, 120, "Área de estudo: ")
        doc.text(200, 120, estudo)
        doc.text(20, 140, "Período: ")
        doc.text(200, 140, periodo)        
        doc.text(20, 160, "Disciplinas Total: ")
        doc.text(200, 160, total) 
        doc.text(20, 180, "Disciplinas Aprovados: ")
        doc.text(200, 180, aprovados)
        doc.text(20, 200, "Disciplinas Matriculados: ")
        doc.text(200, 200, matriculados)
        doc.text(20, 220, "Disciplinas Pendentes: ")
        doc.text(200, 220, pendentes)

        doc.save("relatorio.pdf")
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
                        Relatório
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
                    <ListItem component={Link} to={"/novo_aluno/" + id2} button>
                        <ListItemIcon>
                            <PersonAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Novo aluno" />
                    </ListItem>
                    <ListItem component={Link} to={"/estuda_em/" + id2} button>
                        <ListItemIcon>
                            <MenuBookIcon />
                        </ListItemIcon>
                        <ListItemText primary="Estuda em" />
                    </ListItem>
                    <ListItem component={Link} to={"/meus_dados/" + id2} button>
                        <ListItemIcon>
                            <StorageIcon />
                        </ListItemIcon>
                        <ListItemText primary="Meus dados" />
                    </ListItem>
                    <ListItem component={Link} to={"/total_alunos/" + id2} button>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Total dos alunos" />
                    </ListItem>
                    <ListItem component={Link} to={"/estuda_em/" + id2} button>
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
                                        <form className={classes.form} noValidate>
                                            <Grid container spacing={2}>
                                                <Table striped>
                                                    <thead>
                                                        
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row"></th>
                                                            <td>Nome</td>
                                                            <td>{nome} {sobrenome}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row"></th>
                                                            <td>Universidade</td>
                                                            <td>{universidade}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row"></th>
                                                            <td>Curso</td>
                                                            <td>{curso}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row"></th>
                                                            <td>Área de Estudo</td>
                                                            <td>{estudo}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row"></th>
                                                            <td>Período</td>
                                                            <td>{periodo}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row"></th>
                                                            <td>Disciplinas Total</td>
                                                            <td>{total}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row"></th>
                                                            <td>Disciplinas Aprovados</td>
                                                            <td>{aprovados}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row"></th>
                                                            <td>Disciplinas matriculados</td>
                                                            <td>{matriculados}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row"></th>
                                                            <td>Disciplinas Pendentes</td>
                                                            <td>{pendentes}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </Grid>
                                            <div>
                                                <Button 
                                                    type="btn"
                                                    
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={pdf}>
                                                    Baixar
                                                </Button>
                                            </div>
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