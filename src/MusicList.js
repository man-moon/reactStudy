import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Card, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import {Favorite, FavoriteBorder} from '@material-ui/icons';

import firebase from './firebase';
import SnackbarMsg from './snackmsg';

const styles = theme => ({
    content : {},
    layout : {
        display : 'flex',
        justifyContent : 'center'
    },
    card: {
        minWidth: 275,
        maxWidth: 600,
        marginBottom : 20,
        marginLeft : 'auto',
        marginRight : 'auto',
    },
});



class MusicList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            likes : {},
            snackbar : {},
        };
    }

    toggleFavorite = (id) => () => {
        let {likes} = this.state;
        console.log(id, likes[id]);
        if(likes[id] == undefined) {
            likes[id] = true;
        }
        else {
            likes[id] = (likes[id]) ? false : true;
        }

        let db = firebase.firestore();
        db.collection('likes').doc(String(id)).set({like : likes[id]});
        
        
        try {
            let ref = db.collection('likes').doc(String(id));
            ref.get().then((doc) => {
                if (doc.exists) {
                    console.log('document data : ', doc.data());    
                }
                else {
                    console.log('No Such Document')
                }
            }).catch((e) => {
                console.log('Error while accessing Firestore : ' + e);
            });
        }
        catch (e) {
            console.log('Error Occurred : '+ e);
        } 


        this.setState({likes, snackbar : {open : true, msg : `id ${id} clicked`}});
    }

    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
      
          this.setState({snackbar : {open : false, msg : ''}});
    }       


    render () {
        const {classes} = this.props;
        const results = this.props.list["results"];
        //console.log(results[0]["collectionViewUrl"]);
        let idx = -1;
        return (
            <div>
                {this.props.list.results.map(item => {
                    return (
                    <Card key={item.collectionId} className={classes.card}>
                        <CardContent>
                            <Typography variant="subtitle1"> {item.artistName}</Typography>
                            <Typography variant="subtitle2"> {item.collectionCensoredName}</Typography>
                        </CardContent>
                        <img src = {results[++idx]["artworkUrl100"]} alt = {results[idx]["collectionName"]}></img>
                        <CardActions>
                            <IconButton onClick={this.toggleFavorite(item.collectionId)}>
                            {this.state.likes[item.collectionId] ? <Favorite /> : <FavoriteBorder />}
                            </IconButton>
                        </CardActions>
                    </Card>)
                })}
                <SnackbarMsg open={this.state.snackbar.open} message={this.state.snackbar.msg} onClose={this.handleSnackbarClose}></SnackbarMsg>
            </div>
        );
    }
}

export default withStyles(styles)(MusicList);