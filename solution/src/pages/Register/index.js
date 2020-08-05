import React, {useState, useRef, useEffect} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

import api from '../../services/api'

import { useStyles } from './styles'
import States from './states'
import Slug from './formatSlug'

const INITIAL_VALUE = {
    name: '',
    slug: '',
    city: '',
    state: '',
}

// function useChangeEdit(value){
//     const ref = useRef()
//     useEffect(()=>{
//         ref.current = value
//     })
//     return ref.current
// }

const Register = ({ reg={}, callback = () => {} }) => {
    const classes = useStyles()
    const [registry, setRegistry] = useState({...INITIAL_VALUE, ...reg})
    const init = {...INITIAL_VALUE, ...reg}

    console.log(getEdit(), registry)

    async function submit() {
        console.log(registry);
        try{
            const response = 
            registry.id ? 
                await api.put('/api/v1.0/places/edit', { id: registry.id, fields: getEdit() })  : 
                await api.post('/api/v1.0/places/new', registry)
                callback(response.data.places)
        } catch(e){
            if (  e.response.data.error_message )
                alert(e.response.data.error_message)
            else    
                alert('Falha ao salvar o registro')
        }    
    }

    function getEdit(){
        var fields = {};
        if ( init.name !== registry.name ) 
            fields['name'] = { current_value: init.name, new_value: registry.name  };
        
        if ( init.slug !== registry.slug ) 
            fields['slug'] = { current_value: init.slug, new_value: registry.slug  }; 
        
        if ( init.city !== registry.city ) 
            fields['city'] = { current_value: init.city, new_value: registry.city  };  
        
        if ( init.state !== registry.state ) 
            fields['state'] = { current_value: init.state, new_value: registry.state  }; 

       return fields;         
    }

    return(<div className={classes.content}>
                <div className={classes.paper}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        onChange={(ev) => setRegistry({...registry, name: ev.target.value })}
                        value={registry.name}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="slug"
                        label="Slug"
                        onChange={(ev) => setRegistry({...registry, slug: Slug(ev.target.value) })}
                        value={registry.slug}
                        id="slug"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="city"
                        label="City"
                        onChange={(ev) => setRegistry({...registry, city: ev.target.value })}
                        value={registry.city}
                        id="city"
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="state">State</InputLabel>
                        <Select
                                className={classes.select}
                                labelId="state"
                                id="state"
                                value={registry.state}
                                onChange={(ev) => setRegistry({...registry, state: ev.target.value })}
                        >
                        {States.map( (item) => <MenuItem key={item} value={item}>{item}</MenuItem> )} 
                        </Select>
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={()=>submit()}
                        className={classes.submit}
                    >
                        Salvar
                    </Button>
                </div>
            </div>
    )
}


export default Register;