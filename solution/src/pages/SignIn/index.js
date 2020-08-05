import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import useStyles from './styles'

import logo from '../../assets/logo.png'
import api from '../../services/api'
import {setSignIn, logout} from '../../services/auth'

const SignIn = (props) => {
    const classes = useStyles();
    const [login, setLogin] = useState({ username:"test", password:"test" })

    logout();
    
    async function submit() {
        try{
            const response = await api.post('/auth', login);
            console.log(response.data);
            setSignIn(response.data.access_token)
            props.history.push('/')
        } catch(e){
            alert('Usuário ou Senha Inválidos')
        }    
    }

    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img className={classes.logo} srcSet={logo} />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    onChange={(ev) => setLogin({...login, username: ev.target.value })}
                    value={login.username}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    onChange={(ev) => setLogin({...login, password: ev.target.value })}
                    value={login.password}
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={()=>submit()}
                    className={classes.submit}
                >
                    Entrar
                </Button>
            </div>
        </Container>
    )
}


export default SignIn;