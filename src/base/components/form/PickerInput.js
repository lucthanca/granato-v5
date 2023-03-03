import React, {useState} from 'react'
import { View, Text, Modal } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './form.styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ModalOfList from '../ModalOfList/ModalOfList'
import Identify from '@utils/Identify'

export default function PickerInput(props){
    const { lable, type, req, value, inputKey, data, dataName, setCountry, setIdCountry, setRegion, setIsBegin } = props;
    const [modalVisible, setModalVisible] = useState(false)
    function setCountryData(id, name) {
        setIsBegin(false)
        setIdCountry(id)
        setCountry(name)
    }

    function setRegionData(name, region_id) {
        setRegion(name, region_id)
    }
    return(
        <TouchableOpacity 
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.pickerField}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.title}>{Identify.__(lable)}
                    {req ? <Text style={{ color: 'red' }}> *</Text> : <Text>{Identify.__(' (optional)')}</Text>}
                </Text>
                <Text style={[styles.title, {paddingHorizontal: 10}]}>{Identify.__(value)}</Text>
            </View>
            <FontAwesome5 name="arrow-right" style={styles.arrowIcon}/>
            <Modal 
                animationType='slide'
                visible={modalVisible} 
                presentationStyle='fullScreen'>
                <ModalOfList 
                    inputKey={inputKey}
                    title={lable}
                    data={data}
                    value={value}
                    dataName={dataName}
                    setCountryData={setCountryData}
                    setRegionData={setRegionData}
                    setModalVisible={setModalVisible} />
            </Modal>
        </TouchableOpacity>
    )
}