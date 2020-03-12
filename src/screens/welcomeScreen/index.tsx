import React, { Component } from "react";
import { View, SafeAreaView } from "react-native";
import Svg, { Path } from "react-native-svg";

import { styles } from "./styles";
import CustomText from "../_components/customText";
import CustomButton from "../_components/CustomButton";
import { colors } from "../colors";

interface Props {
  navigation: any;
}

export default class WelcomeScreen extends Component<Props> {
  gotoSetup = () => this.props.navigation.navigate("SetupScreen");

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.textContainer}>
          <CustomText text={"Hello, welcome to Snitch."} style={styles.title} />
          <CustomText
            text="We help your loved ones find you in case you illegally got picked up."
            style={styles.subTitle}
          />
          <CustomButton
            text="Get Started"
            style={styles.button}
            textStyle={styles.buttonText}
            onPress={this.gotoSetup}
          />
        </View>

        <Svg
          width={310}
          height={275}
          viewBox="0 0 198 177"
          style={{ position: "absolute", left: 0, bottom: 0 }}
          {...this.props}
        >
          <Path
            d="M0-33v210h239c-84.396.96-145.73-15.373-184-49C16.73 94.373-1.604 40.706 0-33z"
            fill={colors.green}
            fillRule="evenodd"
          />
        </Svg>
      </SafeAreaView>
    );
  }
}
