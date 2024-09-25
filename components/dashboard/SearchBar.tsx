import React from 'react';
import { TextInput, View } from 'react-native';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <TextInput
        placeholder="Search by URL..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 8,
        }}
      />
    </View>
  );
};

export default SearchBar;
