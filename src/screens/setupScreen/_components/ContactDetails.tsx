import React, { Component, RefObject } from 'react';
import { StyleSheet, Animated, ViewProperties, TextInput } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';

import { colors } from '../../colors';
import CustomText from '../../_components/customText';

interface Props extends ViewProperties {
  style?: object;
  onContactNameChange: (text: string) => void;
  onContactEmailChange: (text: string) => void;
  onUsernameChange: (text: string) => void;
  contactNameError: boolean;
  emailError: boolean;
  usernameError: boolean;
  onSubmitContactName: () => void;
  contactNameRef: RefObject<TextInput>;
  emailRef: (email: TextInput) => void;
  returnKeyType?: 'done';
  onSubmitContactEmail: () => void;
  usernameRef: (username: TextInput) => void;
}

class ContactDetails extends Component<Props> {
  render() {
    return (
      <Animated.View {...this.props} style={[styles.wrapper, this.props.style]}>
        <Form>
          <Item floatingLabel error={this.props.contactNameError}>
            <Label style={styles.label}>Contact Name</Label>
            <Input
              style={styles.input}
              onChangeText={this.props.onContactNameChange}
              autoCapitalize='words'
              ref={this.props.contactNameRef}
              onSubmitEditing={this.props.onSubmitContactName}
              returnKeyType='next'
            />
          </Item>

          <Item floatingLabel error={this.props.emailError}>
            <Label style={styles.label}>Contact Email</Label>
            <Input
              style={styles.input}
              onChangeText={this.props.onContactEmailChange}
              keyboardType='email-address'
              autoCapitalize='none'
              getRef={this.props.emailRef}
              returnKeyType='next'
              onSubmitEditing={this.props.onSubmitContactEmail}
            />
          </Item>

          <Item floatingLabel error={this.props.usernameError}>
            <Label style={styles.label}>Your Name</Label>
            <Input
              style={styles.input}
              onChangeText={this.props.onUsernameChange}
              autoCapitalize='words'
              returnKeyType={this.props.returnKeyType}
              getRef={this.props.usernameRef}
            />
          </Item>
          <CustomText
            text={'Enter a name this person recognizes you with'}
            style={styles.underneathText}
          />
        </Form>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    elevation: 4,
    backgroundColor: colors.white,
    padding: 16,
    marginVertical: 16
  },
  input: {
    marginTop: 8
  },
  underneathText: {
    fontSize: 12,
    marginLeft: 16,
    color: colors.grey
  },
  label: {
    fontSize: 14,
    color: colors.brown
  }
});

export default ContactDetails;
