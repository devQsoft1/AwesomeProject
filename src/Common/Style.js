//---------- Imports

import {
    StyleSheet,
    Dimensions
} from 'react-native'

//---------- style and css


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Styles = StyleSheet.create({

    topContainer: {
        flex: 1,
        // paddingLeft: 20,
        // paddingRight: 20,
        backgroundColor: '#fff',
    },
    bgImage: {
        flex: 1,
        justifyContent: "center"
    },
    bgImageSiderbar: {
        flex: 1,
        paddingBottom:10
    },
    BlackSelectable: {

        flex: 1,
        paddingHorizontal: 5,

        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#000',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    BlackBorder: {

        flex: 1,
        paddingHorizontal: 5,

        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#000',
    },
    input: {
        flex: 1,

        borderRadius: 45,
        fontSize: 14,

        borderColor: '#fff',
        color: '#000',
    },
    empty: {

        flex: 1,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageLoader: {

        flex: 1,
        height: '100%',
        width: '100%',

        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',

        position: 'absolute',
        zIndex: 10,

        backgroundColor: '#fff'
    },

    boxStyle: {
        backgroundColor: '#fff',
        boxShadow: '0px 0px 0px rgba(1, 1, 1, 1)',
        borderRadius: 8,

        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,

        elevation: 100,
    },
    modalStyle: {
        width: '60%',
        height: '100%',

        margin: -5,
        paddingVertical: 20,
        paddingHorizontal: 10,

        backgroundColor: '#fff',
    },

    devider:{

        width:'100%',
        height:1,
        backgroundColor:'#000'
    },

    carContainer: {
        height: '100%',
        width: '100%',
        flex: 1,
        zIndex: 100,
        backgroundColor: '#fff'
    },
    row: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    rowA: {

        flex: 1,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    rowStart: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    rowEnd: {

        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    border: {

        padding: 3,
        paddingHorizontal: 10,
        borderColor: '#000',
        borderWidth: 1,
    },

    text14: {
        fontSize: 14,
        color: '#000',
        textTransform: 'capitalize'
    },
    text16: {
        fontSize: 16,
        color: '#000',
        textTransform: 'capitalize'
    },
    text18: {
        fontSize: 18,
        color: '#000',
        textTransform: 'capitalize'
    },
    text20: {
        fontSize: 20,
        color: '#000',
        textTransform: 'capitalize'
    },
    textBold: {
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },

})

export default Styles;