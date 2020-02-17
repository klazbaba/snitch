import React from 'react';
import { StyleSheet, Animated, ViewProperties } from 'react-native';
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
}

const ContactDetails = (props: Props) => {
  return (
    <Animated.View {...props} style={[styles.wrapper, props.style]}>
      <Form>
        <Item floatingLabel error={props.contactNameError}>
          <Label style={styles.label}>Contact Name</Label>
          <Input
            style={styles.input}
            onChangeText={props.onContactNameChange}
            autoCapitalize='words'
          />
        </Item>

        <Item floatingLabel error={props.emailError}>
          <Label style={styles.label}>Contact Email</Label>
          <Input
            style={styles.input}
            onChangeText={props.onContactEmailChange}
            keyboardType='email-address'
            autoCapitalize='none'
          />
        </Item>

        <Item floatingLabel error={props.usernameError}>
          <Label style={styles.label}>Your Name</Label>
          <Input
            style={styles.input}
            onChangeText={props.onUsernameChange}
            autoCapitalize='words'
          />
        </Item>
        <CustomText
          text={'Enter a name this person recognizes you with'}
          style={styles.underneathText}
        />
      </Form>
    </Animated.View>
  );
};

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
