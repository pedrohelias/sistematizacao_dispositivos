import Colors from "@/constants/Colors";
import { useAuth } from "@/src/contexts/AuthContext";
import { supabase } from "@/src/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Background } from "expo-router/build/react-navigation";
import { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile(){

    const {setAuth, user} = useAuth()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf,setCPF] = useState("");
    const [editName, setEditName] = useState(false);
    const [editCPF, setEditCPF] = useState(false);
    const nameInputRef = useRef<TextInput>(null);
    const cpfInputRef = useRef<TextInput>(null);



    //tudo que vai renderizar quando abrir a tela vai ficar no useEffect, preciso lembrar disso em futuros estudos. Mas ainda não funciona se só trocar de tela pelo menu

    useEffect(()=>{
        async function loadData() {
            try {
                if(!user?.id) 
                    //Alert.alert("Erro", "deu problema")
                    return;

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


    //salvar a altearação no supabase

    async function handleSaveDatabase(campo: "name" | "cpf", valor: string, setEdit: (val:boolean) => void ){

        if (!user) {
            Alert.alert("Erro", "Usuário não encontrado");
            return;
        }

        try{
            const {error} = await supabase.from("users").update({[campo]: valor}).eq("id", user.id);

            if (error) throw error;

            Alert.alert("Sucesso", "Perfil atualizado com os dados");
            setEdit(false);


        }catch (error: any){
            Alert.alert("Erro", "não foi possíve alterar")
            console.error(error.message);
        }
    }


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


    async function handleEditName(){
        if(editName){
            handleSaveDatabase("name", name, setEditName);
        }else{
            setEditName(true);
            setTimeout(()=>{
                nameInputRef.current?.focus();
            }, 100);
        }

    }

    async function handleEditCPF(){
        if(editCPF){
            handleSaveDatabase("cpf", cpf, setEditCPF);
        }else{
            setEditCPF(true);
            setTimeout(()=>{
                cpfInputRef.current?.focus();
            }, 100);
        }
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
                                <Text style={styles.nameText}>E-MAIL</Text>
                            </View>

                            <View style={styles.textInputArea}>

                                <View style={styles.inputContainer}>
                                    <Ionicons name="mail" size={24} color={Colors.black}/>
                                    <TextInput style={styles.textInputDesign} value={email} onChangeText={setEmail} editable={false}/>

                                   

                                </View>

                            </View>


                            <View style={styles.upperTextArea}>
                                <Text style={styles.nameText}>NOME</Text>
                            </View>

                            <View style={styles.textInputArea}>

                                <View style={styles.inputContainer}>
                                    <Ionicons style={styles.icon}name="person" size={24} color={Colors.black}/>
                                    <TextInput style={styles.textInputDesign} value={name} onChangeText={setName} editable={editName} ref={nameInputRef}  />

                                    <Pressable style={styles.bottonDesign} onPress={handleEditName}>
                                        <Ionicons name={editName ? "checkmark-outline" : "create"} size={24} color={editName ? "green" : "#593417"} />
                                        
                                    </Pressable>

                                </View>

                            </View>

        


                            <View style={styles.upperTextArea}>
                                <Text style={styles.nameText}>CPF</Text>
                            </View>

                            <View style={styles.textInputArea}>

                                <View style={styles.inputContainer}>
                                    <Ionicons name="document" size={24} color={Colors.black}/>
                                    <TextInput style={styles.textInputDesign} value={cpf} onChangeText={setCPF} editable={editCPF} keyboardType="numeric" ref={nameInputRef}/>

                                    <Pressable style={styles.bottonDesign} onPress={handleEditCPF}>
                                        <Ionicons name={editCPF ? "checkmark-outline" : "create"} size={24} color={editCPF ? "green" : "#593417"} />

                                    </Pressable>

                                </View>

                            </View>

                            <View style={styles.collections}>
                                <Text style={styles.textSubtitle}>COLEÇÕES ASSOCIADAS</Text>
                            </View>



                            <Pressable style={styles.logoff} onPress={handleSignOut}>
                                <Text style={styles.logoffText}>DESLOGAR</Text>
                            </Pressable>

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

    logoff: {
        width:"35%",
        height:45,
        
    
        backgroundColor:Colors.blue_botton,
        borderRadius:7,
    
        justifyContent:"center",
        alignItems:"center",
    
        marginBottom:15,

    },

    logoffText: {
        color: Colors.white
    }


});


