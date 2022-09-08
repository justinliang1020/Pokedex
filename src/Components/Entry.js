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
    const [initialized, setInitialized] = useState(false);

    // change default values
    const [name, setName] = useState("pikachu");
    const [id, setId] = useState(25);
    const [spriteUrl, setSpriteUrl] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png");
    const [likes, setLikes] = useState(0);

    changePokemon = () => {
        var parsedInput = input.toLowerCase();
        fetch(`https://pokeapi.co/api/v2/pokemon/${parsedInput}`)
            .then(response => response.json())
            .then(data => {
                setName(parsedInput);
                setId(data.id);
                setSpriteUrl(data.sprites.front_default);
            })

        // fetch current likes
        fetch(`https://wpixe6o7vb.execute-api.us-east-2.amazonaws.com/items/${parsedInput}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (Object.keys(data).length == 0) {
                    console.log("Pokemon not in database");
                    setLikes(0);
                } else {
                    console.log("Likes:", data.Item.likes);
                    setLikes(data.Item.likes);
                }

            })
    }

    if (!initialized) {
        changePokemon();
        setInitialized(true);
    }

    // have "initialize" variable and only call when not initialized

    likePokemon = () => {
        // increment likes
        // post pokemon api like
        newLikes = likes + 1;
        // add pokemon to database
        fetch(`https://wpixe6o7vb.execute-api.us-east-2.amazonaws.com/items`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pokemon: name,
                likes: newLikes
            })
        }).then(response => response.json())
            .then(data => console.log(data));
        setLikes(newLikes);
    }

    return (
        <View
            style={styles.container}>
            <Text>Hello, {name}!</Text>
            <Text>ID: {id}</Text>
            <Text>Likes: {likes}</Text>
            <Image style={styles.tinyLogo} source={{ uri: spriteUrl }} />
            <TextInput onChangeText={setInput} value={input} />
            <Button onPress={this.changePokemon} title="Search" />
            <Button onPress={this.likePokemon} title="Like" />
        </View>
    )
}
export default Entry;