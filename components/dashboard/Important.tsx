import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import LinkItem from './LinkItem';
import SearchBar from './SearchBar';
import { useLinks } from '@/hooks/useLinks';
const Important = () => {
  const { links } = useLinks();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter links marked as important and based on the search query
  const filteredLinks = links
    .filter((link) => link.boolImp === true)
    .filter((link) => link.url.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Important Links</Text>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FlatList
        data={filteredLinks}
        renderItem={({ item }) => <LinkItem item={item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default Important;
