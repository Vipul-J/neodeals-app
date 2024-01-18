import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";
import MasonryList from "reanimated-masonry-list";
import { BlurView } from "expo-blur";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../components/CustomBackdrop";
import FilterView from "../components/FilterView";
import { TabsStackScreenProps } from "../navigators/TabsNavigator";
import Carousel from "../components/Carousel";
import Schemes from "../components/Schemes";

const colors = {
  primary: "#FF5733", // Example color
  card: "#FFFFFF", // Example color
  border: "#CCCCCC", // Example color
  background: "#000000", // Example color
  text: "#FFFFFF", // Example color
};

const AVATAR_URL =
  require('../assets/images/logo.png');
const MESONARY_LIST_DATA = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80",
    title: "PUMA Everyday Hussle",
    price: 160,
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    title: "PUMA Everyday Hussle",
    price: 180,
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1556217477-d325251ece38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1020&q=80",
    title: "PUMA Everyday Hussle",
    price: 200,
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    title: "PUMA Everyday Hussle",
    price: 180,
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    title: "PUMA Everyday Hussle",
    price: 120,
  },
];

const HomeScreen = ({ navigation }: TabsStackScreenProps<"Home">) => {


  // Move useTheme hook call here
  const { colors } = useTheme();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openFilterModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);


  const CATEGORIES = [
    require("../assets/images/offerimage-1.png"), // Example image
    require("../assets/images/offerimage-2.png"), // Example image
    require("../assets/images/offerimage-3.png"), // Example image 
    require("../assets/images/offerimage-1.png"), // Example image
    require("../assets/images/offerimage-2.png"), // Example image
    require("../assets/images/offerimage-3.png"), // Example image 
  ];

  const Best = [
    require("../assets/images/mob-1.png"), // Example image
    require("../assets/images/mob-2.png"), // Example image
    require("../assets/images/mob-3.png"), // Example image  
  ];
  const handleSeeAllPress = () => {
    navigation.navigate('Electronics');
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ paddingVertical: 24, gap: 24 }}>
        {/* Header Section */}
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Image
            source={AVATAR_URL}
            style={{ width: 56, aspectRatio: 1, borderRadius: 0 }}
            resizeMode="cover"
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "600",
                marginBottom: 0,
                marginLeft: 14,
                color: colors.text,
              }}
              numberOfLines={1}
            >
              Neo Deals
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Icons name="notifications" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Search Bar Section */}
        <View style={{ flexDirection: "row", paddingHorizontal: 24, gap: 12 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              height: 52,
              borderRadius: 52,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: "center",
              paddingHorizontal: 24,
              flexDirection: "row",
              gap: 12,
            }}
          >
            <Icons
              name="search"
              size={24}
              color={colors.text}
              style={{ opacity: 0.5 }}
            />
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: colors.text,
                opacity: 0.5,
              }}
            >
              Search
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openFilterModal}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              backgroundColor: colors.primary,
            }}
          >
            <Icons name="tune" size={24} color={colors.background} />
          </TouchableOpacity>
        </View>

        <Carousel />

        {/* Top Deals */}
        <View style={{ paddingHorizontal: 24 }}>
          {/* Title bar */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "700", color: colors.text }}
            >
              Top Deals
            </Text>
            <TouchableOpacity onPress={handleSeeAllPress}>
              <Text style={{ color: colors.primary }}></Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 21,
            gap: 12,
          }}
          renderItem={({ item, index }) => {
            const isSelected = categoryIndex === index;
            return (
              <TouchableOpacity
                onPress={() => setCategoryIndex(index)}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Image
                  source={item}
                  style={{
                    width: 120,
                    height: 120,
                  }}
                  resizeMode="cover" // Adjust this property if needed
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />



        {/* Best in Electronics */}
        <View style={{ paddingHorizontal: 24 }}>
          {/* Title bar */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "700", color: colors.text }}
            >
              Best in Mobiles
            </Text>
            <TouchableOpacity onPress={handleSeeAllPress}>
              <Text style={{ color: colors.primary }}></Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={Best}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 21,
            gap: 12,
          }}
          renderItem={({ item, index }) => {
            const isSelected = categoryIndex === index;
            return (
              <TouchableOpacity
                onPress={() => setCategoryIndex(index)}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Image
                  source={item}
                  style={{
                    width: 200,
                    height: 200,
                  }}
                  resizeMode="cover" // Adjust this property if needed
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />

         

        {/* Best in Electronics */}
        <View style={{ paddingHorizontal: 24 }}>
          {/* Title bar */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "700", color: colors.text }}
            >
              Schemes You'd Not Miss
            </Text>
            <TouchableOpacity onPress={handleSeeAllPress}>
              <Text style={{ color: colors.primary }}></Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={Best}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 21,
            gap: 12,
          }}
          renderItem={({ item, index }) => {
            const isSelected = categoryIndex === index;
            return (
              <TouchableOpacity
                onPress={() => setCategoryIndex(index)}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Image
                  source={item}
                  style={{
                    width: 200,
                    height: 200,
                  }}
                  resizeMode="cover" // Adjust this property if needed
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />



        <View style={{ paddingHorizontal: 24 }}>
          {/* Title bar */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "700", color: colors.text }}
            >
              Upcoming Festive Offers
            </Text>
            <TouchableOpacity onPress={handleSeeAllPress}>
              <Text style={{ color: colors.primary }}></Text>
            </TouchableOpacity>
          </View>
        </View>


        <Carousel />

        {/* Categories Section */}
        {/* <View style={{ paddingHorizontal: 24 }}> */}
        {/* Title bar */}
        {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "700", color: colors.text }}
            >
              Categories
            </Text>
            <TouchableOpacity onPress={handleSeeAllPress}>
              <Text style={{ color: colors.primary }}>See All</Text>
            </TouchableOpacity>
          </View>
        </View> */}
        {/* <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 12,
          }}
          renderItem={({ item, index }) => {
            const isSelected = categoryIndex === index;
            return (
              <TouchableOpacity
                onPress={() => setCategoryIndex(index)}
                style={{
                  backgroundColor: isSelected ? colors.primary : colors.card,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 100,
                  borderWidth: isSelected ? 0 : 1,
                  borderColor: colors.border,
                }}
              >
                <Text
                  style={{
                    color: isSelected ? colors.background : colors.text,
                    fontWeight: "600",
                    fontSize: 14,
                    opacity: isSelected ? 1 : 0.5,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        /> */}

      </SafeAreaView>

      <BottomSheetModal
        snapPoints={["85%"]}
        index={0}
        ref={bottomSheetModalRef}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
        backgroundStyle={{
          borderRadius: 24,
          backgroundColor: colors.card,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
      >
        <FilterView />
      </BottomSheetModal>
    </ScrollView>
  );
};

export default HomeScreen;

const Card = ({
  price,
  imageUrl,
  onPress,
}: {
  price: number;
  imageUrl: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
      }}
    >
      <Image
        source={{
          uri: imageUrl,
        }}
        resizeMode="cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
      <View
        style={{
          position: "absolute",
          left: 12,
          top: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: "rgba(0,0,0,0.25)",
          borderRadius: 100,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}>
          Rs {price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
