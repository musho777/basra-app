import { View, StyleSheet, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import StoryCloseIcon from "../../icons/StoryCloseIcon";
import StorySlide from "./StorySlide";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { baseUrl } from "../../api";

export default function StoryScreen(props) {
  const swiper = useRef();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [image, setImage] = useState([])
  useEffect(() => {
    let item = []
    props?.data?.file?.map((elm, i) => {
      item.push({ type: elm.type, img: `${baseUrl}${elm.file}` })
    })
    setActiveSlideIndex(0)
    setImage(item)
  }, [props.data])


  function nextSlide() {
    if (swiper.current.state.index + 1 < props.storiesCount) {
      swiper.current?.scrollTo(swiper?.current?.state?.index + 1);
    }

    else {
      props.nextStory()
    }
  }

  function prevSlide() {
    if (swiper.current.state.index > 0) {
      swiper.current?.scrollTo(swiper?.current?.state?.index - 1);
    }
  }
  return (
    <View style={styles.container}>
      <Swiper
        showsPagination={false}
        loop={false}
        ref={swiper}
        onIndexChanged={setActiveSlideIndex}
      >

        <StorySlide
          images={image}
          photo={props.data.photo}
          title={props.data.name}
          nextStory={() => props.nextStory()}
          hideStories={() => props.hideStories()}
          onPrevScreen={() => {
            prevSlide();
          }}
          onNextScreen={() => {
            nextSlide();
          }}
          active={activeSlideIndex == 0}
        ></StorySlide>
      </Swiper>
      <TouchableOpacity
        style={styles.closeIcon}
        onPress={() => {
          props.hideStories();
        }}
      >
        <StoryCloseIcon></StoryCloseIcon>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  closeIcon: {
    position: "absolute",
    top: 45,
    right: 10,
    zIndex: 23,
    padding: 10,
  },
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    bottom: 0,
    zIndex: 20,
    transform: [{ scaleX: -1 }],
  },
});
