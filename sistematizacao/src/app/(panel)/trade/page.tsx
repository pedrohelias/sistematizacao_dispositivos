import { useAuth } from "@/src/contexts/AuthContext";
import { supabase } from "@/src/lib/supabase";
import { router } from "expo-router";
import { View, Text, StyleSheet, Button, Alert, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Trade(){

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
                            <Text>Página Trade</Text>
                            <Button title= "deslogar" onPress={handleSignOut}></Button>
                            <Button title= "ir pra pagina coleção" onPress={handleNexPage}></Button>
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

    }
    
});

