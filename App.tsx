import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import { AuthContextProvider } from "./src/context/AuthContext";
import Routes from "./src/routes";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
    <AuthContextProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <Routes />
    </AuthContextProvider>
    </PaperProvider>
  );
}
