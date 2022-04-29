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
    let newList = [];

    snapshot.get().then((querySnapshot) => {
      if (querySnapshot) {
        querySnapshot.forEach((item) => {
          fetch(`https://itunes.apple.com/lookup?id=${item.id}&entity=album`).then(r => r.json()).then(r => {
            newList = this.state.list
            newList.push(r.results);
            this.setState({
              list: newList,
            })
            console.log(this.state.list)
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
    let idx = 0;
    return (
      <div>
          {this.state.list&&this.state.list.map(item => {
            return (
            <Card key={item[0].collectionId}>
              <CardContent>
                  <Typography variant="subtitle1"> {item[0].artistName}</Typography>
                  <Typography variant="subtitle2"> {item[0].collectionCensoredName}</Typography>
              </CardContent>
              <img src = {item[0].collectionViewUrl} alt = {item[0].collectionName}></img>
            </Card>)
          })}
        {console.log(this.state.list)}
      </div>
    );
  };
}

export default LikeMusicList