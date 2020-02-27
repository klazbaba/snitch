import { StyleSheet } from 'react-native';

import { colors } from '../colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32
  },
  subTitle: {
    fontSize: 18,
    marginTop: 8
  },
  svg: {
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  textContainer: {
    marginHorizontal: 16
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    borderRadius: 8,
    width: 200,
    alignSelf: 'center',
    marginTop: 64,
    zIndex: 1
  },
  buttonText: {
    fontSize: 16
  }
});
