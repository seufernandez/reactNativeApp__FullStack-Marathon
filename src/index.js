import React, { useEffect, useState } from 'react';
import { View, 
        FlatList, 
        SafeAreaView, 
        Text, 
        StyleSheet, 
        StatusBar, 
        TouchableOpacity } from 'react-native'

import api from './services/api'

export default function App(){
    const [ projects, setProjects ] = useState([])
    
    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data)
        });

    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `New Project ${Date.now()}`,
            owner: 'Diego Fernandes'
        })

        const newProject = response.data

        setProjects([...projects, newProject])

    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#010101" />
            <SafeAreaView style={styles.container}>
                <FlatList
                data={projects}
                keyExtractor={project => project.id}
                renderItem={({ item:project })=>(
                    <Text style={styles.projects} key={project.id} >{project.title}</Text>
                )}
                />
                <TouchableOpacity 
                activeOpacity={0.6} 
                style={styles.button} 
                onPress={handleAddProject}
                >
                    <Text style={styles.buttonText} >New Project</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#010101',
    },
    projects:{
        color: 'white',
        fontSize: 32,
    },
    button: {
        backgroundColor:'#FFF',
        margin: 24,
        height:48,
        borderRadius: 4,

        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight:'bold',
    }
});