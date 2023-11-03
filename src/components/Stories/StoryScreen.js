import { View, StyleSheet, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import StoryCloseIcon from "../../icons/StoryCloseIcon";
import StorySlide from "./StorySlide";
import { useRef, useState } from "react";

export default function StoryScreen(props) {
  const swiper = useRef();

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  function nextSlide() {
    if (swiper.current.state.index + 1 < props.storiesCount) {
      swiper.current.scrollTo(swiper.current.state.index + 1);
    }
  }

  function prevSlide() {
    if (swiper.current.state.index > 0) {
      swiper.current.scrollTo(swiper.current.state.index - 1);
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
          images={[
            "https://img1.akspic.ru/previews/7/4/7/9/6/169747/169747-ikanvas-art-pechat_na_holste-poster-oblako-500x.jpg",
            "https://wallpapershome.ru/images/pages/pic_v/21485.jpg",
            "https://i.pinimg.com/originals/25/90/a1/2590a1a6759841581e6e1ed7fc91376d.jpg",
          ]}
          onPrevScreen={() => {
            prevSlide();
          }}
          onNextScreen={() => {
            nextSlide();
          }}
          active={activeSlideIndex == 0}
        ></StorySlide>
        <StorySlide
          images={[
            "https://images.wallpapershq.com/wallpapers/3213/thumbnail_350x622.jpg",
            "https://kartinkin.net/uploads/posts/2022-02/1645728640_42-kartinkin-net-p-letnie-kartinki-na-telefon-46.jpg",
          ]}
          onPrevScreen={() => {
            prevSlide();
          }}
          onNextScreen={() => {
            nextSlide();
          }}
          active={activeSlideIndex == 1}
        ></StorySlide>
        <StorySlide
          images={[
            "https://klike.net/uploads/posts/2019-11/1574514215_2.jpg",
            "https://static3.tgstat.ru/channels/_0/26/2647150c2f9771a41145032b86b6c8a4.jpg",
          ]}
          onPrevScreen={() => {
            prevSlide();
          }}
          onNextScreen={() => {
            nextSlide();
          }}
          active={activeSlideIndex == 2}
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
