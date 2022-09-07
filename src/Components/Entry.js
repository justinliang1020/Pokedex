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

    changePokemon = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`)
        .then(response => response.json())
        .then(data => {
            setName(input);
            setId(data.id);
            setSpriteUrl(data.sprites.front_default);
        })
    }

    return (
        <View
            style={styles.container}>
            <Text>Hello, {name}!</Text>
            <Text>ID: {id}</Text>
            <Image style={styles.tinyLogo} source={{uri: spriteUrl}} />
            <TextInput onChangeText={setInput} value={input}/>
            <Button onPress={this.changePokemon} title="Search" />
        </View>
    )
}
export default Entry;