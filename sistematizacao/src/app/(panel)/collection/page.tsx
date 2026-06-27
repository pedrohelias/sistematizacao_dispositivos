import Colors from "@/constants/Colors";
import { useAuth } from "@/src/contexts/AuthContext";
import { supabase } from "@/src/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Pressable, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Collection(){

    const {setAuth, user} = useAuth()
    const [searchText, setSearchText] = useState("")
    const [myCards, setMyCards] = useState<any[]>([])
    //const [loading, setLoading] = useState(false);



    useEffect(() => {
        if (user?.id) {
            fetchUserCards();
        }
    }, [user]);

    
    async function fetchUserCards(){

        if (!user?.id) return;

        try {
            const {data, error} = await supabase.from("user_cards").select(
                `
                    id,
                    quantity,
                    cards (
                        id,
                        name,
                        image_url,
                        rarity,
                        color
                    )
                `
            ).eq("user_id", user?.id).order("created_at", {ascending:false})

            if (error) throw error;
            //Alert.alert("Sucesso", "Dados carregados com sucesso");
            setMyCards(data || []);

        }catch(error:any){

            Alert.alert("Erro", "Não foi possível carregar sua coleção: " + error.message);
    

        }
    }


    async function handleAddCard() {
        if (!searchText.trim()) {
            Alert.alert("Aviso", "Digite o nome de uma carta!");
            return;
        }

        try {
            const { data: cardData, error: cardError } = await supabase
                .from("cards")
                .select("*")
                .ilike("name", searchText.trim()) 
                .maybeSingle();

            if (cardError || !cardData) {
                Alert.alert("Erro", "Carta não encontrada na base de dados geral.");
                return;
            }

            const { data: existingUserCard, error: checkError } = await supabase
                .from("user_cards")
                .select("*")
                .eq("user_id", user?.id)
                .eq("card_id", cardData.id)
                .maybeSingle();

            if (existingUserCard) {
                const { error: updateError } = await supabase
                    .from("user_cards")
                    .update({ quantity: existingUserCard.quantity + 1 })
                    .eq("id", existingUserCard.id);

                if (updateError) throw updateError;
            } else {
                const { error: insertError } = await supabase
                    .from("user_cards")
                    .insert([
                        {
                            user_id: user?.id,
                            card_id: cardData.id,
                            quantity: 1
                        }
                    ]);

                if (insertError) throw insertError;
            }

            Alert.alert("Sucesso", `"${cardData.name}" foi adicionada à sua coleção!`);
            setSearchText(""); 
            fetchUserCards();  

        } catch (error: any) {
            Alert.alert("Erro", "Falha ao adicionar carta: " + error.message);
        }
    }

    async function handleDeleteCard(id:any, cardName:any) {
    Alert.alert(
        "Remover Carta",
        `Tem certeza que deseja remover "${cardName}" da sua coleção?`,
        [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Remover",
                style: "destructive",
                onPress: async () => {
                    try {
                        const { error } = await supabase
                            .from("user_cards")
                            .delete()
                            .eq("id", id);

                        if (error) throw error;

                        // Atualiza a lista na tela tirando a carta deletada
                        setMyCards(prevCards => prevCards.filter(card => card.id !== id));
                    } catch (error: any) {
                        Alert.alert("Erro", "Não foi possível deletar a carta: " + error.message);
                    }
                }
            }
        ]
            );
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
               
        router.replace("/(panel)/profile/page")
        
    }


    return (
    <ImageBackground source={require("../../../../images/fundoapp.jpeg")} style={styles.background} resizeMode="cover">
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                
                <FlatList //vai ser melhor que usar scroll list, pra listagem de itens
                    data={myCards}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                    keyboardShouldPersistTaps="handled"
                    
                    ListHeaderComponent={
                        <View style={styles.container}>
                            <View style={styles.upperText}>
                                <Text style={styles.perfilText}>COLEÇÃO</Text>
                            </View>
                            
                            <View style={styles.addItensView}>
                                <TextInput style={styles.inputTextAddCard} placeholder="Adicionar Cartas" value={searchText} onChangeText={setSearchText}
                                />
                                <Pressable style={styles.addButton} onPress={handleAddCard}>
                                     <Ionicons name="add-circle" size={24} color={Colors.black} />
                                </Pressable>
                            </View>

                            <View style={styles.filtersView}>
                                <View style={styles.lineComponent}>
                                    <Text style={styles.textSubtitle}>FILTROS</Text>
                                </View>
                                <View style={styles.filtersSession}>
                                    <Pressable style={styles.filterButton}><Text style={styles.addItensText}>COR</Text></Pressable>
                                    <Pressable style={styles.filterButton}><Text style={styles.addItensText}>RARIDADE</Text></Pressable>
                                    <Pressable style={styles.filterButton}><Text style={styles.addItensText}>CUSTO</Text></Pressable>
                                </View>
                            </View>

                            <View style={styles.cardsView}>
                                <View style={styles.lineComponent}>
                                    <Text style={styles.textSubtitle}>CARTAS</Text>
                                </View>
                            </View>
                        </View>
                    }
                    
                    //numColumns={3}
                    //columnWrapperStyle={styles.rowCards}
                    
                    renderItem={({ item }) => (
                        <View style={styles.cardViewDisplayer}>
                            <View style={[styles.cardItemSimple, { backgroundColor: item.cards?.color }]} >
                                <View style={styles.viewQtd}>
                                    <Text style={styles.cardQtySimple}>
                                         x{item.quantity}
                                    </Text>
                                </View>
                                <View style={styles.viewName}>
                                    <Text style={styles.cardNameSimple} numberOfLines={1}>
                                        {item.cards?.name || "Sem Nome"}
                                    </Text>
                                </View>
                                
                                <View style={styles.viewTrash}>
                                    <Pressable onPress={() => handleDeleteCard(item.id, item.cards?.name)}>
                                        <Ionicons name="trash" size={24} color="#F5E6C8"></Ionicons>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    )}
                />

            </KeyboardAvoidingView>
        </SafeAreaView>
    </ImageBackground>
);

}


const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        width: "100%",
        alignItems: "center",
    },
    upperText: {
        marginTop: 10,
        paddingTop: 5,
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
    },
    perfilText: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.brown_text,
    },
    addItensView: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        backgroundColor: Colors.white,
        borderRadius: 8,
        height: 50,
        overflow: "hidden", 
    },
    inputTextAddCard: {
        flex: 1,
        height: "100%",
        backgroundColor: Colors.white,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    addButton: {
        width: "15%",
        height: "100%",
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
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
        width: "90%",
        justifyContent: "space-between",
    },
    filterButton: {
        width: "30%",
        height: 45,
        borderColor: Colors.black,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: Colors.blue_botton,
        justifyContent: "center",
        alignItems: "center",
    },
    addItensText: {
        color: Colors.white,
        fontWeight: "700",
    },
    cardsView: {
        width: "100%",
        alignItems: "center",
    },
    
    cardViewDisplayer: {
        alignItems: "center",
        

    },
    rowCards: {
        justifyContent: "flex-start",
        paddingHorizontal: "5%",
    },
    cardItemSimple: {
        width: "87%",
        height: 42,
        marginBottom: 3,
        borderRadius: 6,
        overflow: "hidden",
        flexDirection: "row",
        alignItems: "center",
},

    cardNameSimple: {
        fontSize: 15,
        fontWeight: "700",
        color: Colors.white,
        textAlign: "center",
        fontFamily: "sans-serif"

    },
    cardQtySimple: {
        fontSize: 20,
        fontWeight: "600",
        color: Colors.white_card,
        marginTop: 4,
        //opacity: 0.8,
        
    },

    viewQtd:{
        height: "100%",
        width: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.black,

    },
    viewName:{
        //borderWidth: 1,
        height: 40.5,
        width: 280,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: 5,



    },
    viewTrash:{
        height: "100%",
        width: 40,
        backgroundColor: "#593417",
        justifyContent: "center",
        alignItems: "center",
    },
});
