import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

type CellData = {
  id: string;
  text: string;
};

type Props = {
  onCellPress?: (cellId: string) => void;
};

const TABLE_ROWS = 20;
const TABLE_COLUMNS = 5;

const HourTable: React.FC<Props> = ({ onCellPress }) => {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);

  const data = Array(TABLE_ROWS * TABLE_COLUMNS)
    .fill(null)
    .map((_, index) => ({
      id: index.toString(),
      text: `Cell ${index + 1}`,
    }));

  const handleCellPress = (cellId: string) => {
    setSelectedCell(cellId);
    if (onCellPress) {
      onCellPress(cellId);
    }
  };

  const renderItem = ({ item }: { item: CellData }) => {
    const backgroundColor = item.id === selectedCell ? '#ccc' : '#fff';
    return (
      <TouchableOpacity
        onPress={() => handleCellPress(item.id)}
        style={[styles.cell, { backgroundColor }]}
      >
        <Text>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={TABLE_COLUMNS}
        keyExtractor={item => item.id}
        extraData={selectedCell}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cell: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default HourTable;
