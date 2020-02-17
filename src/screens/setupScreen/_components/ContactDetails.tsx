import React from 'react';
import { StyleSheet, Animated, ViewProperties } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';

import { colors } from '../../colors';
import CustomText from '../../_components/customText';

interface Props extends ViewProperties {
  style?: object;
}

const ContactDetails = (props: Props) => {
  return (
    <Animated.View {...props} style={[styles.wrapper, props.style]}>
      <Form>
        <Item floatingLabel>
          <Label style={styles.label}>Contact Name</Label>
          <Input style={styles.input} />
        </Item>

        <Item floatingLabel>
          <Label style={styles.label}>Contact Email</Label>
          <Input style={styles.input} />
        </Item>

        <Item floatingLabel>
          <Label style={styles.label}>Your Name</Label>
          <Input style={styles.input} />
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
