import React from 'react';
import {
  FlatList,
} from "react-native";
import axios from "axios";
import { Card, Title, Button } from "react-native-paper";
import Indicator from "./Indicator";

class Films extends React.Component{

  state = {
    tren: [],
    indicator: true
  }

  componentDidMount() {
    this.kinos()
  }

  kinos = async () => {
    try {
      const as = await axios.get(`https://api.themoviedb.org/3/movie/popular/?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru`)
      console.log(as)
      this.setState({
        trend: as.data.results
      })
    } catch (e){
      console.log(e)
    } finally {
      this.setState({
        indicator: false
      })
    }
  }

  liza = (item) => {
    this.props.navigation.navigate(`Fil`,{
      prop: item.title,
      id: item

    })
  }

  render() {
    if(this.state.indicator){
      return (
        <>
          <Indicator/>
        </>
      )
    }
    return (
      <>
        <FlatList
          numColumns={2} horizontal={false}
          style={{
            backgroundColor: `rgba(155, 224, 216, 0.88)`, padding: 6,
          }}
          data={this.state.trend}
          renderItem={({item})=>{
            return(
              <Card
                onPress={()=>this.liza(item)}
                style={{
                  margin: 8,
                  width: `50%`,
                  height: `90%`,
                }}>
                <Card.Cover   source={{ uri:`https://image.tmdb.org/t/p/w500${item.poster_path}` }} />
                <Card.Content>
                  <Title>{item.title}</Title>
                </Card.Content>
              </Card>
            )
          }}
        />
      </>
    )
  }
}
export default Films;
