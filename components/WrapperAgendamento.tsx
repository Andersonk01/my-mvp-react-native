import { StyleSheet, ImageSourcePropType } from "react-native";
import React from "react";
import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import ParallaxScrollView from "./ParallaxScrollView";
// import { useThemeColor } from "@/hooks/useThemeColor";

type boxProps = {
  name: string;
  onClick?: () => void;
};

export function WrapperAgendamento({ name = "", onClick }: boxProps & ImageSourcePropType) {
  // const themeColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')
  // console.log(themeColor)

  return (
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#1D3D47', dark: '#fff' }}
    // // headerImage={<Ionicons name="logo-instagram" />}
    // // style={styles.wrapper}
    // >
    <TouchableOpacity onPress={onClick} style={styles.wrapper}>
      <View style={styles.textBox}>
        <Text style={styles.text}>{name}</Text>
      </View>

      <View style={styles.icon}>
        <Ionicons name="arrow-redo" size={20} color={"gray"} />
      </View>
    </TouchableOpacity >

    // </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderColor: "#00000080",
    borderRadius: 8,

    marginBottom: 4,
    backgroundColor: "white",

    flexDirection: "row",
    padding: 4,
  },
  textBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 32,
  },
  icon: {
    position: "absolute",
    top: 0,
    right: 4,
    height: "100%",
    // backgroundColor: "red",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

