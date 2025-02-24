import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const API_KEY = 'YOUR_OPENWEATHER_API_KEY';

export default function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const fetchWeather = async () => {
        if (!city) return;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        setWeather(data);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>React Native Weather App</Text>
            <TextInput style={styles.input} placeholder="Enter city" value={city} onChangeText={setCity} />
            <Button title="Get Weather" onPress={fetchWeather} />
            {weather && (
                <View style={styles.result}>
                    <Text>Temperature: {weather.main.temp}°C</Text>
                    <Text>Condition: {weather.weather[0].description}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    input: { borderWidth: 1, padding: 10, width: '80%', marginBottom: 10 },
    result: { marginTop: 20, alignItems: 'center' }
});