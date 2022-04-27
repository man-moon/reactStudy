import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Card, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';

import firebase from './firebase';

class LikeMusicList extends React.Component{
 
  render () {
    let db = firebase.firestore();
    let snapshot = db.collection("likes");
    let list = []

    snapshot.get().then(function(querySnapshot) {
      if (querySnapshot) {
        querySnapshot.forEach(function(item){
          //doc.id로 id 접근 가능
          fetch(`https://itunes.apple.com/lookup?id=${item.id}&entity=album`).then(r => r.json()).then(r => {
            list.push(r.results[0]);
          }).catch(e => console.log(e));
        })
      }
      else {
          console.log("No such document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    //console.log(list);

    ///*** 여기서부터 list 인식을 못 함.. ***/
    return (
      <div>
          {list.map(item => {
            <Card key={item.collectionId} className={classes.card}>
              <CardContent>
                  <Typography variant="subtitle1"> {item.artistName}</Typography>
                  <Typography variant="subtitle2"> {item.collectionCensoredName}</Typography>
              </CardContent>
              <img src = {item.collectionViewUrl} alt = {item.collectionName}></img>
            </Card>
          })}
      </div>
    );
  };
}

export default LikeMusicList