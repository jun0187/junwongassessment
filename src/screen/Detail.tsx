import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import React from "react";
import { backgroundStyle } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { IMAGE_URI, NAVIGATION } from "../constant";

const Detail = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const movieDetail = useSelector((state: any) => state.movie.movieDetail);

  const testID = {
    container: "test-detail-container",
    bookBtn: "test-book-btn",
  };

  return (
    <SafeAreaView style={backgroundStyle()}>
      <View
        style={styles.container}
        testID={testID.container}
        key={movieDetail?.id}
      >
        <Image
          source={{
            uri:
              movieDetail?.poster_path || movieDetail?.backdrop_path
                ? IMAGE_URI.IMAGE.replace(
                    "{imageURI}",
                    movieDetail?.poster_path ?? movieDetail?.backdrop_path
                  )
                : IMAGE_URI.DEFAULT,
          }}
          style={styles.image}
        />
        <Text style={{ fontWeight: "bold" }}>{movieDetail?.title}</Text>
        <Text>{movieDetail?.overview}</Text>
        <View style={{ flexDirection: "row" }}>
          {movieDetail?.genres.map((i: any) => (
            <Text key={i.id} style={{ fontWeight: "bold" }}>
              {" "}
              *{i.name}*{" "}
            </Text>
          ))}
        </View>
        <Text>Original Language: {movieDetail?.original_language}</Text>
        <Text>Runtime: {movieDetail?.runtime}</Text>
        <Button
          title="Book Now"
          onPress={() => {
            navigation.navigate(NAVIGATION.BOOK);
          }}
          testID={testID.bookBtn}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: "10%",
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.8,
  },
  image: {
    width: 100,
    height: 100,
  },
});
export default Detail;
