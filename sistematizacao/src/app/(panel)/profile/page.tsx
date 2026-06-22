import { useAuth } from "@/src/contexts/AuthContext";
import { supabase } from "@/src/lib/supabase";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

export default function Profile(){

    const {setAuth} = useAuth()


    async function handleSignOut() {
        const {error} = await supabase.auth.signOut()
        setAuth(null)
        
        if(error){
            Alert.alert("Error", "Erro ao sair da conta")
            return 
        }
    }


    return(
        <View style={styles.container}>
            <Text>Página Perfil</Text>
            <Button title= "deslogar" onPress={handleSignOut}></Button>
        </View>
        
    )

}


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    }
    
});

