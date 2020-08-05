import React, {useState, useEffect} from 'react'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import moment from 'moment'
import Modal from '@material-ui/core/Modal'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton'
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';


import api from '../../services/api'
import DefaultLayout from '../../containers/DefaultLayout'
import {logout} from '../../services/auth'
import Register from '../Register'
import Search from './search'

import { StyledTableCell, StyledTableRow, useStyles, StyledBreadcrumbs, addStyle } from './styles'

const Places = (props) => {
    const classes = useStyles();
    const [places, setPlaces] = useState([])
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState({ open:false, registry:{} })
    const [modalSearch, setModalSearch] = useState(false)

    useEffect(() => {
        getAll()
    }, [])

    function handle_error(e) {
        if ( e.response.status == 401 ){
            logout();
            props.history.push('/signin')      
        } 
    }

    async function getAll(){
        setLoading(true);
        try{
            const response = await api.get(`/api/v1.0/places`)
            setPlaces(response.data.places)
        } catch(e){
            handle_error(e)
        }
        setLoading(false);
        return false; 
    }

    async function getByName(query){
        try{
            const response = await api.get(`/api/v1.0/places/search/${query}`)
            return response.data
        } catch(e){
            handle_error(e)
        }
        return false; 
    }

    async function getBySlug(query){
        try{
            const response = await api.get(`/api/v1.0/places/${query}`)
            return response.data
        } catch(e){
            handle_error(e)
        }
        return false; 
    }

    async function search(data){
        if (data.query.length == 0 ) return false;
        
        setLoading(true);
        if ( data.type == 'slug' ){
          const response = await getBySlug(`${data.query}`);
          if (response)
            setPlaces([response.place])
        } else {
          const response =  await getByName(`${data.query}`);
          if (response)
            setPlaces(response.places)
        }
        setLoading(false);

        setModalSearch(false);
    }
    const getSearchButton = 
        <IconButton onClick={() => setModalSearch(true)} aria-label="search">
            <SearchIcon className={classes.menuIcon} />
        </IconButton> 

        
    return(
        <DefaultLayout
            nav={getSearchButton}
        >
           {loading ? <div className="loading" ></div> : null }
            <StyledBreadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/">
                    Home
                </Link>
                <Typography color="textPrimary">Places</Typography>
            </StyledBreadcrumbs>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Place</StyledTableCell>
                            <StyledTableCell align="center">Slug</StyledTableCell>
                            <StyledTableCell align="center">City</StyledTableCell>
                            <StyledTableCell align="center">State</StyledTableCell>
                            <StyledTableCell align="center">Created</StyledTableCell>
                            <StyledTableCell align="center">Updated</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {places.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                <b>#{row.id}</b> {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.slug}</StyledTableCell>
                            <StyledTableCell align="center">{row.city}</StyledTableCell>
                            <StyledTableCell align="center">{row.state}</StyledTableCell>
                            <StyledTableCell align="center">{ moment(row.created_at).format('DD/MM/YYYY HH:mm:ss')}</StyledTableCell>
                            <StyledTableCell align="center">{ row.updated_at.length == 0 ? 'Sem Edição' : moment(row.updated_at).format('DD/MM/YYYY HH:mm:ss')}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button variant="contained" color="primary" onClick={()=> setModal({open:true, registry:row})}>
                                    <EditIcon />
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                <Modal
                    open={modal.open}
                    onClose={() => setModal({open:false, registry:{}}) }
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <Register callback={ ()=> { setModal({open:false, registry:{}}); getAll() }} reg={modal.registry} />
                </Modal>
                <Modal
                    open={modalSearch}
                    onClose={() => setModalSearch(false) }
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <Search callback={ search }/>
                </Modal>
                <div className={classes.plus}>
                    <Fab color="secondary" onClick={()=> setModal({open:true, registry:[]})} >
                        <AddIcon />
                    </Fab>                
                </div>
                
        </DefaultLayout>
    )
}


export default Places;