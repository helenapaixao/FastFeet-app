import { useMemo, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { Input, InputField } from "@/components/ui/input";

import DeliveryCard, { type Delivery } from "../../components/DeliveryCard";

const PENDING: Delivery[] = [
  { id: "p3", name: "Pacote 03", date: "01/07/2020", reached: 1 },
  { id: "p4", name: "Pacote 04", date: "01/07/2020", reached: 0 },
  { id: "p5", name: "Pacote 05", date: "01/07/2020", reached: 1 },
  { id: "p6", name: "Pacote 06", date: "01/07/2020", reached: 0 },
];

const DONE: Delivery[] = [
  { id: "p1", name: "Pacote 01", date: "01/07/2020", reached: 2 },
  { id: "p2", name: "Pacote 02", date: "01/07/2020", reached: 2 },
];

type TabKey = "pending" | "done";

export default function Dashboard() {
  const [tab, setTab] = useState<TabKey>("pending");
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const data = tab === "pending" ? PENDING : DONE;

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return data;
    return data.filter((item) => item.name.toLowerCase().includes(term));
  }, [data, search]);

  return (
    <Box className="flex-1 bg-brand-surface">
      <Box className="bg-brand-purple px-6 pb-11 pt-4">
        <SafeAreaView edges={["top"]}>
          <HStack className="items-start justify-between">
            <Text className="font-[Roboto_400Regular] text-sm text-brand-lilac">
              Bem vindo,{"\n"}
              <Text className="font-[Roboto_500Medium] text-sm text-white">
                Tiago Luchtenberg
              </Text>
            </Text>
            <Pressable className="h-7 w-7 items-center justify-center rounded-md bg-white/10">
              <Feather name="log-out" size={16} color="#FFC042" />
            </Pressable>
          </HStack>

          <HStack className="mt-6 items-center justify-between">
            <Text className="font-[Roboto_700Bold] text-[28px] text-white">
              Entregas
            </Text>
            <HStack className="items-center">
              <Feather name="map-pin" size={16} color="#FFC042" />
              <Text className="ml-1.5 font-[Roboto_400Regular] text-sm text-white">
                Rio do Sul
              </Text>
            </HStack>
          </HStack>
        </SafeAreaView>
      </Box>

      <Input className="-mt-6 mx-6 h-[52px] rounded-lg border border-[#ECEBF1] bg-white px-4">
        <InputField
          placeholder="Filtrar por bairro"
          placeholderTextColor="#BEBCCC"
          className="flex-1 font-[Roboto_400Regular] text-[15px] text-brand-gray100"
          value={search}
          onChangeText={setSearch}
        />
        <Feather name="search" size={20} color="#4C33CC" />
      </Input>

      <Text className="my-4 text-center font-[Roboto_400Regular] text-xs text-brand-gray300">
        {filtered.length} entregas
      </Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Box className="px-6">
            <DeliveryCard
              delivery={item}
              onPressDetails={() => navigation.navigate("Details")}
            />
          </Box>
        )}
      />

      <HStack className="border-t border-[#ECEBF1] bg-white">
        <Pressable
          className={`flex-1 items-center border-t-2 pb-6 pt-4 ${
            tab === "pending" ? "border-brand-purple" : "border-transparent"
          }`}
          onPress={() => setTab("pending")}
        >
          <Text
            className={`text-[15px] ${
              tab === "pending"
                ? "font-[Roboto_500Medium] text-brand-purple"
                : "font-[Roboto_400Regular] text-brand-gray200"
            }`}
          >
            Pendentes
          </Text>
        </Pressable>
        <Pressable
          className={`flex-1 items-center border-t-2 pb-6 pt-4 ${
            tab === "done" ? "border-brand-purple" : "border-transparent"
          }`}
          onPress={() => setTab("done")}
        >
          <Text
            className={`text-[15px] ${
              tab === "done"
                ? "font-[Roboto_500Medium] text-brand-purple"
                : "font-[Roboto_400Regular] text-brand-gray200"
            }`}
          >
            Feitas
          </Text>
        </Pressable>
      </HStack>
    </Box>
  );
}
