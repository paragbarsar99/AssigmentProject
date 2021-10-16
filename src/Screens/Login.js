import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Input, Button } from 'react-native-elements'

const { width, height } = Dimensions.get("window")

const Login = ({ navigation }) => {

    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)
    const [emailerror, setemailerror] = useState(false)
    const [passworderror, setpassworderror] = useState(false)

    function MovetoHome() {
        if (email && password) {
            navigation.navigate("Home")
        } else if (!email) {
            setemailerror(true)
        } else if (!password) {
            setpassworderror(true)
        }else{
            setemailerror(true)
        }
    }


    return (

        <LinearGradient
            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
            locations={[0, 1]}
            colors={['#4ca2cb', '#67b26f']}
            style={styles.linearGradient}>
            <View style={styles.container}>
                <StatusBar backgroundColor="#4ca2cb" />
                <Image style={styles.image} source={require("../Assests/image.png")} />
                <Text style={styles.brand}>
                    Brand
                </Text>

                <Input
                    containerStyle={styles.email}
                    placeholder="Email"
                    leftIcon={{ type: "Zocial", name: "email", color: "white" }}
                    placeholderTextColor="gray"
                    inputStyle={{ color: "white", }}
                    autoCapitalize="none"
                    autoCompleteType="off"
                    blurOnSubmit={true}
                    errorMessage={
                        emailerror
                            ?
                            "Please Fill The Email"
                            :
                            false
                    }
                    onChangeText={item => setemail(item)}
                >
                </Input>
                <Input
                    blurOnSubmit={true}
                    containerStyle={styles.password}
                    style={styles.password}
                    placeholder="Password"
                    leftIcon={{ type: "FontAwesome", name: "lock", color: "white" }}
                    placeholderTextColor="gray"
                    secureTextEntry={true}
                    keyboardType="name-phone-pad"
                    inputStyle={{ color: "white", }}
                    errorMessage={
                        passworderror
                            ?
                            "Please Fill The Password"
                            :
                            false
                    }
                    onChangeText={item => setpassword(item)}
                >

                </Input>

                <Button
                    type="solid"
                    title="Login"
                    buttonStyle={styles.btnlogin}
                    titleStyle={{ color: "blue", fontSize: 18 }}
                    containerStyle={{ width: 300, alignSelf: "center" }}
                    onPress={() => MovetoHome()}

                />
            </View>
        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1
    },
    image: {
        width: 130,
        height: 130,
        alignSelf: "center",
        marginTop: 0
    },
    brand: {
        color: '#ffffff',
        fontSize: 30,
        alignSelf: "center",
        margin: 5,
        fontWeight: "400"
    },
    EandPContainer: {

    },
    email: {
        marginTop: 0,

    },
    password: {

    },
    btnlogin: {
        backgroundColor: "white"
    },
    linearGradient: {
        width: width,
        height: height,
        flex: 1,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },

})

export default Login
