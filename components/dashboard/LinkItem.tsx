import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useLinks } from '@/hooks/useLinks';
import { LinksOut } from '@/models/Dashboard/LinksOut';
import { FontAwesome } from '@expo/vector-icons';

interface LinkItemProps {
  item: LinksOut;
}

const LinkItem: React.FC<LinkItemProps> = ({ item }) => {
  const { links, setLinks } = useLinks();
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState(item.description);

  const handleDelete = (id: string) => {
    const updatedLinks = links.filter((link) => link._id !== id);
    setLinks(updatedLinks);
    // Add API call to delete the link from the server
  };

  const handleEdit = () => {
    if (editMode) {
      const updatedLinks = links.map((link) =>
        link._id === item._id ? { ...link, description } : link
      );
      setLinks(updatedLinks);
      // Add API call to update the description on the server
    }
    setEditMode(!editMode);
  };

  const handleImportantToggle = () => {
    const updatedLinks = links.map((link) =>
      link._id === item._id ? { ...link, boolImp: !link.boolImp } : link
    );
    setLinks(updatedLinks);
    // Add API call to update the importance status on the server
  };

  const handleBookmark = () => {
    // Handle adding to bookmarks logic here (e.g., save to a separate collection)
  };

  return (
    <View style={{ padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>
      <Text style={{ fontSize: 18 }}>{item.url}</Text>
      {editMode ? (
        <TextInput
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={{ borderColor: 'gray', borderWidth: 1, padding: 5, marginVertical: 5 }}
        />
      ) : (
        <Text>{item.description}</Text>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <TouchableOpacity onPress={() => handleDelete(item._id)}>
          <FontAwesome name="trash" size={24} color="#d9534f" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEdit}>
          <FontAwesome name={editMode ? 'save' : 'edit'} size={24} color={editMode ? '#5cb85c' : '#0275d8'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleImportantToggle}>
          <FontAwesome
            name={item.boolImp ? 'exclamation-circle' : 'exclamation'}
            size={24}
            color={item.boolImp ? '#f0ad4e' : '#ccc'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBookmark}>
          <FontAwesome name="bookmark" size={24} color="#5bc0de" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LinkItem;
