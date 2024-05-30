import { StyleSheet, View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";

const Book = () => {
  return (
    <View style={styles.outerContainer} testID="test-web-view">
      <View style={styles.innerContainer}>
        <WebView
          source={{
            uri: "https://www.cathaycineplexes.com.sg/movies/",
          }}
          startInLoadingState={false}
          incognito={true}
          scalesPageToFit={true}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  outerContainer: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  innerContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    flexGrow: 1,
    overflow: "hidden",
  },
});
export default Book;
