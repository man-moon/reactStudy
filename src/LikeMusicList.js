import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Card, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';

import firebase from './firebase';
import MusicContrllerUI from './MusicContrllerUI';

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
          {this.state.list&&this.state.list.map(item => {
            return (
            <MusicContrllerUI key={item[0].collectionId} val={item[0]}>

            </MusicContrllerUI>
            )
          })}
      </div>
    );
  };
}

export default LikeMusicList
