import Colors from "@/constants/Colors";
import { useAuth } from "@/src/contexts/AuthContext";
import { supabase } from "@/src/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Background } from "expo-router/build/react-navigation";
import { use, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile(){

    const {setAuth, user} = useAuth()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf,setCPF] = useState("");


    //tudo que vai renderizar quando abrir a tela vai ficar no useEffect, lembrar disso em futuros estudos

    useEffect(()=>{
        async function loadData() {
            try {
                if(!user?.id) return;

                    const {data, error} = await supabase.from("users").select("name, cpf").eq("id",user.id).single();

                    if (error) throw error;

                    setName(data?.name || "");
                    setCPF(data?.cpf || "");
                    setEmail(user?.email || "" );


                }catch (error:any) {
                    Alert.alert("Erro", "naõ foi possível obter os dados");
                    console.error(error.message);

                }
            } loadData();
        }, [user]);

    async function handleSignOut() {
        const {error} = await supabase.auth.signOut()
        setAuth(null)

        if(error){
            Alert.alert("Error", "Erro ao sair da conta")
            return 
        }
    }

    async function handleNexPage(){
           
            router.replace("/(panel)/collection/page")
    
    }



    return(


         <ImageBackground source={require("../../../../images/fundoapp.jpeg")} style={styles.background} resizeMode="cover">
            <SafeAreaView style={{flex:1}}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}style={{ flex: 1 }}>
                    <ScrollView style={{flex:1}} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

                        <View style={styles.container}>
                            <View style={styles.upperText}>
                                <Text style={styles.perfilText}>PERFIL</Text>
                            </View>

                            <View style={styles.lineComponent}>
                                <Text style={styles.textSubtitle}>DADOS</Text>
                            </View>


                            <View style={styles.upperTextArea}>
                                <Text style={styles.nameText}>NOME</Text>
                            </View>

                            <View style={styles.textInputArea}>

                                <View style={styles.inputContainer}>
                                    <Ionicons style={styles.icon}name="person" size={24} color={Colors.black}/>
                                    <TextInput style={styles.textInputDesign} value={name} onChangeText={setName} />

                                    <Pressable style={styles.bottonDesign}>
                                        <Ionicons name="create" size={24} color={Colors.black} />
                                    </Pressable>

                                </View>

                            </View>

                            <View style={styles.upperTextArea}>
                                <Text style={styles.nameText}>E-MAIL</Text>
                            </View>

                            <View style={styles.textInputArea}>

                                <View style={styles.inputContainer}>
                                    <Ionicons name="mail" size={24} color={Colors.black}/>
                                    <TextInput style={styles.textInputDesign} value={email} onChangeText={setEmail}/>

                                    <Pressable style={styles.bottonDesign}>
                                        <Ionicons name="create" size={24} color={Colors.black} />
                                    </Pressable>

                                </View>

                            </View>


                            <View style={styles.upperTextArea}>
                                <Text style={styles.nameText}>CPF</Text>
                            </View>

                            <View style={styles.textInputArea}>

                                <View style={styles.inputContainer}>
                                    <Ionicons name="document" size={24} color={Colors.black}/>
                                    <TextInput style={styles.textInputDesign} value={cpf} onChangeText={setCPF} />

                                    <Pressable style={styles.bottonDesign}>
                                        <Ionicons name="create" size={24} color={Colors.black} />
                                    </Pressable>

                                </View>

                            </View>

                            <View style={styles.collections}>
                                <Text style={styles.textSubtitle}>COLEÇÕES ASSOCIADAS</Text>
                            </View>


                            <Button title= "deslogar" onPress={handleSignOut}></Button>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
        
    )

}


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        
    },

    background: {
        flex: 1,

    },

    icon: {
        color: "#33333"
    },
    
    upperText: {
        marginTop: -10,
        paddingTop: 5,
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
        position: "relative",
    },

    perfilText:{
        fontSize: 24,
        fontWeight: "700",
        color: Colors.brown_text


    },

    subtitle: {
        
    },

    textSubtitle: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.brown_text,
        
    },

    lineComponent: {
        borderBottomColor: '#593417', 
        borderBottomWidth: 3,         
        opacity: 0.7,                 
        marginVertical: 15,           
        width: "90%",

    },

    upperTextArea: {
        width: "100%",
        alignItems: "flex-start",
        marginLeft: 40,


    },

    bottonDesign:{
        paddingRight: 10 ,
    },


    textInputArea: {
        width: "100%",
        alignItems: "center",
        marginBottom: 30,
    },

    inputContainer: {
        width: "90%",
        height: 45,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.white_card,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: Colors.white,
        paddingHorizontal: 12,
    },

   

    nameText: {
        alignItems: "flex-start",
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 5,

    },

     textInputDesign: {
        width: "89%",
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: Colors.white_card,
        borderColor: Colors.white_card,
        
    },

    emailArea: {

    },

    cpfArea: {

    },

    collections: {
      borderBottomColor: '#593417', // Cor marrom combinando com o mapa antigo
      borderBottomWidth: 3,         // Espessura de 1 pixel
      opacity: 0.7,                 // Deixa ela suave/semi-transparente
      marginVertical: 15,           // Espaçamento,
      width: "90%",
      marginTop: 50,

    },
});


