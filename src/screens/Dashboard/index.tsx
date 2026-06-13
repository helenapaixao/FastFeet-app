import { useMemo, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import DeliveryCard, { type Delivery } from "../../components/DeliveryCard";

import {
  Container,
  Header,
  TopRow,
  Greeting,
  UserName,
  LogoutButton,
  TitleRow,
  Title,
  Location,
  LocationText,
  SearchBar,
  SearchInput,
  Count,
  List,
  TabBar,
  Tab,
  TabText,
} from "./styles";

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
    <Container>
      <Header>
        <SafeAreaView edges={["top"]}>
          <TopRow>
            <Greeting>
              Bem vindo,{"\n"}
              <UserName>Tiago Luchtenberg</UserName>
            </Greeting>
            <LogoutButton activeOpacity={0.7}>
              <Feather name="log-out" size={16} color="#FFC042" />
            </LogoutButton>
          </TopRow>

          <TitleRow>
            <Title>Entregas</Title>
            <Location>
              <Feather name="map-pin" size={16} color="#FFC042" />
              <LocationText>Rio do Sul</LocationText>
            </Location>
          </TitleRow>
        </SafeAreaView>
      </Header>

      <SearchBar>
        <SearchInput
          placeholder="Filtrar por bairro"
          placeholderTextColor="#BEBCCC"
          value={search}
          onChangeText={setSearch}
        />
        <Feather name="search" size={20} color="#4C33CC" />
      </SearchBar>

      <Count>{filtered.length} entregas</Count>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <List>
            <DeliveryCard
              delivery={item}
              onPressDetails={() => navigation.navigate("Details")}
            />
          </List>
        )}
      />

      <TabBar>
        <Tab
          $active={tab === "pending"}
          activeOpacity={0.8}
          onPress={() => setTab("pending")}
        >
          <TabText $active={tab === "pending"}>Pendentes</TabText>
        </Tab>
        <Tab
          $active={tab === "done"}
          activeOpacity={0.8}
          onPress={() => setTab("done")}
        >
          <TabText $active={tab === "done"}>Feitas</TabText>
        </Tab>
      </TabBar>
    </Container>
  );
}
