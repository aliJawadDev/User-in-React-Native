import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView,TextInput,AsyncStorage } from 'react-native'
import { Card, Icon,Divider,Input, Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { Col, Row, Grid } from "react-native-easy-grid";

var user = <Icon name='user' type='font-awesome' style={{paddingLeft:10}} />

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: '',
            Email: '',
            Password: '',
            TextEntry: true
        }
    }
    toggle = () =>{
        this.setState({
            TextEntry:!this.state.TextEntry
        })
    }
    retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('users');
          if (value !== null) {
            Alert.alert(value);
          }
        } catch (error) {
            alert('no user!')
        }
      };
    render(){
            const goToSignup = () => {
                Actions.sign()
            }
        return(
            <ScrollView style={style.container}>
                    <View style={style.top}>
                    <Text style={{textAlign:'center', fontFamily:'serif', fontSize:50 ,color:'white'}}>Login</Text>
                    </View>
                    <View style={style.body}>
                    <View style={style.inputs}>
                        <View style={style.section}>
                        <Icon name='user' type='font-awesome' style={style.icon} />
                        <TextInput autoCapitalize="none" placeholder='Username' style={style.input} onChangeText={UserName => this.setState({ UserName })} />
                        </View>
                        <View style={style.section}>
                        <Icon name='envelope' type='font-awesome' style={style.icon} />
                        <TextInput autoCapitalize="none" placeholder='E-mail' style={style.input} onChangeText={Email => this.setState({ Email })} />
                        </View>
                        <View style={style.section}>
                        <Icon name='key' type='font-awesome' style={style.icon} />
                        <TextInput autoCapitalize="none" placeholder='Password' secureTextEntry={this.state.TextEntry} style={style.input} onChangeText={Password => this.setState({ Password })} />
                        <View style={{marginRight:10}}>
                        <TouchableOpacity onPress={this.toggle} >
                        <Icon name={this.state.TextEntry ? 'eye-slash' : 'eye'} type='font-awesome' style={style.icon} />
                        </TouchableOpacity>
                        </View>
                        </View>
                    <Grid>
                        <Row style={{top:10}}>
                            <Col size={1}></Col>
                            <Col size={2}><Button onPress={this.retrieveData} title="Log In" style={{fontSize:10}} /></Col>
                            <Col size={1}></Col>
                        </Row>
                    </Grid>
                    </View>
                    <Text>{this.state.UserName}</Text>
                    <Text>{this.state.Email}</Text>
                    <Text>{this.state.Password}</Text>

                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity onPress={goToSignup} style={{flex:1,width:145,alignItems:'center'}}>
                            <Text style={style.new}>
                                Don't have an account?
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </View>
            </ScrollView>
        )
    }
}
const style ={
    container:{
        flex:1,
        backgroundColor:'black',
    },
    inputs:{
        marginTop:75,
    },
    input:{
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        fontFamily: 'serif',
        backgroundColor: 'white',
    },
    new:{
        color:'yellow',
        textDecorationLine: 'underline',
        marginBottom:90,
    },
    top:{
        backgroundColor: 'blue',
        padding:0,
        marginTop:23,
        borderWidth:1,
        borderColor:"transparent",
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        marginLeft: 10,
        marginRight: 10,
    },
    body:{
        borderWidth:1,
        borderColor:"transparent",
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        backgroundColor:'gray',
        marginLeft: 10,
        marginRight: 10,
    },
    section: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        margin:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    icon: {
        padding: 10,
        margin:30,
    },
}