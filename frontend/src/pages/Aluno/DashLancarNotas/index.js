import React, { useState, useEffect } from 'react';

import axios from 'axios'
import { url } from '../../../config'

import { Alert, Input } from 'reactstrap'

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

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
import NoteIcon from '@material-ui/icons/Note';
import LayersIcon from '@material-ui/icons/Layers';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import StorageIcon from '@material-ui/icons/Storage';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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

export const DashLancarNotas = (props) => {

    const [id] = useState(props.match.params.id)

    const [nome, setNome] = useState('')
    const [pdf, setPdf] = useState('')

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

    const editarPdf = async e => {
        e.preventDefault()
        //console.log(endPdf)
        const headers = {
            'Content-type': 'application/json'
        }
        const formData = new FormData()
        formData.append('pdf', pdf)
        const idx = id + "." + nome
        await axios.post(url + "/upload3/" + idx, formData, { headers })
            .then((resposta) => {
                setAlerta({
                    type: 'success',
                    mensagem: 'Notas enviadas com sucesso!'
                })
            })
            .catch((erro) => {
                setAlerta({
                    type: 'error',
                    mensagem: 'Erro. Contate o administrador do sistema!' + erro
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
                        Lançar notas
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

                    <ListItem component={Link} to={"/lancar_notas/" + id} button>
                        <ListItemIcon>
                            <NoteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Lançar notas" />
                    </ListItem>
                    <ListItem component={Link} to={"/historico/" + id} button>
                        <ListItemIcon>
                            <MenuBookIcon />
                        </ListItemIcon>
                        <ListItemText primary="Histórico" />
                    </ListItem>
                    <ListItem component={Link} to={"/meus_dados_aluno/" + id} button>
                        <ListItemIcon>
                            <StorageIcon />
                        </ListItemIcon>
                        <ListItemText primary="Meus dados" />
                    </ListItem>
                    <ListItem component={Link} to={"/relatorio_aluno/" + id} button>
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
                                <Container component="main" maxWidth="xs">
                                    <CssBaseline />

                                    <div className={classes.paper}>


                                        <form onSubmit={editarPdf} className={classes.form} noValidate>
                                            <Grid container spacing={2}>
                                                <Grid>
                                                    <TextField
                                                        autoComplete="nome"
                                                        name="nome"
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="nome"
                                                        label="Nome do arquivo"
                                                        onChange={e => setNome(e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Input
                                                        type="file"
                                                        name="pdf"
                                                        accept=".pdf"
                                                        onChange={e => setPdf(e.target.files[0])}

                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        color="default"
                                                        className={classes.button}
                                                        startIcon={<CloudUploadIcon />}
                                                    >
                                                        Upload
                                                    </Button>
                                                </Grid>
                                            </Grid>
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