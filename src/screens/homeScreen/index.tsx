import React, { Component } from "react";
import { SafeAreaView, Modal, View,  Animated, Easing } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Button, Icon } from "native-base";

import { styles } from "./styles";
import CustomButton from "../_components/CustomButton";
import CustomText from "../_components/CustomText";
import { colors } from "../colors";

interface Props {
  navigation: any;
}

interface State {
  showModal: boolean;
  contacts: Array<Contact>;
  currentContact: Contact;
}

interface Contact {
  contactEmail: string;
  contactName: string;
  username?: string;
}

const rotatingAnimationValue = new Animated.Value(0)
const rollingAnimationValue = new Animated.Value(0)
export default class HomeScreen extends Component<Props> {
  state: State = {
    showModal: false,
    contacts: [],
    currentContact: null,
  };

  rollWrapper = () => {
    Animated.timing(rotatingAnimationValue, {
      toValue: 1,
      useNativeDriver: true,
      duration:5000,
      easing:Easing.linear
    }).start()
  }

  moveWrapper = () => {
    Animated.timing(rollingAnimationValue, {
      toValue:500,
      useNativeDriver:true,
      duration: 5000,
      easing: Easing.linear
    }).start()
  }

  handleContactView = async () => {
    let contacts: string | object = await AsyncStorage.getItem(
      "contactDetails"
    );
    contacts = JSON.parse(contacts);
    this.setState({
      contacts: Object.values(contacts),
      showModal: true,
    }, () => this.setState({ currentContact: this.state.contacts[0]}));
  };

  renderContacts = () => {
    return (
      <View>
        <CustomText text="Contact Name: " style={{marginBottom:8}}>
          <CustomText bold text={this.state.currentContact?.contactName} />
        </CustomText>

        <CustomText text="Contact Email: " style={{ marginBottom: 8 }}>
          <CustomText bold text={this.state.currentContact?.contactEmail} />
        </CustomText>

        <CustomText text="Your Name: " style={{ marginBottom: 8 }}>
          <CustomText bold text={this.state.currentContact?.username} />
        </CustomText>
      </View>
    );
  };

  showNextContact = () => {
    this.rollWrapper()
    this.moveWrapper()
  }

  render() {
    const { showModal } = this.state;
    const rotate = rotatingAnimationValue.interpolate({inputRange: [0, 1], outputRange: ['0deg', '180deg']})

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
            <Animated.View style={{ translateX: rollingAnimationValue }}>
            <Animated.ScrollView contentContainerStyle={styles.modalContent} style={{ transform: [{ rotate }] }}>
              {this.renderContacts()}
              <View style={styles.navigationIconsWrapper}>
                <Button style={{ backgroundColor: colors.brown }}>
                  <Icon name="arrowleft" type="AntDesign" />
                </Button>
                <Button style={{ backgroundColor: colors.brown }} onPress={this.showNextContact}>
                  <Icon name="arrowright" type="AntDesign" />
                </Button>
              </View>

              <Button
                style={styles.closeButton}
                onPress={() => this.setState({ showModal: false })}
              >
                <Icon name="close" type="AntDesign" />
              </Button>
            </Animated.ScrollView></Animated.View>
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
}
