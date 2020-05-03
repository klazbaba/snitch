import React, { Component } from "react";
import { SafeAreaView, Modal, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { styles } from "./styles";
import CustomButton from "../_components/CustomButton";
import CustomText from "../_components/CustomText";

interface Props {
  navigation: any;
}

interface State {
  showModal: boolean;
}

export default class HomeScreen extends Component<Props> {
  state: State = {
    showModal: false,
  };

  handleContactView = async (): Promise<void> => {
    const contacts = await AsyncStorage.getItem("contactDetails");
    console.warn(JSON.stringify(contacts, null, 10));
  };

  render() {
    const { navigate } = this.props.navigation;
    const { showModal } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ padding: 24 }}>
          <CustomButton label="Send Distress Mail" onPress={() => null} />
          <CustomButton
            label="View Contacts"
            onPress={() => this.setState({ showModal: true })}
            style={styles.contactsButton}
          />

          <Modal transparent visible={showModal}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <CustomText text="Shuperu" />
            </ScrollView>
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
}
