import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableNativeFeedback,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Colors from "../../general/constants/Colors";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselCards = (props) => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  const pdfLogoUrl =
    "https://portal.bintang7.com/tara/template/images/pdf-logo.png";

  const CarouselCardItem = ({ item, index }) => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          props.navigation.navigate({
            routeName: "TARADocumentViewer",
            params: {
              docUrl: item.accessible_path,
              judul: item.judul,
            },
          });
        }}
      >
        <View style={styles.container} key={index}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: pdfLogoUrl }} style={styles.image} />
          </View>
          <Text style={styles.header}>{item.judul}</Text>
          <Text style={styles.body}>{item.deskripsi}</Text>
          <Text style={styles.footer}>Klik untuk membuka dokumen &gt;&gt;</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <View>
      <Carousel
        layout="stack"
        layoutCardOffset={9}
        ref={isCarousel}
        data={props.data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={props.data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 15,
          height: 15,
          borderRadius: 10,
          marginHorizontal: 0,
          backgroundColor: Colors.taraPrimaryColor,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    width: ITEM_WIDTH,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 4,
    height: 400,
    overflow: "hidden",
  },
  imageContainer: {
    alignItems: "center",
    paddingVertical: 10,
    // borderBottomColor: Colors.taraPrimaryColor,
    // borderBottomWidth: 2,
    backgroundColor: Colors.taraAccentColor,
  },
  image: {
    width: 80,
    height: 100,
  },
  header: {
    color: "#222",
    fontSize: 22,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  footer: {
    width: ITEM_WIDTH,
    color: "white",
    fontSize: 15,
    paddingHorizontal: 20,
    paddingBottom: 10,
    position: "absolute",
    bottom: 0,
    borderTopColor: Colors.taraPrimaryColor,
    borderTopWidth: 1,
    padding: 10,
    backgroundColor: Colors.taraPrimaryColor,
  },
});
export default CarouselCards;
