import 'react-native-gesture-handler/jestSetup';
jest.mock('react-native-webview', () => {
  const { View } = require('react-native');
  return {
    WebView: View,
  };
});
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => {
  const turboModuleRegistry = jest.requireActual(
    'react-native/Libraries/TurboModule/TurboModuleRegistry',
  )
  return {
    ...turboModuleRegistry,
    getEnforcing: (name) => {
      if (name === 'RNCWebView') {
        return null
      }
      return turboModuleRegistry.getEnforcing(name)
    },
  }
})
// jest.mock('react-native-webview', () => ({
//   default: () => jest.fn() // or any mocked component instead of native view,
// }));

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});