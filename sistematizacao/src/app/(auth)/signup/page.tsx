import Colors from "@/constants/Colors";
import { Color, VectorIcon } from "expo-router";
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, Pressable, Alert, ScrollView, KeyboardAvoidingView, Platform} from "react-native";
import {router} from "expo-router";
import {Ionicons} from "@expo/vector-icons"
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {supabase} from "../../../lib/supabase"

function pageReturn(){ //funcao de retorno a tela anterior
    router.back()
};


export default function Signup(){

    const [name, setName] = useState("");
    const [cpf, setCPF] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


async function handleSignUp(){
    setLoading(true);
    const {data, error} = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                name: name,
                cpf: cpf 
            }
        }
    })

    if(error){
        Alert.alert("Error", error.message)
        setLoading(false);
        return;
    }

    setLoading(false);
    router.replace('/')


}

    return(

        <ImageBackground 
            source={require("../../../../images/fundoapp.jpeg")} 
            style={styles.background} 
            resizeMode="cover">
        
            <SafeAreaView style={{flex:1}}>
                <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}>
                <ScrollView style={{flex:1}} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <View style={styles.container}>

                        <Pressable style={styles.arrowback} onPress={pageReturn}>
                            <Ionicons name="arrow-back-circle-sharp" size={45}></Ionicons>
                        </Pressable>

                        <View style={styles.logoContainer}>
                            <Image source={require("../../../../images/logo.png")} style={styles.logo} ></Image>
                            <Text style={styles.logoText}>CARD MARKET</Text>
                            

                        </View>

                        <View style={styles.formCard}>
                            <Text style={styles.formCardTitle}> Cadastro </Text>

                            <View style={styles.formEmail}>
                                <TextInput placeholder="Digite seu nome" style={styles.input} value={name} onChangeText={setName} ></TextInput>
                            </View>

                            <View style={styles.formPassword}>
                                <TextInput placeholder="Digite seu CPF" style={styles.input} value={cpf} onChangeText={setCPF} ></TextInput>
                                
                            </View>

                            <View style={styles.formPassword}>
                                <TextInput placeholder="Digite seu e-mail" style={styles.input} value={email} onChangeText={setEmail} ></TextInput>
                                
                            </View>

                            <View style={styles.formPassword}>
                                <TextInput placeholder="Digite sua senha" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry></TextInput>
                                
                            </View>

                            <View style={styles.formButton}>
                                <Pressable style={styles.pressable} onPress={handleSignUp} android_ripple={{ color: 'rgba(255, 255, 255, 0.3)' }}>
                                    <Text style={styles.buttonStyleGoogle}>{
                                        loading? "Carregando...": "Cadastrar"}</Text>
                                </Pressable>
                            </View>

                        </View>
                    </View>
                </ScrollView> 
                </KeyboardAvoidingView>
            </SafeAreaView>

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
    paddingTop:135,
    paddingBottom: 40,
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

logoContainer:{
    alignItems:"center",
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
    marginTop: 22,
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
    marginBottom: 20,
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

arrowback: {
    position: "absolute",
    top: 10,               // dist pro top
    left: 30,              // dist pra esquerda
    zIndex: 10,            // Garante que a seta vai ficar em cima de qualquer fundo
    padding: 10,
},
});
