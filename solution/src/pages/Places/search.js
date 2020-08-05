import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

import { useSearchStyles } from './styles'


const Search = ({ reg={}, callback = () => {} }) => {
    const classes = useSearchStyles()
    const [term, setTerm] = useState({ query: '', type:'slug' })
    const Types = [{id:'slug', value:'Buscar por Slug'}, {id:'name', value:'Buscar por Nome'}]

    function submit(){
        callback(term);
    }

    return(<div className={classes.content}>
                <div className={classes.paper}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="type">Tipo de Busca</InputLabel>
                        <Select
                                className={classes.select}
                                labelId="type"
                                id="type"
                                value={term.type}
                                onChange={(ev) => setTerm({...term, type: ev.target.value })}
                        >
                        {Types.map( (item) => <MenuItem key={item.id} value={item.id}>{item.value}</MenuItem> )} 
                        </Select>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="query"
                        label="O que deseja procurar?"
                        name="query"
                        onChange={(ev) => setTerm({...term, query: ev.target.value })}
                        value={term.query}
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={()=>submit()}
                        className={classes.submit}
                    >
                        Buscar
                    </Button>
                </div>
            </div>
    )
}


export default Search;