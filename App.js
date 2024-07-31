import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, ScrollView, Platform, Dimensions } from 'react-native';

export default function App() {
  const [goals, setGoals] = useState([
    "Faire les courses",
    "Aller à la salle de sport 3 fois par semaine",
    "Monter à plus de 5000m d'altitude",
    "Acheter mon premier appartement",
    "Perdre 5 kgs",
    "Gagner en productivité",
    "Apprendre un nouveau langage",
    "Faire une mission en freelance",
    "Organiser un meetup autour de la tech",
    "Faire un triathlon"
  ]);
  const [inputGoal, setInputGoal] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState(null);

  const addGoalHandler = () => {
    if (goalToEdit !== null) {
      const updatedGoals = goals.map((goal, index) =>
        index === goalToEdit ? inputGoal : goal
      );
      setGoals(updatedGoals);
      setGoalToEdit(null);
    } else {
      setGoals(currentGoals => [...currentGoals, inputGoal]);
    }
    setInputGoal('');
    setIsModalVisible(false);
  };

  const removeGoalHandler = (index) => {
    setGoals(currentGoals => currentGoals.filter((goal, idx) => idx !== index));
  };

  const editGoalHandler = (index) => {
    setInputGoal(goals[index]);
    setGoalToEdit(index);
    setIsModalVisible(true);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Liste objectifs de vie application 1</Text>
        <FlatList
          data={goals}
          renderItem={({ item, index }) => (
            <View style={styles.goalContainer}>
              <Text style={styles.goal}>{item}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => editGoalHandler(index)}>
                  <Text style={styles.editButton}>✎</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeGoalHandler(index)}>
                  <Text style={styles.deleteButton}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Ajouter un objectif" 
            style={styles.input} 
            onChangeText={setInputGoal} 
            value={inputGoal}
          />
          <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{goalToEdit !== null ? "Modifier l'objectif" : "Ajouter un objectif"}</Text>
          <TextInput 
            placeholder="Objectif" 
            style={styles.modalInput} 
            onChangeText={setInputGoal} 
            value={inputGoal}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.addButton} onPress={addGoalHandler}>
              <Text style={styles.addButtonText}>{goalToEdit !== null ? "Update" : "Add"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.addButton, styles.cancelButton]} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.addButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
    color: '#6200ee',
  },
  goalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    width: Dimensions.get('window').width * 0.9,
  },
  goal: {
    fontSize: 18,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  editButton: {
    color: 'blue',
    fontSize: 18,
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 60,
    width: '100%',
  },
  input: {
    width: '70%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'red',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6200ee',
  },
  modalInput: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
