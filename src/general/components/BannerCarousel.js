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
import Colors from "../constants/Colors";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const { width, height } = Dimensions.get("screen");

const BannerCarousel = (props) => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  const pdfLogoUrl =
    "https://portal.bintang7.com/tara/template/images/pdf-logo.png";

  const CarouselCardItem = ({ item, index }) => {
    return (
      <Image
        source={require("../assets/banner2.png")}
        style={styles.profileContainer}
        imageStyle={styles.profileImage}
      >
        {/* <Block flex style={styles.notificationBar}>
            <Block style={styles.notificationIcon}>
              <MaterialIcon
                name={numOfNotifications == 0 ? 'bell-outline' : 'bell-ring'}
                size={23}
                color="white"
                onPress={() => {
                  props.navigation.navigate('Notification');
                }}
              />
            </Block>
          </Block> */}
        {/* <Block flex style={styles.profileDetails}>
            <Block style={styles.profileTexts}></Block>
          </Block> */}
      </Image>
      //   <TouchableNativeFeedback
      //     onPress={() => {
      //       props.navigation.navigate({
      //         routeName: 'TARADocumentViewer',
      //         params: {
      //           docUrl: item.accessible_path,
      //           judul: item.judul,
      //         },
      //       });
      //     }}>
      //     <View style={styles.container} key={index}>
      //       <View style={styles.imageContainer}>
      //         <Image source={{uri: pdfLogoUrl}} style={styles.image} />
      //       </View>
      //       <Text style={styles.header}>{item.judul}</Text>
      //       <Text style={styles.body}>{item.deskripsi}</Text>
      //       <Text style={styles.footer}>Klik untuk membuka dokumen &gt;&gt;</Text>
      //     </View>
      //   </TouchableNativeFeedback>
    );
  };

  return (
    <View style={{ backgroundColor: "black" }}>
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
        // dotsLength={2}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 10,
          marginHorizontal: 0,
          backgroundColor: Colors.primaryColor,
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
    paddingBottom: 5,
    shadowColor: Colors.taraAccentColor,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 4,
    height: 550,
    overflow: "hidden",
  },
  profileImage: {
    // width: width * 1.1,
    // height: 'auto',
    // resizeMode: 'stretch',
  },
  profileContainer: {
    margin: 0,
    padding: 0,
    width: width,
    height: 250,
    // height: height / 3,
    resizeMode: "stretch",
    left: 0,
    top: 0,
  },
  imageContainer: {
    alignItems: "center",
    paddingVertical: 10,
    // borderBottomColor: Colors.taraPrimaryColor,
    // borderBottomWidth: 2,
    // backgroundColor: Colors.taraAccentColor,
  },
  image: {
    width: 80,
    height: 100,
  },
  header: {
    color: "#222",
    fontSize: 24,
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
    paddingRight: 20,
  },
  footer: {
    width: ITEM_WIDTH,
    color: "white",
    fontSize: 15,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingRight: 20,
    position: "absolute",
    bottom: 0,
    borderTopColor: Colors.taraPrimaryColor,
    borderTopWidth: 1,
    padding: 10,
    backgroundColor: Colors.taraPrimaryColor,
  },
});
export default BannerCarousel;
