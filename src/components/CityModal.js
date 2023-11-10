import { Modal, StyleSheet, View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux"

export const CityModal = ({ visible, close, onPress }) => {
    const getCitys = useSelector((st) => st.getCitys)
    return <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => close()}
                style={styles.centeredView}>
                <View style={styles.modalView}>
                    {getCitys.loading ?
                        <View style={styles.loading}>
                            <ActivityIndicator color={'black'} />
                        </View > :

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {getCitys.data?.map((elm, i) => (
                                <TouchableOpacity key={i} onPress={() => {
                                    onPress({ name: elm.name, id: elm.id })
                                    close()
                                }}>

                                    <Text key={i} style={styles.modalText}>{elm.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    }
                </View>
            </TouchableOpacity>

        </Modal>
    </View>
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        height: 300
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});
