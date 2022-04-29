import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Card, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';

import firebase from './firebase';

class LikeMusicList extends React.Component{
  
  state = {
    list: []
  }
  
  componentDidMount() {
    let db = firebase.firestore();
    let snapshot = db.collection("likes");

    snapshot.get().then((querySnapshot) => {
      if (querySnapshot) {
        querySnapshot.forEach((item) => {
          fetch(`https://itunes.apple.com/lookup?id=${item.id}&entity=album`).then(r => r.json()).then(r => {
            this.setState({
              list: r.results[0]
            })
            console.log(r.results[0]);
          }).catch(e => console.log(e));
        })
      }
      else {
          console.log("No such document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

  }
 
  render () {

    return (
      <div>
          {this.state.list.results&&this.state.list.results.map(item => {
            return (
            <Card key={item.collectionId} className={classes.card}>
              <CardContent>
                  <Typography variant="subtitle1"> {item.artistName}</Typography>
                  <Typography variant="subtitle2"> {item.collectionCensoredName}</Typography>
              </CardContent>
              <img src = {item.collectionViewUrl} alt = {item.collectionName}></img>
            </Card>)
          })}
        {console.log(this.state.list)}
      </div>
    );
  };
}

export default LikeMusicList