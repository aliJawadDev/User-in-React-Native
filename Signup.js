import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, TextInput, AsyncStorage,Alert } from 'react-native'
import { Card, Icon, Divider, Input, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Col, Row, Grid } from "react-native-easy-grid";

var user = <Icon name='user' type='font-awesome' style={{ paddingLeft: 10 }} />

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: '',
            Email: '',
            Password: '',
            CPassword: '',
            TextEntry: true,
        }
    }
    sendData = () =>{
        this.state.Password==this.state.CPassword? this.storeData() : alert('Please make sure your Password and Confirm Passwords are same!') ;
    }
    checkUser = () =>{
        this.state.UserName.length >= 3 ? this.checkMail() : alert('Enter Username! (At least 3 letters)')
    }
    checkMail = () =>{
        this.state.Email.includes('@' && '.com') ? this.checkPass() : alert('Invalid Email Address!')
    }
    checkPass = () =>{
        this.state.Password.length >= 8 ? this.sendData() : alert('Enter Password! (At least 8 characters!)')
    }
    storeData = async () => {
        const data= {
            user:this.state.UserName,
            email:this.state.Email,
            password:this.state.Password,
        }
        try {
          await AsyncStorage.setItem('users', JSON.stringify(data));
          Alert.alert('User Created')
        } catch (error) {
        }
      };
      retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('users');
          if (value !== null) {
            Alert.alert(value);
          }
        } catch (error) {
        }
      };
    toggle = () =>{
        this.setState({
            TextEntry:!this.state.TextEntry
        })
    }
    render() {
        const goTomain = () => {
            Actions.main()
        }
        return (
            <ScrollView style={style.container}>
                <View style={style.top}>
                    <Text style={{ textAlign: 'center', fontFamily: 'serif', fontSize: 50, color: 'white' }}>Sign Up</Text>
                </View>
                <View style={style.body}>
                    <View style={style.inputs}>
                        <View style={style.section}>
                        <Icon name='user' type='font-awesome' style={style.icon} />
                        <TextInput placeholder='Username' autoCapitalize="none" style={style.input} onChangeText={UserName => this.setState({ UserName })} />
                        </View>
                        <View style={style.section}>
                        <Icon name='envelope' type='font-awesome' style={style.icon} />
                        <TextInput placeholder='E-mail' autoCapitalize="none" style={style.input} onChangeText={Email => this.setState({ Email })} />
                        </View>
                        <View style={style.section}>
                        <Icon name='key' type='font-awesome' style={style.icon} />
                        <TextInput placeholder='Password' autoCapitalize="none" secureTextEntry={this.state.TextEntry} style={style.input} onChangeText={Password => this.setState({ Password })} />
                        <View style={{marginRight:10}}>
                        <TouchableOpacity onPress={this.toggle} >
                        <Icon name={this.state.TextEntry ? 'eye-slash' : 'eye'} type='font-awesome' style={style.icon} />
                        </TouchableOpacity>
                        </View>
                        </View>
                        <View style={style.section}>
                        <Icon name='check' type='font-awesome' style={style.icon} />
                        <TextInput autoCapitalize="none" placeholder='Confirm Password' secureTextEntry={true} style={style.input} onChangeText={CPassword => this.setState({ CPassword })} />
                        </View>
                        
                        <Grid>
                            <Row style={{ top: 10 }}>
                                <Col size={1}></Col>
                                <Col size={2}><Button onPress={this.checkUser} title="Sign Up" style={{ fontSize: 10 }} /></Col>
                                <Col size={1}></Col>
                            </Row>
                        </Grid>
                        <Grid>
                            <Row style={{ top: 10 }}>
                                <Col size={1}></Col>
                                <Col size={2}><Button onPress={this.retrieveData} title="get data" style={{ fontSize: 10 }} /></Col>
                                <Col size={1}></Col>
                            </Row>
                        </Grid>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={goTomain} style={{ flex: 1, width: 135, alignItems: 'center' }}>
                            <Text style={style.new}>
                                I have an account!
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </ScrollView>
        )
    }
}
const style = {
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    inputs: {
        marginTop: 50,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        fontFamily: 'serif',
        backgroundColor: 'white',
    },
    new: {
        color: 'yellow',
        textDecorationLine: 'underline',
        marginBottom: 50,
        marginTop:30,
    },
    top: {
        backgroundColor: 'blue',
        padding: 0,
        marginTop: 23,
        borderWidth: 1,
        borderColor: "transparent",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginLeft: 10,
        marginRight: 10,
    },
    body: {
        borderWidth: 1,
        borderColor: "transparent",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: 'gray',
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