import React, { Component } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInputProperties,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";

import { styles } from "./styles";
import ContactDetails from "../_components/ContactDetails";
import CustomButton from "../_components/CustomButton";
import { colors } from "../colors";

interface Props {
  navigation: StackNavigationProp<Record<string, object | undefined>, string>;
  route: Route;
}

interface ContactItem {
  contactName: string;
  contactEmail: string;
  username: string;
}

interface Contact {
  details: ContactItem;
  contact?: number;
}

interface Route {
  params: Contact;
}

interface State {
  username: string;
  contactName: string;
  contactEmail: string;
  emailHasError: boolean;
  usernameHasError: boolean;
  nameHasError: boolean;
}

interface TextInputProp extends TextInputProperties {
  _root?: { focus: () => void };
}

export default class EditContactScreen extends Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);
    props.navigation.setOptions({ header: () => null });
    const { details }: Contact = this.props.route.params;

    this.state = {
      username: details.username,
      contactEmail: details.contactEmail,
      contactName: details.contactName,
      emailHasError: false,
      usernameHasError: false,
      nameHasError: false,
    };
  }

  handleSavePress = async () => {
    const { username, contactEmail, contactName } = this.state;
    const { contact } = this.props.route.params;
    const { navigate } = this.props.navigation;
    let contactDetails: string | Contact = await AsyncStorage.getItem(
      "contactDetails"
    );
    contactDetails = JSON.parse(contactDetails);
    contactDetails[contact] = {
      contactName: contactName.trim(),
      contactEmail: contactEmail.trim().toLowerCase(),
      username: username.trim(),
    };
    await AsyncStorage.setItem(
      "contactDetails",
      JSON.stringify(contactDetails)
    );
    Alert.alert("Details successfully updated!", "", [
      {
        text: "OK",
        onPress: () =>
          navigate("HomeScreen", { contacts: contactDetails, fromEdit: true }),
      },
    ]);
  };

  render() {
    const {
      contactName,
      contactEmail,
      username,
      emailHasError,
      usernameHasError,
      nameHasError,
    } = this.state;
    let emailInput: TextInputProp;
    let usernameInput: TextInputProp;
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="always"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 120 : null}
          >
            <ContactDetails
              contactName={contactName}
              contactEmail={contactEmail}
              username={username}
              onContactNameChange={(contactName) =>
                this.setState({ contactName })
              }
              onContactEmailChange={(contactEmail) =>
                this.setState({ contactEmail })
              }
              onUsernameChange={(username) => this.setState({ username })}
              contactNameError={nameHasError}
              usernameError={usernameHasError}
              emailError={emailHasError}
              emailRef={(email) => (emailInput = email)}
              usernameRef={(username) => (usernameInput = username)}
              onSubmitContactEmail={() => usernameInput._root.focus()}
              onSubmitContactName={() => emailInput._root.focus()}
              style={{ marginBottom: 0 }}
              testID="textInput"
            />
            <View style={styles.buttomSection}>
              <CustomButton
                text="Cancel"
                style={[styles.button, { backgroundColor: colors.red }]}
                onPress={() => navigate("HomeScreen", { showModal: true })}
              />
              <CustomButton
                text="Save"
                style={[styles.button, { backgroundColor: colors.green }]}
                onPress={this.handleSavePress}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
