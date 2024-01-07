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
interface MasonryItem {
    imageUrl: string;
    title: string;
  }
  

const MESONARY_LIST_DATA = [
    {
        imageUrl:
            "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            title: "Electronics",
    },
    {
        imageUrl:
            "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        title: "Mens Clothing",
    },
    {
        imageUrl:
"https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Exclusive Mobiles",
    },
    {
        imageUrl:
            "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        title: "Women Clothing",
    },
    {
        imageUrl:
            "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJlYXV0eSUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
        title: "Beauty and More",
    },
    {
        imageUrl:
            "https://images.unsplash.com/photo-1489274495757-95c7c837b101?q=80&w=1615&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Appliances",
    },
    {
        imageUrl:
"https://plus.unsplash.com/premium_photo-1681980019667-96baeb36fc33?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Furniture",
    },
];

const Categories = ({ navigation }: TabsStackScreenProps<"Categories">) => {
    const { colors } = useTheme();
    const [categoryIndex, setCategoryIndex] = useState(0);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const openFilterModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleCategoryPress = (index: number) => {
        switch (index) {
          case 0:
            navigation.navigate('Electronics');
            break;
          // Add cases for other categories as needed
          default:
            break;
        }
      };
      

    return (
        <ScrollView>
            <SafeAreaView style={{ paddingVertical: 24, gap: 24 }}>

                {/* Mesonary */}
                <MasonryList
                  data={MESONARY_LIST_DATA}
                  numColumns={2}
                  contentContainerStyle={{ paddingHorizontal: 12 }}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, i }: { item: unknown; i: number }) => (
                    <TouchableOpacity
                        style={{ padding: 6 }}
                        onPress={() => handleCategoryPress(i)}
                    >
                        <View style={{ padding: 6 }}>
                            <View
                                style={{
                                    aspectRatio: i === 0 ? 1 : 2 / 3,
                                    position: "relative",
                                    overflow: "hidden",
                                    borderRadius: 24,
                                }}
                            >
                                <Image
                                    source={{
                                        uri: item.imageUrl,
                                    }}
                                    resizeMode="cover"
                                    style={StyleSheet.absoluteFill}
                                />
                                <View
                                    style={[
                                        StyleSheet.absoluteFill,
                                        {
                                            padding: 12,
                                        },
                                    ]}
                                >
                                    <View style={{ flexDirection: "row", gap: 8, padding: 4 }}>
                                        <Text
                                            style={{
                                                flex: 1,
                                                fontSize: 16,
                                                fontWeight: "600",
                                                color: "#000",
                                                textShadowColor: "rgba(0,0,0,0.2)",
                                                textShadowOffset: {
                                                    height: 1,
                                                    width: 0,
                                                },
                                                textShadowRadius: 4,
                                            }}
                                        >
                                            {item.title}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1 }} />
                                    <BlurView
                                        style={{
                                            flexDirection: "row",
                                            backgroundColor: "rgba(0,0,0,0.5)",
                                            alignItems: "center",
                                            padding: 6,
                                            borderRadius: 100,
                                            overflow: "hidden",
                                        }}
                                        intensity={20}
                                    >
                                        <Text
                                            style={{
                                                flex: 1,
                                                fontSize: 16,
                                                fontWeight: "600",
                                                color: "#fff",
                                                marginLeft: 8,
                                            }}
                                            numberOfLines={1}
                                        >
                                        </Text>
                                    </BlurView>
                                </View>
                            </View>
                        </View>
                        </TouchableOpacity>

                    )}
                    onEndReachedThreshold={0.1}
                />
 
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

export default Categories;

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
                    ${price}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
