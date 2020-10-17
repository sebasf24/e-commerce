import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles,AppBar, Box,Typography,Tabs, Tab } from '@material-ui/core';
import HomeCategories from '../FormCategory/HomeCategories'
import FormularioAdmin from '../formProductAdmin/formProductAdmin'
import HomeUser from '../User/HomeUser'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1

  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  containerTabla:{
    alignItems: 'center'
},
searchInput: {
  fontSize: theme.typography.fontSize,
},
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={4}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


export default function NavbarAdmin() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.searchBar}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Categorias" />
          <Tab label="Productos"/>
          <Tab label="Orders"/> 
          <Tab label = "Users"/>   
          
        </Tabs>
      </AppBar>
      <Grid item xs={12} className={classes.containerTabla}>
         <TabPanel value={value} index={0}>
           <HomeCategories/>
           </TabPanel>
      </Grid>    
    </div>
  );
}