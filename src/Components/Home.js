//---------- Imports

// react
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    FlatList
} from 'react-native'

// redux
import { useSelector, useDispatch } from 'react-redux';
import { requestServerForData } from '../Redux/Actions/Action';

// component
import BoxStyle from '../Common/BoxStyle';
import Loader from '../Common/Loader'
import Modal from '../Common/Modal'

// style
import Styles from '../Common/Style'

// images
import CarSVGComponent from '../Assets/CarSVGComponent'
import FilterSVGComponent from '../Assets/FilterSVGComponent'


//---------- component

const Home = (props) => {

    //---------- state, veriable and redux state

    // state
    const [searchText, setSearchText] = useState('')
    const [isModalVisible, setModalVisible] = useState(false);
    const [searchInProcess, setSearchInProcess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [allCarsData, setAllCarsData] = useState([])

    // redux
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    //---------- life cycles

    // initial request
    useEffect(() => {
        getData()
    }, [])

    // update after get cars
    useEffect(() => {

        if (state?.search_data_pocket?.data_payload?.payload?.cars?.length > 0) {

            setAllCarsData(state?.search_data_pocket?.data_payload?.payload?.cars || [])
            setLoading(false)
        }
    }, [state?.search_data_pocket])

    //---------- helper : user's action

    // manage all clicks
    const handleClicks = (key) => {

        switch (key) {
            case 'search':

                setSearchInProcess(true)
                handleSearch()
                break;

            case 'filter':

                setModalVisible(true)
                break;


            case 'filter_clear':

                setModalVisible(false)
                break;

            default:
                break;
        }
    }

    // search click
    const handleSearch = () => {

        let cars_array = allCarsData || []
        let cars_name_array = []
        let cars_color_array = []
        let cars_model_array = []
        let cars_vin_array = []
        let cars_yr_array = []

        if (searchText && cars_array?.length > 0) {

            cars_name_array = cars_array.filter(x => x.car?.toLowerCase().match(searchText.toLowerCase()))
            cars_color_array = cars_array.filter(x => x.car_color?.toLowerCase().match(searchText.toLowerCase()))
            cars_model_array = cars_array.filter(x => x.car_model?.toLowerCase().match(searchText.toLowerCase()))
            cars_vin_array = cars_array.filter(x => x.car_vin?.toLowerCase().match(searchText.toLowerCase()))
            cars_yr_array = cars_array.filter(x => parseInt(x.car_model_year) === parseInt(searchText))

            setAllCarsData([...new Set([...cars_name_array, ...cars_color_array, ...cars_model_array, ...cars_vin_array, ...cars_yr_array])])
        }

        setSearchInProcess(false)
    }

    // get latest data api call
    const getData = () => {

        setLoading(true)
        dispatch(requestServerForData({
            data: searchText,
            key: 'search_data_pocket',
            url: ``,
            type: 'get',
        }))
    }

    // get alternate color
    const getColor = (color) => {

        return color?.toLowerCase() === 'puce' ?
            'mistyrose' : color?.toLowerCase() === 'mauv' ?
                'violet' : color?.toLowerCase()
    }

    //---------- helper : render

    // render lists
    const renderList = (data, view) => {

        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                renderItem={(item) => view(item)}
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

    // card of cars
    const renderCars = ({ item, index }) => {

        return (
            <BoxStyle parentsStyle={{ margin: 20, marginBottom: 0 }}>
                <View
                    style={{ marginTop: 20, flex: 1, position: 'relative' }}
                    key={index}
                >
                    {/* background loading */}
                    <View
                        style={Styles.imageLoader}
                    >
                        <Loader
                            type={'center'}
                        />
                    </View>

                    {/* car content */}
                    <View
                        style={Styles.carContainer}
                    >

                        {/* first row */}
                        <View
                            style={Styles.row}
                        >

                            {/* car name */}
                            <Text
                                style={[Styles.text18, Styles.textBold]}
                            >
                                {
                                    item.car
                                }
                            </Text>

                            {/* image for availability */}
                            <Image
                                style={{ marginLeft: 10, height: 25, width: 25 }}
                                source={item.availability ? require('../Assets/Available.png') : require('../Assets/Unavailable.png')}
                            />
                        </View>

                        {/* secound row */}
                        <View
                            style={[Styles.rowA, { marginTop: 10 }]}
                        >

                            {/* icon and color */}
                            <View
                                style={Styles.rowStart}
                            >
                                <CarSVGComponent
                                    color={getColor(item.car_color) || '#000'}
                                />
                                <Text
                                    style={[Styles.text14, { color: getColor(item.car_color), marginLeft: 5, textTransform: 'capitalize' }]}
                                >
                                    {
                                        item.car_color
                                    }
                                </Text>
                            </View>

                            {/* model */}
                            <Text
                                style={Styles.text14}
                            >
                                {
                                    item.car_model
                                }
                            </Text>

                            {/* year */}
                            <Text
                                style={[Styles.text14, { marginLeft: 20 }]}
                            >
                                {
                                    `year : ${item.car_model_year}`
                                }
                            </Text>

                        </View>

                        {/* car vin */}
                        <Text
                            style={{ marginVertical: 10 }}
                        >
                            {
                                `Car Vin : ${item.car_vin}`
                            }
                        </Text>

                        {/* third row: price */}
                        <View
                            style={Styles.rowEnd}
                        >
                            <View
                                style={Styles.border}
                            >
                                <Text
                                    style={Styles.text16}
                                >
                                    {
                                        `${item.price} / day`
                                    }
                                </Text>
                            </View>
                        </View>

                    </View>
                </View>
            </BoxStyle>
        )
    }

    //---------- main view

    // view
    return (
        <View
            style={Styles.topContainer}
        >

            {/* filters */}
            <Modal
                isModalVisible={isModalVisible}
                closeModal={handleClicks}
            />

            {/* view */}
            <ImageBackground
                source={require('../Assets/CarBg.png')}
                resizeMode="cover"
                style={Styles.bgImage}
            >

                <BoxStyle parentsStyle={{ margin: 20 }}>
                    <View
                        style={Styles.row}
                    >

                        {/* search  */}
                        <View
                            style={Styles.BlackSelectable}
                        >

                            {/* text input */}
                            <TextInput
                                keyboardType='numeric'
                                style={Styles.input}
                                onChangeText={(text) => {

                                    setSearchText(text)
                                    if (!text) {

                                        setAllCarsData(state?.search_data_pocket?.data_payload?.payload?.cars || [])
                                    }
                                }}
                                placeholder={'SEARCH HERE'}
                                value={searchText}
                            />

                            {/* search icon and loading */}
                            {
                                searchInProcess ?

                                    // loading
                                    <Loader
                                        type={'center'}
                                    />
                                    :

                                    // search
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleClicks('search')
                                        }}
                                    >
                                        <Image
                                            style={{ marginLeft: 10, height: 18, width: 18 }}
                                            source={require('../Assets/Search.png')}
                                        />
                                    </TouchableOpacity>
                            }
                        </View>

                        {/* filter */}
                        <TouchableOpacity
                            onPress={() => {
                                handleClicks('filter')
                            }}
                        >
                            <FilterSVGComponent style={{ marginLeft: 10 }} />
                        </TouchableOpacity>

                    </View>

                </BoxStyle>

                {/* list of gif */}
                {

                    loading ?
                        <Loader type={'center'} />
                        :
                        renderList(allCarsData, renderCars)
                }

            </ImageBackground>
        </View>
    )
}

//---------- export component

export default Home;

