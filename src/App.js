import React from 'react';
//import './App.css';
//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {AppBar, Typography, TextField, Button, Input} from '@material-ui/core';
//import AppBar from '@material-ui/core/AppBar';
//import Toolbar from '@material-ui/core/Toolbar';
//import MenuIcon from '@material-ui/icons/Menu';
//import IconButton from '@material-ui/core/IconButton';
//import ExitToApp from '@material-ui/icons/ExitToApp';
//import Drawer from '@material-ui/core/Drawer';
//import Forms from './Forms';
//import HomeIcon from '@material-ui/icons/Home';
//import Typography from '@material-ui/core/Typography';
import MusicList from './MusicList';
import music_list from './data';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            music_list : {},
            searchWord : '',
        }
    }

    //In browser https://itunes.apple.com/search?term="blackpink"&entity=album

    handleSearchTextChange = (event) => {
      //console.log(event.target.value);
      this.setState({searchWord : event.target.value});
    }

    handleSearch = (event) => {
      event.preventDefault();
      console.log(this.state.searchWord);
      this.setState({searchWord : event.target.value});
      
      fetch(`https://itunes.apple.com/search?term="${this.state.searchWord}"&entity=album`).then(r => r.json()).then(r => {
          console.log(r);
          this.setState({music_list : r, searchWord : ''});
      }).catch(e => console.log('error when search musician'));
    }

    render () {
        return (
            <div>
              <AppBar position="fixed">
                  <Typography align="center" variant="h3" color="inherit">Your Favorite Musics</Typography>
              </AppBar>
              
              <div style={{height: 60, width: '100%'}}></div>
              <form style={{display: 'flex', marginBottom : 20}}>

              <div style={{display : 'flex', marginLeft : 'auto', marginRight : 'auto',}}>
                <TextField variant="outlined" label="Enter your favorite Singer!" type="search" style={{width : 450}}
                   onChange={this.handleSearchTextChange} value={this.state.searchWord}>

                </TextField>
                <Button variant="contained" color="primary" type="submit" onClick={this.handleSearch} style={{marginLeft : 20}}>
                    Search
                </Button>
              </div>

              </form>
              { this.state.music_list.results && this.state.music_list.results.length > 0 && 
                  <MusicList list={this.state.music_list}>

                  </MusicList>
              }

            </div>
        );
    }
}