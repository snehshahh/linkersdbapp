import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import LinkItem from './LinkItem';
import SearchBar from './SearchBar';
import { useLinks } from '@/hooks/useLinks';

const Recents = () => {
  const { links } = useLinks();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter links based on today's date and search query
  const filteredLinks = links
    .filter((link) => new Date(link.createdAt).toDateString() === new Date().toDateString())
    .filter((link) => link.url.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Recent Links</Text>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FlatList
        data={filteredLinks}
        renderItem={({ item }) => <LinkItem item={item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default Recents;
