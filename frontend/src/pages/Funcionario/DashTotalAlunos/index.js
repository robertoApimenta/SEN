import React, { useState, useEffect } from 'react';

import axios from 'axios'
import { url } from '../../../config'

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
import { Table  } from 'reactstrap';

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

export const DashTotalAlunos = (props) => {
    const [idFuncionario] = useState(props.match.params.id)

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [data, setData] = useState([])
    const [totalGraduacao, setTotalGraduacao] = useState('')
    const [totalPosGraduacao, setTotalPosGraduacao] = useState('')
    const [totalDoutorado, setTotalDoutorado] = useState('')
    const [totalMasculino, setTotalMasculino] = useState('')
    const [totalFeminino, setTotalFeminino] = useState('')
    const [totalAlunos, setTotalAlunos] = useState('')
    

    const getAlunos = async () => {
        await axios.get(url + "/listar_alunos")
            .then((resposta) => {
                //console.log(resposta.data.clientes)
                setData(resposta.data.alunos)
                //const cursos = resposta.data.alunos.map( alunos => alunos.curso)
                //const graduacao = cursos.filter((name, index, self) => self.indexOf(name) === index)
                //console.log(cursos)

                let totalGraduacao = 0;
                let totalPosGraduacao = 0;
                let totalDoutorado = 0;
                let totalMasculino = 0;
                let totalFeminino = 0;
                let totalAlunos = resposta.data.alunos.length

                for (let i = 0; i < resposta.data.alunos.length; i++) {
                    if (resposta.data.alunos[i].curso === "Graduação") {
                        totalGraduacao++;
                    }
                }
                for (let i = 0; i < resposta.data.alunos.length; i++) {
                    if (resposta.data.alunos[i].curso === "Pós-Graduação") {
                        totalPosGraduacao++;
                    }
                }
                for (let i = 0; i < resposta.data.alunos.length; i++) {
                    if (resposta.data.alunos[i].curso === "Doutorado") {
                        totalDoutorado++;
                    }
                }
                for (let i = 0; i < resposta.data.alunos.length; i++) {
                    if (resposta.data.alunos[i].sexo === "Masculino") {
                        totalMasculino++;
                    }
                }
                for (let i = 0; i < resposta.data.alunos.length; i++) {
                    if (resposta.data.alunos[i].sexo === "Feminino") {
                        totalFeminino++;
                    }
                }

                setTotalGraduacao(totalGraduacao);
                setTotalPosGraduacao(totalPosGraduacao);
                setTotalDoutorado(totalDoutorado);
                setTotalAlunos(totalAlunos)
                setTotalMasculino(totalMasculino);
                setTotalFeminino(totalFeminino);
            }).catch((erro) => {
                console.log("erro")
            })
    }
    useEffect(() => {
        getAlunos()
    }, [])

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
                        Total de alunos
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
                                        
                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th>Estudantes</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Graduação</td>
                                                    <td>{totalGraduacao}</td>
                                                </tr>
                                                <tr>
                                                    <td>Pós-Graduação</td>
                                                    <td>{totalPosGraduacao}</td>
                                                </tr>
                                                <tr>
                                                    <td>Doutorado</td>
                                                    <td>{totalDoutorado}</td>
                                                </tr>
                                                <tr>
                                                    <td>Total</td>
                                                    <td>{totalAlunos}</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Estudante Masculino</td>
                                                    <td>{totalMasculino}</td>
                                                </tr>
                                                <tr>
                                                    <td>Estudante Feminino</td>
                                                    <td>{totalFeminino}</td>
                                                </tr>
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