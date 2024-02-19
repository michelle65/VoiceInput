import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Voice from '@react-native-voice/voice';

const VoiceInput = () => {
    const [results, setResults] = React.useState([]);
    const [errors, setErrors] = React.useState([]); // Changed to array
    const [isRecording, setIsRecording] = React.useState(false);

    useEffect(() => {
        Voice.onSpeechStart = () => setIsRecording(true);
        Voice.onSpeechEnd = () => setIsRecording(false);
        Voice.onSpeechResults = (event) => setResults(event.value);
        Voice.onSpeechError = (err) => {
            setErrors((prevErrors) => [...prevErrors, err.error]); // Add new error to the array
        };

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const startRecording = async () => {
        try {
            await Voice.start('en-US');
        } catch (error) {
            setErrors((prevErrors) => [...prevErrors, error]);
        }
    };

    const stopRecording = async () => {
        try {
            await Voice.stop();
        } catch (error) {
            setErrors((prevErrors) => [...prevErrors, error]);
        }
    };

    return (
        <View style={{ alignItems: 'center', margin: 20 }}>
            <Text style={{ fontSize: 20, color: 'green', fontWeight: '500' }}>
                Voice Input
            </Text>
            {results.map((result, index) => (
                <Text key={index}>{result}</Text>
            ))}
            {errors.map((error, index) => (
                <Text key={index}>{error.message}</Text> // Render each error
            ))}
            <TouchableOpacity style={{ marginTop: 30 }} onPress={isRecording ? stopRecording : startRecording}>
                <Text>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default VoiceInput;
