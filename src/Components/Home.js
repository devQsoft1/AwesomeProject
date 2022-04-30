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
import CrossSVGComponent from '../Assets/CrossSVGComponent'



//---------- component

const Home = (props) => {

    //---------- state, veriable and redux state

    // state
    const [searchText, setSearchText] = useState('')
    const [isModalVisible, setModalVisible] = useState(false);
    const [searchInProcess, setSearchInProcess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isFilterd, setIsFilterd] = useState(false)
    const [filters, setFilters] = useState({})
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

            let cars_data = state?.search_data_pocket?.data_payload?.payload?.cars || []
            setAllCarsData(cars_data || [])

            let cars_name = []
            let cars_color = []
            let cars_modal = []
            let cars_year = []
            let cars_price = []


            for (let i = 0; i < cars_data.length; i++) {

                !cars_name.includes(cars_data[i].car) && cars_name.push(cars_data[i].car)
                !cars_color.includes(cars_data[i].car_color) && cars_color.push(cars_data[i].car_color)
                !cars_modal.includes(cars_data[i].car_model) && cars_modal.push(cars_data[i].car_model)
                !cars_year.includes(cars_data[i].car_model_year) && cars_year.push(cars_data[i].car_model_year)
                !cars_price.includes(cars_data[i].price) && cars_price.push(cars_data[i].price)
            }
            setFilters(
                {
                    cars_name,
                    cars_color,
                    cars_modal,
                    cars_year,
                    cars_price
                }
            )
            setLoading(false)
        }
    }, [state?.search_data_pocket])

    //---------- helper : user's action

    // manage all clicks
    const handleClicks = (key, value) => {

        switch (key) {
            case 'search':

                setSearchInProcess(true)
                handleSearch()
                break;

            case 'filter':

                setModalVisible(true)
                break;

            case 'clear_all_filter':

            if(searchText || isFilterd){

                setSearchText('')
                setIsFilterd(false)
                getData()
            }
            break;
                

            case 'filter_clear':

                setModalVisible(false)
                setAllCarsData(state?.search_data_pocket?.data_payload?.payload?.cars || [])
                break;

            case 'filter_call_back':

                setIsFilterd(true)
                handleFilter(value)
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

    // filter of cars
    const handleFilter = (selected_values) => {

        let cars_array = state?.search_data_pocket?.data_payload?.payload?.cars || []
        let filter_array = []

        for (let i = 0; i < cars_array.length; i++) {

            if (selected_values?.cars_name?.includes(cars_array[i].car)) {

                filter_array.push(cars_array[i])
                continue
            }
            if (selected_values?.cars_color?.includes(cars_array[i].car_color)) {

                filter_array.push(cars_array[i])
                continue
            }
            if (selected_values?.cars_modal?.includes(cars_array[i].car_model)) {

                filter_array.push(cars_array[i])
                continue
            }
            if (selected_values?.cars_year?.includes(cars_array[i].car_model_year)) {

                filter_array.push(cars_array[i])
                continue
            }
            if (selected_values?.cars_price?.includes(cars_array[i].price)) {

                filter_array.push(cars_array[i])
                continue
            }
        }

        console.log('selectedFilters :', filter_array)
        setAllCarsData(filter_array);
        setModalVisible(false);
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
    const renderCar = ({ item, index }) => {

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

                        {
                            //----- first row
                        }

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

                        {
                            //----- secound row
                        }

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

                        {
                            //----- third row :car vin
                        }
                        <Text
                            style={{ marginVertical: 10 }}
                        >
                            {
                                `Car Vin : ${item.car_vin}`
                            }
                        </Text>

                        {
                            //----- third row: price
                        }
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
            {

                isModalVisible &&
                <Modal
                    isModalVisible={isModalVisible}
                    closeModal={handleClicks}
                    data={filters}
                    call_back={handleClicks}
                />
            }

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

                        {/* cleat all filter and search */}

                        {
                        (!!searchText || isFilterd ) &&
                            <TouchableOpacity
                                onPress={() => {
                                    handleClicks('clear_all_filter')
                                }}
                            >
                                                    
                                <CrossSVGComponent style={{ marginLeft: 10 }}/>

                            </TouchableOpacity>
                        }

                    </View>

                </BoxStyle>

                {/* list of gif */}
                {

                    loading ?
                        <Loader type={'center'} color={'#fff'} />
                        :
                        renderList(allCarsData, renderCar)
                }

            </ImageBackground>
        </View>
    )
}

//---------- export component

export default Home;


    // search click
    // const handleSearch = () => {

    //     let cars_array = allCarsData || []
    //     let cars_name_array = []
    //     let cars_color_array = []
    //     let cars_model_array = []
    //     let cars_vin_array = []
    //     let cars_yr_array = []

    //     if (searchText && cars_array?.length > 0) {

    //         cars_name_array = cars_array.filter(x => x.car?.toLowerCase().match(searchText.toLowerCase()))
    //         cars_color_array = cars_array.filter(x => x.car_color?.toLowerCase().match(searchText.toLowerCase()))
    //         cars_model_array = cars_array.filter(x => x.car_model?.toLowerCase().match(searchText.toLowerCase()))
    //         cars_vin_array = cars_array.filter(x => x.car_vin?.toLowerCase().match(searchText.toLowerCase()))
    //         cars_yr_array = cars_array.filter(x => parseInt(x.car_model_year) === parseInt(searchText))

    //         setAllCarsData([...new Set([...cars_name_array, ...cars_color_array, ...cars_model_array, ...cars_vin_array, ...cars_yr_array])])
    //     }

    //     setSearchInProcess(false)
    // }

    // // filter of cars
    // const handleFilter = (selected_values) => {

    //     let cars_array = state?.search_data_pocket?.data_payload?.payload?.cars || []
    //     let filter_array = []
    //     let match_filter = {}
    //     let compulsory_filter = {}

    //     // get which filter is selected 
    //     if (selected_values?.cars_name?.length > 0) {
    //         compulsory_filter.name = true
    //     }
    //     if (selected_values?.cars_color?.length > 0) {
    //         compulsory_filter.color = true
    //     }
    //     if (selected_values?.cars_modal?.length > 0) {
    //         compulsory_filter.modal = true
    //     }
    //     if (selected_values?.cars_year?.length > 0) {
    //         compulsory_filter.year = true
    //     }
    //     if (selected_values?.cars_price?.length > 0) {
    //         compulsory_filter.price = true
    //     }

    //     // verify filter in data
    //     for (let i = 0; i < cars_array.length; i++) {

    //         if (compulsory_filter.name ) {

    //             if(selected_values?.cars_name?.includes(cars_array[i].car)){

    //                 match_filter.name = true
    //             }else{
    
    //                 match_filter.name = false
    //                 continue;
    //             }
    //         }

    //         if (compulsory_filter.color ) {

    //             if(selected_values?.cars_color?.includes(cars_array[i].car)){

    //                 match_filter.color = true
    //             }else{
    
    //                 match_filter.color = false
    //                 continue;
    //             }
    //         }

    //         if (compulsory_filter.modal ) {

    //             if(selected_values?.cars_modal?.includes(cars_array[i].car)){

    //                 match_filter.modal = true
    //             }else{
    
    //                 match_filter.modal = false
    //                 continue;
    //             }
    //         }


    //         if (compulsory_filter.year ) {

    //             if(selected_values?.cars_year?.includes(cars_array[i].car)){

    //                 match_filter.year = true
    //             }else{
    
    //                 match_filter.year = false
    //                 continue;
    //             }
    //         }

    //         if (compulsory_filter.price ) {

    //             if(selected_values?.cars_price?.includes(cars_array[i].car)){

    //                 match_filter.price = true
    //             }else{
    
    //                 match_filter.price = false
    //                 continue;
    //             }
    //         }

    //         filter_array.push(cars_array[i].car)

    //         // // add data after filter
    //         // if(compulsory_filter.name && (compulsory_filter.name === match_filter.name) ){

    //         //     if(compulsory_filter.color && (compulsory_filter.color === match_filter.color) ){
                    
    //         //         if(compulsory_filter.modal && (compulsory_filter.modal === match_filter.modal) ){

    //         //             if(compulsory_filter.year && (compulsory_filter.year === match_filter.year) ){

    //         //                 if(compulsory_filter.price && (compulsory_filter.price === match_filter.price) ){

    //         //                     filter_array.push(cars_array[i].car)
    //         //                 }
    //         //             }else{
                            
    //         //                 if(compulsory_filter.price && (compulsory_filter.price === match_filter.price) ){

    //         //                     filter_array.push(cars_array[i].car)
    //         //                 }
    //         //             }
    //         //         }else{

    //         //             if(compulsory_filter.year && (compulsory_filter.year === match_filter.year) ){

    //         //                 if(compulsory_filter.price && (compulsory_filter.price === match_filter.price) ){

    //         //                     filter_array.push(cars_array[i].car)
    //         //                 }
    //         //             }else{
                            
    //         //                 if(compulsory_filter.price && (compulsory_filter.price === match_filter.price) ){

    //         //                     filter_array.push(cars_array[i].car)
    //         //                 }
    //         //             }
    //         //         }

    //         //     }else{

    //         //         if(compulsory_filter.modal && (compulsory_filter.modal === match_filter.modal) ){

    //         //             if(compulsory_filter.year && (compulsory_filter.year === match_filter.year) ){

    //         //                 if(compulsory_filter.price && (compulsory_filter.price === match_filter.price) ){

    //         //                     filter_array.push(cars_array[i].car)
    //         //                 }
    //         //             }
    //         //         }
    //         //     }
    //         // }else{

    //         //     if(compulsory_filter.color && (compulsory_filter.color === match_filter.color) ){
                    
    //         //         if(compulsory_filter.modal && (compulsory_filter.modal === match_filter.modal) ){

    //         //             if(compulsory_filter.year && (compulsory_filter.year === match_filter.year) ){

    //         //                 if(compulsory_filter.price && (compulsory_filter.price === match_filter.price) ){

    //         //                     filter_array.push(cars_array[i].car)
    //         //                 }
    //         //             }
    //         //         }else{

    //         //             if(compulsory_filter.year && (compulsory_filter.year === match_filter.year) ){

    //         //                 if(compulsory_filter.price && (compulsory_filter.price === match_filter.price) ){

    //         //                     filter_array.push(cars_array[i].car)
    //         //                 }
    //         //             }else{

    //         //                 if(compulsory_filter.price && (compulsory_filter.price === match_filter.price) ){

    //         //                     filter_array.push(cars_array[i].car)
    //         //                 }
    //         //             }
    //         //         }

    //         //     }else{
    //         //         if(compulsory_filter.modal && (compulsory_filter.modal === match_filter.modal) ){

    //         //             if(compulsory_filter.year && (compulsory_filter.year === match_filter.year) ){

    //         //                 if(compulsory_filter.price && (compulsory_filter.price === match_filter.price) ){

    //         //                     filter_array.push(cars_array[i].car)
    //         //                 }
    //         //             }else{

    //         //                 if(compulsory_filter.price && (compulsory_filter.price === match_filter.price) ){

    //         //                     filter_array.push(cars_array[i].car)
    //         //                 }
    //         //             }
    //         //         }else{

    //         //             if(compulsory_filter.year && (compulsory_filter.year === match_filter.year) ){

    //         //                 if(compulsory_filter.price && (compulsory_filter.price === match_filter.price) ){

    //         //                     filter_array.push(cars_array[i].car)
    //         //                 }
    //         //             }else{

    //         //                 if(compulsory_filter.price && (compulsory_filter.price === match_filter.price) ){

    //         //                     filter_array.push(cars_array[i].car)
    //         //                 }
    //         //             }
    //         //         }
    //         //     }
    //         // }

    //     }

    //     console.log('filter_array :', filter_array)
    //     setAllCarsData(filter_array);
    //     setModalVisible(false);
    // }
