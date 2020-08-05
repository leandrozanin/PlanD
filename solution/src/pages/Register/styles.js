import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
}));
