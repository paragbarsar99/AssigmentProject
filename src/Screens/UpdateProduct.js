import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { Input } from 'react-native-elements'

import { launchImageLibrary } from 'react-native-image-picker';

const { width } = Dimensions.get("window")

export default function UpdateProduct({ navigation, route }) {

    const { Username, Userlike, Usersubtitle, Usersource } = route.params

    const [name, setname] = useState(Username)
    const [subtitle, setsubtitle] = useState(Usersubtitle)
    const [like, setlike] = useState(Userlike)
    const [sources, setsource] = useState({
        isImageAvailable: true,
        profilePic: { uri: Usersource }
    })

   
    function selectProfilePic() {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, async (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.assets[0].uri };
                setsource({
                    ...sources,
                    profilePic: source,
                    isImageAvailable: true
                });
            }
        })
    }


    async function SaveData() {
        try {
            const USER_1 = {
                ...sources.profilePic,
                name,
                subtitle,
                like,
            }

            DeleteProfile()
            await AsyncStorage.setItem(`${name}`, JSON.stringify(USER_1))
                .then(res => {
                })
                .catch(err => console.log(`Error inside Savaedata is:${err}`))

        } catch (e) {

        }
    }

    async function DeleteProfile() {
        await AsyncStorage.removeItem(`${Username}`)
        navigation.pop()
    }

    return (
        <View style={styles.container} >
            <View style={styles.imagecontainer}>

                <Image
                    style={styles.image}
                    source={{ uri: sources.profilePic.uri }}
                />

                <TouchableOpacity onPress={() => selectProfilePic()} style={{ borderWidth: 2, backgroundColor: "lightgray", borderRadius: 10, alignItems: "center",marginTop:20 }}>
                    <Text style={{ fontSize: 16, color: "black", alignSelf: "center", marginTop: 10, padding: 2 }}>Choose Profile Pic</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.NameandLike}>
                <Input
                    placeholderTextColor="gray"
                    placeholder="Name"
                    inputStyle={styles.name}
                    onChangeText={text => setname(text)}
                    defaultValue={name}

                />
                <Input
                    placeholderTextColor="gray"
                    placeholder="Location"
                    inputStyle={styles.subtitle}
                    onChangeText={text => setsubtitle(text)}
                    defaultValue={subtitle}
                />
                <Input
                    placeholderTextColor="gray"
                    placeholder="Like"
                    inputStyle={styles.like}
                    onChangeText={text => setlike(text)}
                    keyboardType="number-pad"
                    defaultValue={like}
                />
            </View>

            <TouchableOpacity activeOpacity={0.7} onPress={() => SaveData()}>
                <View style={{
                    borderRadius: 20,
                    alignSelf: "center",
                    alignItems: "center",
                    width: width / 2,
                    backgroundColor: "rgb(135,206,250)",
                    height: 50,

                }}>
                    <Text style={styles.addProduceText}>
                        Save
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => DeleteProfile()}>
                <View style={{
                    borderRadius: 20,
                    alignSelf: "center",
                    alignItems: "center",
                    width: width / 2,
                    backgroundColor: "rgb(135,206,250)",
                    height: 50,

                }}>
                    <Text style={styles.addProduceText}>
                        Delete
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        flex: 1,
        justifyContent: "space-evenly"
    },
    imagecontainer: {
        width: 150,
        height: 150,
        alignItems: "center",
        alignSelf: "center",
        margin: 10
    },
    image: {
        width: 150,
        height: 150,
        left: 5,
        top: 10,
        alignSelf: "center"
    },
    NameandLike: {
        justifyContent: "center",
        marginTop:50

    },
    name: {
        fontSize: 18,
        color: "black",
        textTransform: "capitalize"

    },
    subtitle: {
        fontSize: 18,
        color: "black",
        textTransform: "capitalize"
    },
    like: {
        fontSize: 18,
        color: "black"
    },
    addProduceText: {
        padding: 10,
        color: "black",
        fontSize: 18,

    }

})
