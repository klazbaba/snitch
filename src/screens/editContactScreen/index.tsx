import React, { Component } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { styles } from "./styles";
import ContactDetails from "../_components/ContactDetails";

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

export default class EditContactScreen extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { details }: Contact = this.props.route.params;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <ContactDetails
            contactName={details.contactName}
            contactEmail={details.contactEmail}
            username={details.username}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
