import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'

export const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#e4dddf',
      color: '#202945',
      fontSize: '1.2em'
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);
  
export const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
}))(TableRow);

export const StyledBreadcrumbs = withStyles((theme) => ({
    root: {
      marginBottom:'20px'
    },
}))(Breadcrumbs);

export const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
    plus: {
        position: 'fixed',
        right:'5%',
        bottom:'5%'
      },
      menuIcon:{
        color: 'white'
    },
});
export const useSearchStyles = makeStyles((theme) => ({
    content:{
      display:'flex',
      justifyContent:'center',
      marginTop:'10%'
    },
    
    paper: {
      position: 'absolute',
      width: 400,
      borderRadius:'10px',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    formControl:{
      marginTop: theme.spacing(2),
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor:'#d5013b',
      color:'white',
      "&:hover, &:focus":{
          backgroundColor:'#e34a5a'
      }
    },
    select: {
      marginBottom: theme.spacing(2),
      width: '100%',
    },
} ));
