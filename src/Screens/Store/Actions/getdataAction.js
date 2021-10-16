import { FETCH_ITEM, AUTH_USER } from '../AllTheAction'
import AsyncStorage from '@react-native-async-storage/async-storage'




export const FetchProduct = () => {
    return async (dispatch) => {
        try {
            await AsyncStorage.getAllKeys()
                .then(async (res) => {
                    let value = await AsyncStorage.multiGet([...res])
                    let payload = value.map((result, i, store) => store[i][1])
                    let finalpayload = payload.map((result, i, store) => JSON.parse(result))
                    dispatch({ type: FETCH_ITEM, payload: finalpayload })
                })
        } catch (e) {
            console.log(`error inside FetchProduct is:${e}`);

        }
    }
}