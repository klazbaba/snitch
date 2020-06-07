import React, { Component } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInputProperties,
  View,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

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
        <ScrollView contentContainerStyle={styles.container}>
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
          />
          <View style={styles.buttomSection}>
            <CustomButton
              label="Cancel"
              style={[styles.button, { backgroundColor: colors.red }]}
              onPress={() => navigate("HomeScreen", { showModal: true })}
            />
            <CustomButton
              label="Save"
              style={[styles.button, { backgroundColor: colors.green }]}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
