import React, { Component } from "react";
import { SafeAreaView, Modal, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Button, Icon } from "native-base";

import { styles } from "./styles";
import CustomButton from "../_components/CustomButton";
import CustomText from "../_components/CustomText";

interface Props {
  navigation: any;
}

interface State {
  showModal: boolean;
  contacts: [];
}

export default class HomeScreen extends Component<Props> {
  state: State = {
    showModal: false,
    contacts: [],
  };

  handleContactView = async (): Promise<void> => {
    let contacts: string | object = await AsyncStorage.getItem(
      "contactDetails"
    );
    contacts = JSON.parse(contacts);
    this.setState({ contacts: Object.values(contacts), showModal: true });
  };

  renderContacts = () => {
    const { contacts } = this.state;

    return contacts.map((contactDetails: { contactEmail; contactName }) => (
      <View>
        <CustomText text={contactDetails.contactName} />
      </View>
    ));
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
            onPress={this.handleContactView}
            style={styles.contactsButton}
          />

          <Modal transparent visible={showModal}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Button
                icon
                transparent
                style={{ width: 50 }}
                onPress={() => this.setState({ showModal: false })}
              >
                <Icon name="arrow-back" />
              </Button>
              {this.renderContacts()}
            </ScrollView>
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
}
