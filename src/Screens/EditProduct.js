import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { Input, Button } from 'react-native-elements'

import { launchImageLibrary } from 'react-native-image-picker';

const { width} = Dimensions.get("window")

export default function EditProduct({ navigation }) {
    const [name, setname] = useState(null)
    const [subtitle, setsubtitle] = useState(null)
    const [like, setlike] = useState(null)
    const [sources, setsource] = useState({
        isImageAvailable: false,
        profilePic: null
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
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
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
            await AsyncStorage.setItem(`${name}`, JSON.stringify(USER_1))
                .then(res => {
                    navigation.pop()

                })
                .catch(err => console.log(`Error inside Savaedata is:${err}`))

        } catch (e) {

        }
    }


    return (
        <View style={styles.container} >
            <View style={styles.imagecontainer}>
                {
                    sources.isImageAvailable
                        ?
                        <Image
                            style={styles.image}
                            source={sources.profilePic}
                        />
                        :


                        <TouchableOpacity onPress={() => selectProfilePic()} style={{ borderWidth: 2, backgroundColor: "lightgray", borderRadius: 10, alignItems: "center", }}>
                            <Text style={{ fontSize:16 , color: "black", alignSelf: "center", marginTop: 10,padding:5 }}>Choose Profile Pic</Text>
                        </TouchableOpacity>

                }
            </View>
            <View style={styles.NameandLike}>
                <Input
                    placeholderTextColor="gray"
                    placeholder="Name"
                    inputStyle={styles.name}
                    onChangeText={text => setname(text)}


                />
                <Input
                    placeholderTextColor="gray"
                    placeholder="Location"
                    inputStyle={styles.subtitle}
                    onChangeText={text => setsubtitle(text)}

                />
                <Input
                    placeholderTextColor="gray"
                    placeholder="Like"
                    inputStyle={styles.like}
                    onChangeText={text => setlike(text)}
                    keyboardType="number-pad"
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
