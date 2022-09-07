import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image } from 'react-native';

const Entry = () => {
    // React Native Styles
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        tinyLogo: {
            width: 300,
            height: 300,
          },
    });

    const [input, setInput] = useState("pikachu");
    const [name, setName] = useState("pikachu");
    const [id, setId] = useState(25);
    const [spriteUrl, setSpriteUrl] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png");
    const [likes, setLikes] = useState(0);

    changePokemon = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`)
        .then(response => response.json())
        .then(data => {
            setName(input);
            setId(data.id);
            setSpriteUrl(data.sprites.front_default);
        })

        // fetch current likes
    }

    likePokemon = () => {
        // increment likes
        // post pokemon api like
    }

    return (
        <View
            style={styles.container}>
            <Text>Hello, {name}!</Text>
            <Text>ID: {id}</Text>
            {/* Number of likes */}
            <Image style={styles.tinyLogo} source={{uri: spriteUrl}} />
            <TextInput onChangeText={setInput} value={input}/>
            <Button onPress={this.changePokemon} title="Search" />
            {/* like button? conditional rendering */}
        </View>
    )
}
export default Entry;