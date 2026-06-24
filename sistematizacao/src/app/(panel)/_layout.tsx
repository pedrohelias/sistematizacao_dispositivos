import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";


export default function PanelLayout(){

    return(
        <Tabs
        screenOptions={{
            headerShown:false,

            tabBarStyle:{
                backgroundColor:Colors.tab_color_primary,
                height:100,
            },

            tabBarActiveTintColor:"#000000",
            tabBarInactiveTintColor:Colors.brown_text,
        }}
        >

             <Tabs.Screen
            name="root/page"
            options={{
                title:"INÍCIO",

                tabBarIcon:({color})=>(
                    <Ionicons
                        name="compass"
                        size={24}
                        color={color}
                    />
                )
            }}
            />


            <Tabs.Screen
            name="collection/page"
            options={{
                title:"COLEÇÃO",

                tabBarIcon:({color})=>(
                    <Ionicons
                        name="albums"
                        size={24}
                        color={color}
                    />
                )
            }}
            />


            <Tabs.Screen
            name="market/page"
            options={{
                title:"MERCADO",

                tabBarIcon:({color})=>(
                    <Ionicons
                        name="cart"
                        size={24}
                        color={color}
                    />
                )
            }}
            />

            <Tabs.Screen
            name="trade/page"
            options={{
                title:"BAZAR",

                tabBarIcon:({color})=>(
                    <Ionicons
                        name="storefront"
                        size={24}
                        color={color}
                    />
                )
            }}
            />

            <Tabs.Screen
            name="profile/page"
            options={{
                title:"PERFIL",

                tabBarIcon:({color})=>(
                    <Ionicons
                        name="person"
                        size={24}
                        color={color}
                      />
            )
        }}
        />

        </Tabs>

    )

}