import React, { Component } from "react";
import {
  ScrollView,
  SafeAreaView,
  Animated,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScaledSize
} from "react-native";
import { Fab, Toast } from "native-base";
import AsyncStorage from "@react-native-community/async-storage";

import { styles } from "./styles";
import ContactDetails from "./_components/ContactDetails";
import CustomText from "../_components/customText";
import CustomButton from "../_components/CustomButton";
import { colors } from "../colors";
import { constants } from "../../constants";

interface Props {}

interface State {
  numberOfContactShown: number;
  contactName: Array<string>;
  contactEmail: Array<string>;
  username: Array<string>;
  firstContactNameHasError: boolean;
  firstContactEmailHasError: boolean;
  firstUsernameHasError: boolean;
  secondContactNameHasError: boolean;
  secondContactEmailHasError: boolean;
  secondUsernameHasError: boolean;
  thirdContactNameHasError: boolean;
  thirdContactEmailHasError: boolean;
  thirdUsernameHasError: boolean;
  showIndicator: boolean;
}

const { height }: ScaledSize = Dimensions.get("window");
const secondWrapper: Animated.Value = new Animated.Value(-height);
const thirdWrapper: Animated.Value = new Animated.Value(-height);
let firstContactEmailInput: any;
let firstUsernameInput: any;
let secondContactEmail: any;
let secondUsernameInput: any;
let thirdContactEmailInput: any;
let thirdUsernameInput: any;

export default class SetupScreen extends Component<Props> {
  state: State = {
    numberOfContactShown: 1,
    contactName: ["", "", ""],
    contactEmail: ["", "", ""],
    username: ["", "", ""],
    firstContactNameHasError: false,
    firstContactEmailHasError: false,
    firstUsernameHasError: false,
    secondContactNameHasError: false,
    secondContactEmailHasError: false,
    secondUsernameHasError: false,
    thirdContactNameHasError: false,
    thirdContactEmailHasError: false,
    thirdUsernameHasError: false,
    showIndicator: false
  };

  animateUpward = (wrapper: Animated.Value) => {
    Animated.timing(wrapper, {
      toValue: 0,
      duration: wrapper === secondWrapper ? 1000 : 500
    }).start();
  };

  handleFabPress = () => {
    const { numberOfContactShown } = this.state;

    if (numberOfContactShown === 1) this.animateUpward(secondWrapper);
    else if (numberOfContactShown === 2) this.animateUpward(thirdWrapper);
    else if (numberOfContactShown > 2)
      Toast.show({
        text: "You have already added the maximum number of contacts!",
        duration: constants.toastDuration
      });
    this.setState({ numberOfContactShown: numberOfContactShown + 1 });
  };

  validateName = (names: Array<string>): number[] => {
    const result = names.map((name: string, index: number) => {
      const isValid = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(name);
      if (!isValid) return index;
    });
    return result;
  };

  validateEmail = (emails: Array<string>) => {
    const result = emails.map((email: string, index: number) => {
      const isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(
        email.toLowerCase()
      );
      if (!isValid) return index;
    });
    return result;
  };

  saveContacts = async () => {
    const { contactEmail, contactName, username } = this.state;
    const contactNameError = this.validateName(contactName);
    const emailError = this.validateEmail(contactEmail);
    const usernameError = this.validateName(username);

    this.setState({ showIndicator: true });
    if (contactNameError[0] === 0 || contactNameError[0] === undefined)
      this.setState(
        { firstContactNameHasError: contactNameError[0] === 0 },
        () => {
          if (contactNameError[1] === 1 || contactNameError[1] === undefined)
            this.setState(
              {
                secondContactNameHasError: contactNameError[1] === 1
              },
              () => {
                if (
                  contactNameError[2] === 2 ||
                  contactNameError[2] === undefined
                )
                  this.setState(
                    {
                      thirdContactNameHasError: contactNameError[2] === 2
                    },
                    () => {
                      if (emailError[0] === 0 || emailError[0] === undefined)
                        this.setState(
                          { firstContactEmailHasError: emailError[0] === 0 },
                          () => {
                            if (
                              emailError[1] === 1 ||
                              emailError[1] === undefined
                            )
                              this.setState(
                                {
                                  secondContactEmailHasError:
                                    emailError[1] === 1
                                },
                                () => {
                                  if (
                                    emailError[2] === 2 ||
                                    emailError[2] === undefined
                                  )
                                    this.setState(
                                      {
                                        thirdContactEmailHasError:
                                          emailError[2] === 2
                                      },
                                      () => {
                                        if (
                                          usernameError[0] === 0 ||
                                          usernameError[0] === undefined
                                        )
                                          this.setState(
                                            {
                                              firstUsernameHasError:
                                                usernameError[0] === 0
                                            },
                                            () => {
                                              if (
                                                usernameError[1] === 1 ||
                                                usernameError === undefined
                                              )
                                                this.setState(
                                                  {
                                                    secondUsernameHasError:
                                                      usernameError[1] === 1
                                                  },
                                                  () => {
                                                    if (
                                                      usernameError[2] === 2 ||
                                                      usernameError[2]
                                                    )
                                                      this.setState(
                                                        {
                                                          thirdUsernameHasError:
                                                            usernameError[2] ===
                                                            2
                                                        },
                                                        () => {
                                                          if (
                                                            this.state
                                                              .firstContactNameHasError ||
                                                            this.state
                                                              .secondContactNameHasError ||
                                                            this.state
                                                              .thirdContactNameHasError ||
                                                            this.state
                                                              .firstContactEmailHasError ||
                                                            this.state
                                                              .secondContactEmailHasError ||
                                                            this.state
                                                              .thirdContactEmailHasError ||
                                                            this.state
                                                              .firstUsernameHasError ||
                                                            this.state
                                                              .secondUsernameHasError ||
                                                            this.state
                                                              .thirdUsernameHasError
                                                          ) {
                                                            Toast.show({
                                                              text:
                                                                "An error occurred, details not saved!",
                                                              duration:
                                                                constants.toastDuration,
                                                              style: {
                                                                backgroundColor:
                                                                  colors.red
                                                              }
                                                            });
                                                          }
                                                        }
                                                      );
                                                  }
                                                );
                                            }
                                          );
                                      }
                                    );
                                }
                              );
                          }
                        );
                    }
                  );
              }
            );
        }
      );
    else {
      await AsyncStorage.setItem(
        "contactDetails",
        JSON.stringify({
          0: {
            contactEmail: contactEmail[0].toLowerCase(),
            contactName: contactName[0],
            username: username[0]
          },
          1: {
            contactEmail: contactEmail[1].toLowerCase(),
            contactName: contactName[1],
            username: username[1]
          },
          2: {
            contactEmail: contactEmail[2].toLowerCase(),
            contactName: contactName[2],
            username: username[2]
          }
        })
      );
    }
    this.setState({ showIndicator: false });
  };

  render() {
    const {
      numberOfContactShown,
      contactEmail,
      contactName,
      username,
      firstContactNameHasError,
      firstContactEmailHasError,
      firstUsernameHasError,
      secondContactNameHasError,
      secondContactEmailHasError,
      secondUsernameHasError,
      thirdContactEmailHasError,
      thirdContactNameHasError,
      thirdUsernameHasError,
      showIndicator
    } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
            <CustomText
              text="Who do you want to inform when in distress?"
              style={styles.title}
            />
            <ContactDetails
              style={styles.firstContactDetails}
              onContactEmailChange={email => (contactEmail[0] = email.trim())}
              onContactNameChange={name => (contactName[0] = name.trim())}
              onUsernameChange={name => (username[0] = name.trim())}
              contactNameError={firstContactNameHasError}
              usernameError={firstUsernameHasError}
              emailError={firstContactEmailHasError}
              emailRef={email => (firstContactEmailInput = email)}
              onSubmitContactName={() => firstContactEmailInput._root.focus()}
              onSubmitContactEmail={() => firstUsernameInput._root.focus()}
              usernameRef={username => (firstUsernameInput = username)}
              autoFocus
            />

            {numberOfContactShown > 1 ? (
              <ContactDetails
                style={{ bottom: secondWrapper }}
                onContactEmailChange={email => (contactEmail[1] = email.trim())}
                onContactNameChange={name => (contactName[1] = name.trim())}
                onUsernameChange={name => (username[1] = name.trim())}
                contactNameError={secondContactNameHasError}
                usernameError={secondUsernameHasError}
                emailError={secondContactEmailHasError}
                emailRef={contactName => (secondContactEmail = contactName)}
                onSubmitContactName={() => secondContactEmail._root.focus()}
                onSubmitContactEmail={() => secondUsernameInput._root.focus()}
                usernameRef={username => (secondUsernameInput = username)}
              />
            ) : null}

            {numberOfContactShown > 2 ? (
              <>
                <ContactDetails
                  style={{ bottom: thirdWrapper }}
                  onContactEmailChange={email =>
                    (contactEmail[2] = email.trim())
                  }
                  onContactNameChange={name => (contactName[2] = name.trim())}
                  onUsernameChange={name => (username[2] = name.trim())}
                  contactNameError={thirdContactNameHasError}
                  usernameError={thirdUsernameHasError}
                  emailError={thirdContactEmailHasError}
                  emailRef={contactName =>
                    (thirdContactEmailInput = contactName)
                  }
                  onSubmitContactName={() =>
                    thirdContactEmailInput._root.focus()
                  }
                  onSubmitContactEmail={() => thirdUsernameInput._root.focus()}
                  usernameRef={username => (thirdUsernameInput = username)}
                  onSubmitUsername={this.saveContacts}
                />
                <CustomButton
                  text="Save"
                  onPress={this.saveContacts}
                  style={styles.button}
                />
              </>
            ) : null}
          </KeyboardAvoidingView>
        </ScrollView>

        <Fab style={styles.fab} onPress={this.handleFabPress}>
          <CustomText text={"\u002B"} style={styles.plusIcon} />
        </Fab>
        {showIndicator ? (
          <ActivityIndicator size="large" style={styles.indicator} />
        ) : null}
      </SafeAreaView>
    );
  }
}
