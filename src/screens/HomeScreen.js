import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import NavigationBottom from "../components/NavigationBottom";
import SearchButton from "../components/SearchButton";
import Category from "../components/Category";
import StoryIcon from "../components/Stories/Icon";

import Swiper from "react-native-swiper";

import { useNavigation } from "@react-navigation/native";
import { Video, } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearGetPadbord, ClearOrderStatus, GetBaners, GetPadborkiWhiteProducts, GetStoryes } from "../store/action/action";
import StoryScreen from "../components/Stories/StoryScreen";
import { baseUrl } from "../api";
import ChatIcon from "../icons/ChatIcon";
import ChatScreen from "../components/Chat/ChatScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function HomeScreen(props) {
    const navigation = useNavigation();
    const video = useRef(null);
    const [compilations, setCompilations] = useState([]);
    const dispatch = useDispatch()
    // const { token } = useSelector((st) => st.static)
    const [chatVisible, setChatVisible] = useState(false);

    const getStorys = useSelector((st) => st.getStoryes)
    const [storiesVisible, setStoriesVisible] = useState(false);
    const [firstBanner, setFirstBanner] = useState([])
    const [secondBanner, setSecondBanner] = useState([])

    const [showStoryes, setShowStoryes] = useState([])
    const [search, setSearch] = useState('')
    const [activeStory, setActiveStory] = useState(0)
    const [token, setToken] = useState('')


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            GetUser()
            setCompilations([])
        });
        return unsubscribe;
    }, [navigation]);

    const ShowStory = (i) => {
        setStoriesVisible(true)
        setShowStoryes(getStorys.data.data[i])
        setActiveStory(i)
    }



    const GetUser = async () => {
        let token = await AsyncStorage.getItem('token')
        if (token) {
            setToken(token)
            dispatch(GetBaners('first', token))
            dispatch(GetBaners('last', token))
            dispatch(GetStoryes(token))
            dispatch(GetPadborkiWhiteProducts(token))
            dispatch(ClearOrderStatus())
            dispatch(ClearGetPadbord())
        }
    }

    const NextStory = () => {
        if (getStorys.data.data.length - 2 > activeStory) {
            // let item = activeStory + 1
            setShowStoryes(getStorys.data.data[activeStory + 1])
            setActiveStory(activeStory + 1)
        }
        else {
            setStoriesVisible(false)
        }
    }
    const getBaner = useSelector((st) => st.getBaner)
    const getPadborki = useSelector((st) => st.getPadborki)

    useEffect(() => {
        setCompilations(getPadborki.data)
    }, [getPadborki.data])
    useEffect(() => {
        setFirstBanner(getBaner.firstData.data)
    }, [getBaner.firstData.data])

    useEffect(() => {
        setSecondBanner(getBaner.data.data)
    }, [getBaner.data])


    if (getPadborki.loading) {
        return <View style={styles.loading}>
            <ActivityIndicator color={'black'} />
        </View >
    }
    return (
        <View>
            {<TouchableOpacity
                style={styles.chatIcon}
                onPress={() => {
                    setChatVisible(true);
                }}
            >
                <ChatIcon></ChatIcon>
            </TouchableOpacity>}



            {chatVisible && (
                <ChatScreen
                    onClose={() => {
                        setChatVisible(false);
                    }}
                ></ChatScreen>
            )}
            {storiesVisible && (
                <StoryScreen
                    storiesCount={showStoryes.file.length}
                    data={showStoryes}
                    nextStory={() => NextStory()}
                    hideStories={() => {
                        setStoriesVisible(false);
                    }}
                ></StoryScreen>
            )}

            <View style={styles.navBtm}>
                <NavigationBottom active="home"></NavigationBottom>
            </View>
            <ScrollView style={styles.scroll}>
                <View>
                    {firstBanner?.length > 0 && <Swiper
                        height={300}
                        style={styles.bannerSwiper}
                        showsPagination={false}
                    >
                        {firstBanner?.map((elm, i) => {
                            if (elm.type == 'png' || elm.type == 'jpg') {
                                return <View
                                    key={i}
                                // style={styles.slide}
                                >
                                    <Image
                                        style={styles.firstSlideImg}
                                        source={{ uri: baseUrl + elm.file }}
                                    ></Image>
                                </View>
                            }
                            else {
                                return <Video
                                    key={i}
                                    ref={video}
                                    style={styles.video}
                                    source={{ uri: baseUrl + elm.file }}
                                    resizeMode="cover"
                                    shouldPlay={true}
                                    isMuted={true}
                                    isLooping={true}
                                ></Video>
                            }
                        })}

                    </Swiper>}
                </View>
                <View style={styles.container}>
                    <View style={styles.search}>
                        <SearchButton
                            onPress={() =>
                                navigation.navigate("CatalogTab", {
                                    screen: "Search", params: {
                                        searchValue: search,
                                    },
                                })
                            }
                        ></SearchButton>
                    </View>
                </View>
                <View>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        style={styles.stories}
                        contentContainerStyle={{
                            paddingLeft: 15,
                        }}
                    >
                        {getStorys.data.data?.map((elm, i) => {
                            return <StoryIcon
                                key={i}
                                image={elm.photo}
                                onPress={() => {
                                    ShowStory(i)
                                }}
                                text={elm.name}
                            ></StoryIcon>
                        })

                        }

                    </ScrollView>
                </View>
                <View
                    style={{
                        ...styles.container,
                        paddingBottom: 106,
                        paddingTop: 0,
                        paddingHorizontal: 0,
                    }}
                >
                    {compilations.length > 0 && <View style={styles.compilations}>
                        {compilations?.map((compilation, i) => {
                            console.log(compilation)
                            return <View style={styles.category} key={i}>
                                <Category
                                    i={i}
                                    compilationId={compilation?.id}
                                    product={compilation.products}
                                    name={compilation?.name}
                                ></Category>
                            </View>
                        })}
                    </View>}
                    <View style={{ paddingHorizontal: 15, height: 190 }}>
                        {secondBanner?.length > 0 && <Swiper
                            height={130}
                            style={styles.bannerSwiper}
                            showsPagination={true}
                            dot={
                                <View
                                    style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: 24,
                                        backgroundColor: "rgba(224, 193, 143, 0.25)",
                                        marginHorizontal: 6,
                                    }}
                                ></View>
                            }
                            activeDot={
                                <View
                                    style={{
                                        width: 12,
                                        height: 12,
                                        backgroundColor: "#E0C18F",
                                        borderRadius: 24,
                                        marginHorizontal: 6,
                                    }}
                                ></View>
                            }
                        >
                            {secondBanner?.map((elm, i) => {
                                if (elm.type == 'png' || elm.type == 'jpg') {
                                    return <TouchableOpacity
                                        key={i}
                                        style={styles.slide}
                                        onPress={() => { }
                                            // navigation.navigate("CatalogTab", { screen: "Category" })
                                        }
                                    >
                                        <Image
                                            style={styles.slideImg}
                                            source={{ uri: baseUrl + elm.file }}
                                            height={130}
                                        ></Image>
                                    </TouchableOpacity>
                                }
                                else {
                                    return <Video
                                        ref={video}
                                        style={styles.video}
                                        source={{ uri: baseUrl + elm.file }}
                                        resizeMode="cover"
                                        isMuted={true}
                                        isLooping={true}
                                        shouldPlay={true}
                                    ></Video>
                                }
                            })}

                        </Swiper>}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    compilations: {
        width: "100%",
    },
    bannerSwiper: {
        marginTop: 5,
        // height: 190,
    },
    firstSlideImg: {
        width: "100%",
        height: 300,
        borderRadius: 10,
    },
    slideImg: {
        width: "100%",
        height: 130,
        borderRadius: 10,
    },
    slide: {
        height: 10,
    },
    video: {
        height: 300,
        width: "100%",
    },
    category: {
        width: "100%",
        marginBottom: 25,
    },
    search: {
        width: "100%",
        marginBottom: 25,
        marginTop: -45,
    },
    scroll: {
        minHeight: "100%",
    },
    navBtm: {
        position: "absolute",
        width: "100%",
        left: 0,
        bottom: 0,
        zIndex: 2,
        paddingHorizontal: 0,
    },
    container: {
        paddingHorizontal: 15,
        paddingTop: 20,
        // paddingBottom: 106,
        display: "flex",
        alignItems: "center",
        // height: "100%",
        width: "100%",
    },
    stories: {
        // transform: [{ scaleX: -1 }],
        // paddingLeft: 20,
        // paddingRight: 20,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatIcon: {
        position: "absolute",
        width: 85,
        height: 85,
        bottom: 100,
        left: 15,
        zIndex: 100,
    },
});
