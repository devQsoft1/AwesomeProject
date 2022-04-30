//--------- imports 

// react
import React, { useState } from "react";
import {
    TouchableOpacity,
    Text,
    View,
    ImageBackground,
    FlatList,
    ScrollView
} from "react-native";

// third party lib
import Modal from "react-native-modal";
import CheckBox from '@react-native-community/checkbox';


// style
import Styles from "./Style";

//---------- components

const ModalView = (props) => {

    //---------- state and veriables
    const [selectedFilters, setSelectedFilters] = useState([])
    const [selectedAction, setSelectedAction] = useState('')

    //---------- helper : user's action
    const handleCheckBox = (selected_value, key) => {

        let selected_array = selectedFilters[key] || []

        if (selected_array.includes(selected_value)) {

            selected_array = selected_array.filter(x => x !== selected_value)
            setSelectedFilters({ ...selectedFilters, [key]: selected_array })
        } else {

            selected_array.push(selected_value)
            setSelectedFilters({ ...selectedFilters, [key]: selected_array, })
        }

    }


    //---------- helper : render

    const renderFilterView = (data, title, search_type, key) => {

        return (
            <TouchableOpacity
                onPress={() => {

                    if (key === selectedAction) {

                        setSelectedAction('')
                    } else {

                        setSelectedAction(key)
                    }
                }}
                style={{
                    marginVertical: 10,
                    padding: 0
                }}
            >
                <Text
                    style={[Styles.text14, Styles.textBold]}
                >
                    {
                        title
                    }
                </Text>
                {
                    !!(selectedAction && selectedAction === key) &&

                    <View
                        style={{ height: '60%' }}
                    >
                        {
                            renderList(data, key)
                        }
                    </View>
                }

            </TouchableOpacity>
        )
    }


    // render lists
    const renderList = (data, key) => {

        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                renderItem={(item) => renderCheckBox(item, key)}
                data={data}
                ListEmptyComponent={() => {
                    return (
                        <View
                            style={Styles.empty}
                        >
                            <Text>No data available ...</Text>
                        </View>
                    )
                }}
            />
        )
    }

    // check box view
    const renderCheckBox = ({ index, item }, key) => {

        return (
            <TouchableOpacity
                key={index}
                style={Styles.row}
                onPress={() => {
                    handleCheckBox(item, key)
                }}
            >
                <CheckBox
                    disabled={false}
                    value={selectedFilters[key]?.includes(item) || false}
                />
                <Text
                    style={[Styles.text14, Styles.textBold]}
                >
                    {
                        item
                    }
                </Text>
            </TouchableOpacity>
        )
    }

    //---------- main view

    return (
        <Modal
            style={Styles.modalStyle}
            isVisible={props.isModalVisible}
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
            swipeDirection={'right'}
            coverScreen={true}
            onBackButtonPress={
                () => {
                    props.closeModal('filter_clear')
                }
            }
        >
            <View
                style={{ flex: 1, paddingLeft: 10 }}
            >

                <View
                    style={Styles.BlackBorder}
                >

                    {/* clear filter */}
                    <TouchableOpacity
                        style={[Styles.border, { marginVertical: 10 }]}
                        onPress={() => {
                            props.closeModal('filter_clear')
                        }}
                    >
                        <Text
                            style={[Styles.text14, Styles.textBold, { alignSelf: 'center' }]}
                        >
                            Clear
                        </Text>
                    </TouchableOpacity>

                    <ImageBackground
                        source={require('../Assets/654.jpg')}
                        resizeMode="contain"
                        style={Styles.bgImageSiderbar}
                    >

                        {/* name */}
                        {
                            renderFilterView(props.data.cars_name || [], 'Filter By Name', 'string', 'cars_name')
                        }
                        <View style={Styles.devider} />

                        {/* color */}
                        {
                            renderFilterView(props.data.cars_color || [], 'Filter By Color', 'string', 'cars_color')
                        }
                        <View style={Styles.devider} />

                        {/* modal */}
                        {
                            renderFilterView(props.data.cars_modal || [], 'Filter By Modal', 'string', 'cars_modal')
                        }
                        <View style={Styles.devider} />

                        {/* year */}
                        {
                            renderFilterView(props.data.cars_year || [], 'Filter By Year', 'numeric', 'cars_year')
                        }
                        <View style={Styles.devider} />

                        {/* price */}
                        {
                            renderFilterView(props.data.cars_price || [], 'Filter By Price', 'numeric', 'cars_price')
                        }
                        <View style={Styles.devider} />

                    </ImageBackground>

                    {/* save filter */}
                    <TouchableOpacity
                        style={[Styles.border, { marginVertical: 10 }]}
                        onPress={() => {
                            console.log('selectedFilters :', selectedFilters)
                            props.call_back('filter_call_back', selectedFilters)
                        }}
                    >
                        <Text
                            style={[Styles.text14, Styles.textBold, { alignSelf: 'center' }]}
                        >
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >
    );
}

//---------- exports

export default ModalView;


