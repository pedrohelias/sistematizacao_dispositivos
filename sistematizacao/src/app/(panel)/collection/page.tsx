import Colors from "@/constants/Colors";
import { useAuth } from "@/src/contexts/AuthContext";
import { supabase } from "@/src/lib/supabase";
import { router } from "expo-router";
import { View, Text, StyleSheet, Button, Alert, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Collection(){

    const {setAuth} = useAuth()


    async function handleSignOut() {
        const {error} = await supabase.auth.signOut()
        setAuth(null)

        if(error){
            Alert.alert("Error", "Erro ao sair da conta")
            return 
        }
    }

     async function handleNexPage(){
               
        router.replace("/(panel)/profile/page")
        
    }


    return(


         <ImageBackground source={require("../../../../images/fundoapp.jpeg")} style={styles.background} resizeMode="cover">
            <SafeAreaView style={{flex:1}}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}style={{ flex: 1 }}>
                    <ScrollView style={{flex:1}} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

                        <View style={styles.container}>
                            <View style={styles.upperText}>
                                <Text style={styles.perfilText}>COLEÇÃO</Text>
                            </View>
                            
                            <View style={styles.addItensView}>
                                <Pressable style={styles.addButton}>
                                    <Text style={styles.addItensText}>Adicionar</Text>
                                </Pressable>
                                
                                <TextInput style={styles.inputTextAddCard}>

                                </TextInput>

                            </View>

                            <View style={styles.filtersView}>

                                <View style={styles.lineComponent}>
                                    <Text style={styles.textSubtitle}>FILTROS</Text>
                                </View>

                                <View style={styles.filtersSession}>

                                    <Pressable style={styles.filterButton}>
                                        <Text style={styles.addItensText}>COR</Text>
                                    </Pressable>

                                    <Pressable style={styles.filterButton}>
                                        <Text style={styles.addItensText}>RARIDADE</Text>
                                    </Pressable>

                                    <Pressable style={styles.filterButton}>
                                        <Text style={styles.addItensText}>CUSTO</Text>
                                    </Pressable>

                                </View>

                            </View>

                            <View style={styles.cardsView}>
                                <View style={styles.lineComponent}>
                                    <Text style={styles.textSubtitle}>CARTAS</Text>
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
    container: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    },

    background: {
        flex: 1,

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

    addItensView: {
        width: "90%",
        alignItems: "center",


    },

    addButton: {
        width:"30%",
        height:45,
        borderColor: Colors.black,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: Colors.blue_botton,
        marginBottom: 10,
        //marginLeft: 10,
        //alignItems: "flex-end"
        justifyContent:"center",
        alignItems:"center",
        
        
        
    },

    addItensText: {
        color: Colors.white,
        
    },

    inputTextAddCard: {

        backgroundColor: Colors.white,
        width: "95%",

    },

    filtersView: {
        width: "100%",
        alignItems: "center",
    },

    textSubtitle: {
        width: "80%",
        fontSize: 14,
        fontWeight: "700",
        color: Colors.brown_text,
        
    },

    lineComponent: {
        borderBottomColor: '#593417', 
        borderBottomWidth: 3,         
        opacity: 0.7,                 
        marginVertical: 20,           
        width: "90%",

    },

    filtersSession: {
        flexDirection: "row",
        //justifyContent: "space-between",
    },

    filterButton: {
        width:"25%",
        height:45,
        borderColor: Colors.black,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: Colors.blue_botton,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 5,
        //alignItems: "flex-end"  
        justifyContent:"center",
        alignItems:"center",
    },
    
    cardsView: {
        width: "100%",
        alignItems: "center",
    },
});

