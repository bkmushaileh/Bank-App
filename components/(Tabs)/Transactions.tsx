import { getTransaction } from "@/api/transaction";
import Ionicons from "@expo/vector-icons/Ionicons"; // icons from Expo
import DateTimePicker from "@react-native-community/datetimepicker";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Transaction = {
  _id: string;
  amount: number;
  type: string;
  from: string;
  to: string;
  createdAt: string;
};

const TransactionsScreen = () => {
  const [searchBar, setSearchBar] = useState("");
  const [amountSearch, setAmountSearch] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [showDateFrom, setShowDateFrom] = useState(false);
  const [showDateTo, setShowDateTo] = useState(false);

  const { data, isFetching, isSuccess } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: getTransaction,
  });

  if (isFetching) return <ActivityIndicator color="green" />;
  const filteredData = data?.filter((item) => {
    const itemDate = new Date(item.createdAt);
    const fromOK = !dateFrom || itemDate >= dateFrom;
    const toOK = !dateTo || itemDate <= dateTo;
    const amountOK = amountSearch
      ? item.amount.toString().includes(amountSearch)
      : true;
    const textOK = searchBar
      ? item.type.toLowerCase().includes(searchBar.toLowerCase())
      : true;

    return fromOK && toOK && amountOK && textOK;
  });

  const renderItem = ({ item }: { item: Transaction }) => {
    const isDeposit = item.type.toLowerCase() === "deposit";

    const formattedDate = new Date(item.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    let iconName: keyof typeof Ionicons.glyphMap = "repeat";
    let iconColor = "#3498db";

    if (isDeposit) {
      iconName = "arrow-down-circle";
      iconColor = "green";
    } else if (item.type.toLowerCase() === "withdraw") {
      iconName = "arrow-up-circle";
      iconColor = "#e74c3c";
    } else if (item.type.toLowerCase() === "transfer") {
      iconName = "swap-horizontal";
      iconColor = "green";
    }

    return (
      <View key={item._id} style={styles.card}>
        <View style={styles.row}>
          <Ionicons name={iconName} size={32} color={iconColor} />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text
              style={[
                styles.amount,
                isDeposit
                  ? styles.deposit
                  : item.type.toLowerCase() === "transfer"
                  ? styles.deposit
                  : styles.withdraw,
              ]}
            >
              {` ${item.amount} KWD`}
            </Text>
            <View style={styles.typeContainer}>
              <Text style={styles.type}>{item.type}</Text>
            </View>
          </View>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <View style={[styles.rowBetween, { marginTop: 12 }]}>
          <Text style={styles.account}>From: ****{item.from.slice(-4)}</Text>
          <Text style={styles.account}>To: ****{item.to.slice(-4)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <SearchBar
        placeholder="type here .."
        value={searchBar}
        onChangeText={(text) => setSearchBar(text)}
        lightTheme
        round
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.inputContainer}
      /> */}
      <TextInput
        placeholder="Search by amount"
        value={amountSearch}
        onChangeText={setAmountSearch}
        style={{
          backgroundColor: "#e0e0e0",
          padding: 8,
          borderRadius: 10,
          marginBottom: 12,
        }}
      />
      <View style={{ marginBottom: 16 }}>
        <Button
          title="From Date"
          onPress={() => setShowDateFrom(true)}
          color="green"
        />
        {showDateFrom && (
          <DateTimePicker
            value={dateFrom || new Date()}
            mode="date"
            display="default"
            onChange={(_event, selectedDate) => {
              setShowDateFrom(false);
              if (selectedDate) setDateFrom(selectedDate);
            }}
          />
        )}
        <View style={{ marginTop: 8 }}>
          <Button
            title="To Date"
            onPress={() => setShowDateTo(true)}
            color="green"
          />
          {showDateTo && (
            <DateTimePicker
              value={dateTo || new Date()}
              mode="date"
              display="default"
              onChange={(_event, selectedDate) => {
                setShowDateTo(false);
                if (selectedDate) setDateTo(selectedDate);
              }}
            />
          )}
        </View>

        <Text style={{ marginTop: 8, fontSize: 12, color: "#7f8c8d" }}>
          {dateFrom && `From: ${dateFrom.toDateString()} `}
          {dateTo && `To: ${dateTo.toDateString()}`}
        </Text>
      </View>

      {isSuccess && (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f3f7",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 7,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amount: {
    fontSize: 20,
    fontWeight: "700",
  },
  deposit: {
    color: "green",
  },
  withdraw: {
    color: "#e74c3c",
  },
  typeContainer: {
    marginTop: 4,
    backgroundColor: "#e0e5ec",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  type: {
    fontSize: 12,
    color: "#7f8c8d",
    textTransform: "capitalize",
    fontWeight: "500",
  },
  account: {
    fontSize: 13,
    color: "#95a5a6",
  },
  date: {
    fontSize: 12,
    color: "#95a5a6",
  },
  searchContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  inputContainer: {
    backgroundColor: "#e0e0e0",
  },
});

export default TransactionsScreen;
