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
  const [amountSearch, setAmountSearch] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [showDateFrom, setShowDateFrom] = useState(false);
  const [showDateTo, setShowDateTo] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

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

    const typeOK = typeFilter ? item.type.toLowerCase() === typeFilter : true;

    return fromOK && toOK && amountOK && typeOK;
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
      <TextInput
        placeholder="Search by amount"
        placeholderTextColor="#999"
        value={amountSearch}
        onChangeText={setAmountSearch}
        keyboardType="numeric"
        style={styles.searchBox}
      />
      <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
        <View style={{ flex: 1 }}>
          <Button
            title="From"
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
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title="To"
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        {["All", "Deposit", "Withdraw", "Transfer"].map((type) => (
          <Button
            key={type}
            title={type}
            color={
              typeFilter === type.toLowerCase()
                ? type.toLowerCase() === "withdraw"
                  ? "#e74c3c"
                  : "green"
                : "#95a5a6"
            }
            onPress={() =>
              setTypeFilter(type === "All" ? null : type.toLowerCase())
            }
          />
        ))}
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
  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  datePicker: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 14,
    textAlign: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
});

export default TransactionsScreen;
