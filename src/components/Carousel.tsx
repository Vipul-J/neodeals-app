import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

const Carousel = () => {
  const flatlistRef = useRef<FlatList<any>>(null);
  // Get Dimensions
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Auto Scroll
  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === carouselData.length - 1) {
        flatlistRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
        flatlistRef.current?.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  });

  const getItemLayout = (
    data: any[] | null | undefined,
    index: number
  ): { length: number; offset: number; index: number } => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  // Data for carousel
  const carouselData = [
    {
      id: "01",
      image: require("../assets/images/slider_1.jpg"),
    },
    {
      id: "02",
      image: require("../assets/images/slider_2.jpg"),
    },
    {
      id: "03",
      image: require("../assets/images/slider_3.jpg"),
    },
  ];

  // Display Images // UI
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View>
        <Image
          source={item.image}
          style={{ height: 170, width: screenWidth }}
        />
      </View>
    );
  };

  // Handle Scroll
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = scrollPosition / screenWidth;
    setActiveIndex(index);
  };

  // Render Dot Indicators
  const renderDotIndicators = () => {
    return carouselData.map((dot, index) => (
      <View
        key={index}
        style={{
          backgroundColor: activeIndex === index ? "lightblue" : "red",
          height: 6,
          width: 6,
          marginTop: 0,
          borderRadius: 5,
          marginHorizontal: 3,
        }}
      />
    ));
  };

  return (
    <View>
      <FlatList
        data={carouselData}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: -20,
        }}
      >
        {renderDotIndicators()}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
