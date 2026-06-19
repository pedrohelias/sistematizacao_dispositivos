import Colors from "@/constants/Colors";
import { Background } from "expo-router/build/react-navigation";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";

export default function Login(){
    return(

        <ImageBackground 
            source={require("../../images/fundoapp.jpeg")} 
            style={styles.background} 
            resizeMode="cover">

            <View style={styles.logoContainer}>
                <Image source={require("../../images/logo.png")} style={styles.logo} ></Image>
                <Text style={styles.logoText}>CARD MARKET</Text>
                

            </View>
            
        
        </ImageBackground>
        
        
    )

}


const styles = StyleSheet.create({

    logoContainer: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        paddingHorizontal:30,
        marginBottom:360,
    },
  
    background:{
        flex:1,
        width:"100%",
        height:"100%",
    },
    logo: {
      width:330,
      height:200,
      resizeMode:"contain",
      marginBottom:1,
    },
    logoText:{
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.brown_text,
        marginTop: -40,
        letterSpacing: 5,
    }
});

