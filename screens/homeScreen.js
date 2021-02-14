import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';

 class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      displayText:'',
      isSearchPressed:false
    };
  }
  //  https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json" is the link
  getWord=(word)=>{
      var searchKeyWord=word.toLowerCase()
      var url = "https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json"
      return fetch(url)
      .then((data)=>{
          if(data.status===200){
              return data.json()
          }else{
              return null
          }
      })
      .then((response)=>{
          var responseObject = response
          if(responseObject){
              var wordData=responseObject.definitions[0]
              var definition=wordData.description
              var lexicalCategory=wordData.wordtype
              this.setState({
                  "word":this.state.text,
                  "definition":definition,
                  "lexicalCategory":lexicalCategory
              })
          }else{
              this.setState({
                  "word":this.state.text,
                  "definition":"Not Found",
              })
          }
      })
  }
  texts=()=>{
    this.setState({
      word:this.state.text
    })
  }
  render() {
    return (
      <View style={styles.container}>
       <Header
          backgroundColor="#42A6D8"
          leftComponent={{ icon: 'menu' }}
          centerComponent={{
            text: 'Dictionary App',
            style: { color: 'purple' },
          }}
        />

        <TextInput
        style={{ marginTop: 200, width: '80%', alignSelf: 'center', height: 40, textAlign: 'center', borderWidth: 2, outline: 'none', }}
          onChangeText={(text) => {
            //the right text is different than the state
            this.setState({
                text: text,
                isSearchPressed:false,
                word:"Loading...",
                lexicalCategory:'',
                examples:[],
                definition:"" 
                });
          }}
          value={this.state.text}
        />
        <TouchableOpacity style={styles.search} 
        onPress={()=>{
          this.setState({isSearchPressed:this.state.isSearchPressed});
          this.getWord(this.state.text)
          this.texts();
        }}>
        Search
        </TouchableOpacity>

        <Text style={styles.search}>Word:{" "}</Text>

        <Text style={styles.search}>{this.state.word}</Text>

        <Text>Type:{" "}</Text>

        <Text>{this.state.lexicalCategory}</Text>
        
        <Text style={styles.outcome}>{this.state.displayText}</Text>

        <Text>Definition:{" "}</Text>

        <Text>{this.state.definition}</Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  search: {
    alignItems:'center'
  },
  outcome: {
    alignItems:'center'
  },
});
export default HomeScreen;