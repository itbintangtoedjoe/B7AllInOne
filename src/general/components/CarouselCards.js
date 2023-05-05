import React from "react";
import { View, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCardItem";

import Colors from "../constants/Colors";
const { width, height } = Dimensions.get("screen");

const CarouselCards = (props) => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  const data = [
    {
      title: "Aenean leo",
      body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      imgUrl: "https://picsum.photos/id/11/200/300",
    },
    {
      title: "In turpis",
      body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
      imgUrl: "https://picsum.photos/id/10/200/300",
    },
    {
      title: "Lorem Ipsum",
      body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
      imgUrl: "https://picsum.photos/id/12/200/300",
    },
    {
      title: "Lorem Ipsum",
      body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
      imgUrl: "https://picsum.photos/id/12/200/300",
    },
    {
      title: "In turpis",
      body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
      imgUrl: "https://picsum.photos/id/10/200/300",
    },
  ];

  const bannerHardCoded = [
    {
      id: 1,
      url: "https://portal.bintang7.com/tara/uploadedfiles/b7connect/banners/banner1.png",
    },
    {
      id: 2,
      url: "https://portal.bintang7.com/tara/uploadedfiles/b7connect/banners/banner2.png",
    },
    {
      id: 3,
      url: "https://portal.bintang7.com/tara/uploadedfiles/b7connect/banners/banner3.png",
    },
    {
      id: 4,
      url: "https://portal.bintang7.com/tara/uploadedfiles/b7connect/banners/banner4.png",
    },
    {
      id: 5,
      url: "https://portal.bintang7.com/tara/uploadedfiles/b7connect/banners/banner5.png",
    },
  ];

  return (
    <View
      style={{
        // flexDirection: 'row',
        justifyContent: "center",
        padding: 10,
        // paddingRight: 10,
        // marginLeft: 0,
      }}
    >
      <Carousel
        layout="default"
        // layoutCardOffset={9}
        ref={isCarousel}
        data={props.data}
        renderItem={CarouselCardItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index) => setIndex(index)}
        // useScrollView={true}
        loop={true}
        // autoplayInterval={3000}
        autoplay={true}
      />
      {/* <Pagination
        dotsLength={props.data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: Colors.primaryColor,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
        containerStyle={{marginTop: 0, paddingTop: 10, paddingBottom: 0}}
      /> */}
    </View>
  );
};

export default CarouselCards;
