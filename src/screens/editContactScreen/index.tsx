import React, { Component } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { styles } from "./styles";

export default class EditContactScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} />
      </SafeAreaView>
    );
  }
}
