import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/core'
import React, { useRef, useEffect,useCallback } from 'react'
import { StyleSheet, Image, Text, View, Dimensions, TouchableOpacity, Animated, FlatList, Touchable, LogBox } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import { FetchProduct } from './Store/Actions/getdataAction'

const { width, height } = Dimensions.get("window")

export default function Home({ navigation }) {

    const Animation = useRef(new Animated.Value(0)).current

    const inputRange = [10, 40]//pixel

    const OpacityActive = Animation.interpolate({
        inputRange: inputRange,
        outputRange: [1, 0],
        extrapolate: "clamp"
    })

    const dispatch = useDispatch()

    const { Fetch } = useSelector(item => item)


    useFocusEffect(
        useCallback(() => {
            dispatch(FetchProduct())
        },[])
    )


   
    function listitem({ item }) {
        return (
            <TouchableOpacity activeOpacity={0.5} onLongPress={() => console.log("hello")} onPress={() => navigation.navigate("UpdateProduct", {
                Username: item.name,
                Usersubtitle: item.subtitle,
                Userlike: item.like,
                Usersource: item.uri
            })}>
                <View style={styles.producetdetails}>
                    <View style={styles.imagenamecontainet}>
                        <Image source={{ uri: item.uri }} style={styles.productimage} />
                    </View>
                    <View style={styles.nameandothercontainer}>
                        <View>
                            <Text style={styles.name}>
                                {item.name}
                            </Text>

                            <Text style={styles.subtitle}>
                                {item.subtitle}
                            </Text>
                        </View>
                        <Text style={styles.discription}>
                            Like {item.like}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.container} >
            {
                Fetch.data != null
                    ?

                    <>
                        <Animated.FlatList
                            contentContainerStyle={styles.listcontainer}
                            showsVerticalScrollIndicator={false}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: Animation } } }],
                                { useNativeDriver: true }
                            )}
                            data={Fetch.data}
                            keyExtractor={item => item.name}
                            renderItem={listitem}

                        />
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("EditProduct")}>
                            <Animated.View style={{ opacity: OpacityActive, ...styles.addProduct }}>
                                <Text style={styles.addProduceText}>
                                    Add Product
                                </Text>
                            </Animated.View>
                        </TouchableOpacity>
                    </>
                    :
                    <>

                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("EditProduct")}>
                            <View style={{
                                borderRadius: 20,
                                alignSelf: "center",
                                alignItems: "center",
                                width: width / 2,
                                backgroundColor: "rgb(135,206,250)",
                                height: 50,
                                marginTop: height - (height / 8)

                            }}>
                                <Text style={styles.addProduceText}>
                                    Add Product
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        flex: 1,

    },
    listcontainer: {
        width: width,
        justifyContent: "space-around",
        flexDirection: "column",
        paddingBottom: 10

    },
    producetdetails: {
        width: width,
        backgroundColor: "#ffffff",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 15
    },
    nameandothercontainer: {
        width: width / 2,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    imagenamecontainet: {
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
    },
    productimage: {
        width: 150,
        height: 150,
    },
    name: {
        fontSize: 19,
        fontWeight: "bold",
        marginTop: 10
    },
    subtitle: {
        fontSize: 14,
        marginTop: 10,
        color: "gray"
    },

    discription: {
        fontSize: 14,
        fontStyle: "normal",
    },
    addProduct: {
        bottom: 5,
        position: "absolute",
        borderRadius: 20,
        alignSelf: "center",
        alignItems: "center",
        width: width / 2,
        backgroundColor: "rgb(135,206,250)",
        height: 50,

    },
    addProduceText: {
        padding: 10,
        color: "black",
        fontSize: 18,

    }

})
