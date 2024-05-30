import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { backgroundStyle } from "../../App";
import { Dropdown } from "react-native-element-dropdown";
import { NAVIGATION, movieSortList } from "../constant";
import { getMovieDetailAction, getMovieListAction } from "../saga/movie.saga";
import { IMAGE_URI } from "../constant";
import SkeletonLoading from "react-native-skeleton-loading";

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch();
  const pageNo = useRef(1);
  const [isFocus, setIsFocus] = useState(false);
  const [sortData, setSortData] = useState(movieSortList[0].id);
  const [refreshing, setRefreshing] = useState(false);
  const [ascSortName, setAscSortName] = useState(true);
  const movieList = useSelector((state: any) => state.movie.movieList);

  const testId = {
    dropDown: "test-drop-down",
    sortButton: "test-sort-button",
    movieDetail: "test-movie-detail",
    flatList: "test-flat-list",
  };

  useEffect(() => {
    if (refreshing && !movieList?.isLoading) {
      setRefreshing(false);
    }
  }, [movieList]);

  useEffect(() => {
    updateList();
  }, [sortData, ascSortName]);

  const updateList = () => {
    if (!movieList || movieList.total_pages > pageNo.current) {
      dispatch(
        getMovieListAction({
          releaseDate: "2016-12-31",
          sortBy: `${sortData}.${ascSortName ? "asc" : "desc"}`,
          page: pageNo.current,
        })
      );
    }
  };
  const onEndReached = () => {
    if (
      !movieList ||
      movieList.isError ||
      movieList.isLoading ||
      movieList.page === movieList.total_pages
    ) {
      return;
    }
    pageNo.current += 1;
    updateList();
  };

  return (
    <SafeAreaView style={backgroundStyle()}>
      <View style={styles.filterContainer}>
        <Dropdown
          testID={testId.dropDown}
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.fontSizeStyle}
          selectedTextStyle={styles.fontSizeStyle}
          iconStyle={styles.iconStyle}
          data={movieSortList}
          maxHeight={300}
          labelField="label"
          valueField="id"
          placeholder={!isFocus ? "Filter by" : "..."}
          value={sortData}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            pageNo.current = 1;
            setSortData(item.id);
            setIsFocus(false);
          }}
        />
        <Button
          title={ascSortName ? "ASC" : "DSC"}
          testID={testId.sortButton}
          onPress={() => setAscSortName((i) => !i)}
        />
      </View>
      <FlatList
        testID={testId.flatList}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          pageNo.current = 1;
          updateList();
        }}
        data={movieList?.results}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={item.id}
              testID={`${testId.movieDetail}-${index}`}
              style={styles.listingContainer}
              onPress={() => {
                dispatch(getMovieDetailAction({ detailID: item.id }));
                navigation.navigate(NAVIGATION.DETAIL);
              }}
            >
              <Image
                source={{
                  uri:
                    item?.poster_path || item?.backdrop_path
                      ? IMAGE_URI.IMAGE.replace(
                          "{imageURI}",
                          item?.poster_path ?? item?.backdrop_path
                        )
                      : IMAGE_URI.DEFAULT,
                }}
                style={styles.image}
              />
              <Text
                style={{ fontWeight: "bold" }}
                testID={`${testId.movieDetail}-${index}`}
              >
                {item.title}
              </Text>
              <Text>Popularity: {item.popularity}</Text>
              <View style={styles.horizontalLine} />
            </TouchableOpacity>
          );
        }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.01}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: "80%",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  fontSizeStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  listingContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "7%",
    marginTop: "2%",
  },
  filterContainer: {
    marginHorizontal: "5%",
    marginTop: "2%",
    justifyContent: "space-between",
    alignItems: "stretch",
    flexDirection: "row",
  },
  horizontalLine: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    width: "100%",
    marginVertical: "3%",
  },
});
export default Home;
