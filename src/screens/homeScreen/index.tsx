import React, { Component } from "react";
import { SafeAreaView } from "react-native";

import { styles } from "./styles";
import CustomText from "../_components/customText";

export default class HomeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomText text="Home Screen" />
      </SafeAreaView>
    );
  }
}
