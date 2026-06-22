import Colors from "@/constants/Colors";
import { Color } from "expo-router";
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, Pressable, Alert} from "react-native";
import {Link} from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import { supabase } from "../lib/supabase";
import {router} from "expo-router"

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSignIn(){
        setLoading(true)
        
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if(error){
            Alert.alert("Error", error.message)
            setLoading(false);
            return;
        }

        setLoading(false)
        router.replace("/(panel)/profile/page")

    }


    return(

        <ImageBackground 
            source={require("../../images/fundoapp.jpeg")} 
            style={styles.background} 
            resizeMode="cover">
        
        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Image source={require("../../images/logo.png")} style={styles.logo} ></Image>
                <Text style={styles.logoText}>CARD MARKET</Text>
                

            </View>

            <View style={styles.formCard}>
                <Text style={styles.formCardTitle}> Acessar o Sistema</Text>

                <View style={styles.formEmail}>
                    <TextInput placeholder="Digite seu e-mail" style={styles.input} value={email} onChangeText={setEmail}></TextInput>
                </View>

                <View style={styles.formPassword}>
                    <TextInput placeholder="Digite sua senha" style={styles.input} secureTextEntry value={password} onChangeText={setPassword}></TextInput>
                    
                </View>

                <View style={styles.textForget}>
                    <Text style={styles.textForgetStyle}>esqueceu sua senha?</Text>
                </View>

                <View style={styles.formButton}>
                    <Pressable style={styles.pressable} onPress={handleSignIn} android_ripple={{ color: 'rgba(255, 255, 255, 0.3)' }}>
                        <Text style={styles.buttonStyle} >{loading? "Carregando...": "Acessar"}</Text>
                    </Pressable>
                </View>

                <View style={styles.orStyle}>
                    <Text>ou</Text>
                </View>

                <View style={styles.formButton}>
                    <Pressable style={styles.pressable} android_ripple={{ color: 'rgba(255, 255, 255, 0.3)' }}>
                        <Text style={styles.buttonStyleGoogle} >Entrar com Google</Text>
                    </Pressable>
                </View>

                <View style = {styles.lastTextStyle}>
                    <Text>Ainda não tem sua conta?<Link href={"/(auth)/signup/page"}><Text style={styles.lastPressable}> Cadastre-se</Text></Link></Text>
                </View>

            </View>
        </View>
        
        </ImageBackground>
        
        
    )

}


const styles = StyleSheet.create({

background:{
    flex:1,
    
},


container:{
    flex:1,
    alignItems:"center",
    paddingTop:170,
    
},


logoContainer:{
    alignItems:"center",
},


logo:{
    width:330,
    height:150,
    resizeMode:"contain",
},


logoText:{
    fontSize:20,
    fontWeight:"bold",
    color:Colors.brown_text,
    letterSpacing:5,
    marginTop:-35,
},


formCard:{
    width:"80%",
    backgroundColor:Colors.white_card,
    borderRadius:21,

    opacity:0.85,

    paddingVertical:30,
    paddingHorizontal:20,

    marginTop:30,

    alignItems:"stretch",
    minHeight:450,

},


formCardTitle: {
    width: "100%",
    fontSize: 24,
    fontWeight: "700",
    color: "#5b3218",
    paddingTop: 20,
    marginBottom: 20,
    textAlign: "center",
},

formEmail: {
    flexDirection: "row",
    alignItems: "center",
    

},

formPassword: {

},

formButton: {

},

input: {
    backgroundColor: Colors.white,
    width: "100%",
    height: 45, 
    borderWidth: 0.5,
    borderColor: "#999",
    paddingHorizontal: 15,
    fontSize: 14,
    borderRadius: 7,
    marginBottom: 15,
    //padding: 90,
    //paddingTop: 20,
},



pressable: {

    width:"100%",
    height:45,
    

    backgroundColor:Colors.blue_botton,
    borderRadius:7,

    justifyContent:"center",
    alignItems:"center",

    marginBottom:15,
    
},

buttonStyle: {
    color:Colors.white,
    fontSize: 14,

},

buttonStyleGoogle: {
    color:Colors.white,
    fontSize: 14,


},

textForget: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 15,

},

textForgetStyle: {
    color: Colors.signup_text,
    fontSize: 14,


},

orStyle: {
    width: "100%",
    marginBottom: 15,
    alignItems: "center",
},


lastTextStyle: {
    alignItems: "center",
    marginTop: 8,
},

lastPressable: {
    color: Colors.signup_text,
    fontSize: 14,

},

inputIcon: {
    marginRight: 10,
},
});
