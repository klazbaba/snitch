import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { styles } from "./styles";
import CustomText from "../_components/customText";

export default class HomeScreen extends Component {
  componentDidMount = async () => {
    console.warn(JSON.parse(await AsyncStorage.getItem("contactDetails")));
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomText text="Home Screen" />
      </SafeAreaView>
    );
  }
}
