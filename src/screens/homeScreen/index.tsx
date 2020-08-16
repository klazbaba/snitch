import React, { Component } from "react";
import {
  SafeAreaView,
  Modal,
  View,
  Animated,
  Easing,
  Platform,
  PermissionsAndroid,
  Alert,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Button, Icon } from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";
import { LogBox } from "react-native";
import Geolocation from "@react-native-community/geolocation";

import { styles } from "./styles";
import CustomButton from "../_components/CustomButton";
import CustomText from "../_components/CustomText";
import { colors } from "../colors";

interface Props {
  navigation: StackNavigationProp<Record<string, object | undefined>, string>;
  route: Route;
}

interface Route {
  params: {
    showModal: boolean;
    fromEdit: boolean;
    contacts: string;
  };
}

interface State {
  contacts: Array<Contact>;
}

interface Contact {
  contactEmail: string;
  contactName: string;
  username?: string;
}

let rollingAnimationValue0 = new Animated.Value(0);
let movingAnimationValue0 = new Animated.Value(0);

const rollingAnimationValue1 = new Animated.Value(0);
const movingAnimationValue1 = new Animated.Value(0);

const animationTime = 500;

export default class HomeScreen extends Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);
    AsyncStorage.getItem("contactDetails").then((contacts) => {
      contacts = JSON.parse(contacts);
      this.setState({
        contacts: Object.values(contacts),
        currentContact: contacts[0],
      });
    });

    this.state = {
      contacts: [],
    };
    LogBox.ignoreLogs([/useAnimatedDriver/]);
  }

  componentDidMount = () => {
    this.props.navigation.addListener("focus", () => {
      if (this.props.route.params?.fromEdit) {
        const { contacts } = this.props.route.params;
        this.setState({
          contacts: Object.values(contacts),
          currentContact: contacts[0],
        });
      }
    });
  };

  componentWillUnmount = () =>
    this.props.navigation.removeListener("focus", () => {});

  animate = (from: Animated.Value, to: number) => {
    Animated.timing(from, {
      toValue: to,
      useNativeDriver: true,
      duration: animationTime,
      easing: Easing.linear,
    }).start();
  };

  getAnimationValue = (
    currentContact: number,
    nextContact: number,
    animationType: "roll" | "move" = "roll"
  ) => {
    if (currentContact === 0 && nextContact === 1 && animationType == "roll")
      return { from: rollingAnimationValue0, to: 1 };
    else if (
      currentContact === 0 &&
      nextContact === 1 &&
      animationType == "move"
    )
      return { from: movingAnimationValue0, to: 500 };
    else if (
      currentContact === 1 &&
      nextContact === 0 &&
      animationType === "roll"
    )
      return { from: rollingAnimationValue0, to: 0 };
    else if (
      currentContact === 1 &&
      nextContact === 0 &&
      animationType === "move"
    )
      return { from: movingAnimationValue0, to: 0 };
    else if (
      currentContact === 1 &&
      nextContact === 2 &&
      animationType === "roll"
    )
      return { from: rollingAnimationValue1, to: 1 };
    else if (
      currentContact === 1 &&
      nextContact === 2 &&
      animationType == "move"
    )
      return { from: movingAnimationValue1, to: 500 };
    else if (
      currentContact === 3 &&
      nextContact === 2 &&
      animationType === "roll"
    )
      return { from: rollingAnimationValue1, to: 0 };
    else if (
      currentContact === 3 &&
      nextContact === 2 &&
      animationType == "move"
    )
      return { from: movingAnimationValue1, to: 0 };
  };

  showContact = (currentContact: number, nextContact: number) => {
    const rollValue = this.getAnimationValue(currentContact, nextContact);
    const moveValue = this.getAnimationValue(
      currentContact,
      nextContact,
      "move"
    );

    this.animate(rollValue.from, rollValue.to);
    this.animate(moveValue.from, moveValue.to);
  };

  editContact = (contact: number) => {
    const { navigate, setParams } = this.props.navigation;
    const { contacts } = this.state;
    setParams({ showModal: false });
    navigate("EditContactScreen", { contact, details: contacts[contact] });
  };

  firstItem = () => {
    const rotate = rollingAnimationValue0.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
    });
    const { contacts } = this.state;
    const { navigation } = this.props;

    return (
      <Animated.View
        style={[
          { transform: [{ translateX: movingAnimationValue0 }], zIndex: 2 },
          styles.modalContent,
        ]}
      >
        <Button
          style={styles.pencil}
          transparent
          onPress={() => this.editContact(0)}
        >
          <Icon
            name="pencil"
            type="EvilIcons"
            style={{
              fontSize: 32,
              color: colors.orange,
            }}
          />
        </Button>

        <Animated.View style={{ transform: [{ rotate }] }}>
          <CustomText text="Contact Name: " style={{ marginBottom: 8 }}>
            <CustomText bold text={contacts[0]?.contactName} />
          </CustomText>

          <CustomText text="Contact Email: " style={{ marginBottom: 8 }}>
            <CustomText bold text={contacts[0]?.contactEmail} />
          </CustomText>

          <CustomText text="Your Name: " style={{ marginBottom: 8 }}>
            <CustomText bold text={contacts[0]?.username} />
          </CustomText>

          <View style={styles.navigationIconsWrapper}>
            <Button style={{ backgroundColor: colors.brown }}>
              <Icon name="arrowleft" type="AntDesign" />
            </Button>
            <Button
              style={{ backgroundColor: colors.brown }}
              onPress={() => this.showContact(0, 1)}
            >
              <Icon name="arrowright" type="AntDesign" />
            </Button>
          </View>

          <Button
            style={styles.closeButton}
            onPress={() => navigation.setParams({ showModal: false })}
          >
            <Icon name="close" type="AntDesign" />
          </Button>
        </Animated.View>
      </Animated.View>
    );
  };

  secondItem = () => {
    const rotate = rollingAnimationValue1.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
    });
    const { contacts } = this.state;
    const { navigation } = this.props;

    return (
      <Animated.View
        style={[
          { transform: [{ translateX: movingAnimationValue1 }], zIndex: 1 },
          styles.modalContent,
        ]}
      >
        <Button
          style={styles.pencil}
          transparent
          onPress={() => this.editContact(1)}
        >
          <Icon
            name="pencil"
            type="EvilIcons"
            style={{
              fontSize: 32,
              color: colors.orange,
            }}
          />
        </Button>

        <Animated.View style={{ transform: [{ rotate }] }}>
          <CustomText text="Contact Name: " style={{ marginBottom: 8 }}>
            <CustomText bold text={contacts[1]?.contactName} />
          </CustomText>

          <CustomText text="Contact Email: " style={{ marginBottom: 8 }}>
            <CustomText bold text={contacts[1]?.contactEmail} />
          </CustomText>

          <CustomText text="Your Name: " style={{ marginBottom: 8 }}>
            <CustomText bold text={contacts[1]?.username} />
          </CustomText>

          <View style={styles.navigationIconsWrapper}>
            <Button
              style={{ backgroundColor: colors.brown }}
              onPress={() => this.showContact(1, 0)}
            >
              <Icon name="arrowleft" type="AntDesign" />
            </Button>
            <Button
              style={{ backgroundColor: colors.brown }}
              onPress={() => this.showContact(1, 2)}
            >
              <Icon name="arrowright" type="AntDesign" />
            </Button>
          </View>

          <Button
            style={styles.closeButton}
            onPress={() => navigation.setParams({ showModal: false })}
          >
            <Icon name="close" type="AntDesign" />
          </Button>
        </Animated.View>
      </Animated.View>
    );
  };

  thirdItem = () => {
    const { contacts } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.modalContent}>
        <Button
          style={styles.pencil}
          transparent
          onPress={() => this.editContact(2)}
        >
          <Icon
            name="pencil"
            type="EvilIcons"
            style={{
              fontSize: 32,
              color: colors.orange,
            }}
          />
        </Button>

        <CustomText text="Contact Name: " style={{ marginBottom: 8 }}>
          <CustomText bold text={contacts[2]?.contactName} />
        </CustomText>

        <CustomText text="Contact Email: " style={{ marginBottom: 8 }}>
          <CustomText bold text={contacts[2]?.contactEmail} />
        </CustomText>

        <CustomText text="Your Name: " style={{ marginBottom: 8 }}>
          <CustomText bold text={contacts[2]?.username} />
        </CustomText>

        <View style={styles.navigationIconsWrapper}>
          <Button
            style={{ backgroundColor: colors.brown }}
            onPress={() => this.showContact(3, 2)}
          >
            <Icon name="arrowleft" type="AntDesign" />
          </Button>
          <Button style={{ backgroundColor: colors.brown }}>
            <Icon name="arrowright" type="AntDesign" />
          </Button>
        </View>

        <Button
          style={styles.closeButton}
          onPress={() => navigation.setParams({ showModal: false })}
        >
          <Icon name="close" type="AntDesign" />
        </Button>
      </View>
    );
  };

  sendDistressMail = async () => {
    // let permissionStatus;
    // if (Platform.OS == "android") {
    //   permissionStatus = await PermissionsAndroid.check(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    //   );
    // if (!permissionStatus) {

    // }
    // }
    Geolocation.getCurrentPosition(
      (info) => {
        console.warn("flex");
        console.warn("info: ", info);
      },
      async (error) => {
        if (
          error.message == "Location permission was not granted." &&
          Platform.OS == "android"
        ) {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "",
              message:
                "Snitch needs to know your current location, so it could be sent to your contacts.",
              buttonPositive: "Request Permission",
              buttonNegative: "Decline",
            }
          );
        } else if (error.message == "No location provider available.")
          Alert.alert("You need to turn on your device's location", "", [
            { text: "Go to settings", onPress: () => Linking.openSettings() },
          ]);
      }
    );
  };

  render() {
    const {
      route: { params },
      navigation,
    } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ padding: 24 }}>
          <CustomButton
            text="Send Distress Mail"
            onPress={this.sendDistressMail}
          />
          <CustomButton
            text="View Contacts"
            onPress={() => navigation.setParams({ showModal: true })}
            style={styles.contactsButton}
          />

          <Modal transparent visible={!!params?.showModal}>
            {this.firstItem()}
            {this.secondItem()}
            {this.thirdItem()}
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
}
