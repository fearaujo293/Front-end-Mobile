import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const ScheduleFormScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    pet: '',
    specialty: '',
    date: new Date(),
    time: new Date(),
    reason: ''
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const pets = [
    { label: 'Selecione um pet', value: '' },
    { label: 'Luna', value: 'luna' },
    { label: 'Thor', value: 'thor' },
    { label: 'Bella', value: 'bella' }
  ];

  const specialties = [
    { label: 'Selecione uma especialidade', value: '' },
    { label: 'Consulta Geral', value: 'consulta_geral' },
    { label: 'Vacinação', value: 'vacinacao' },
    { label: 'Cirurgia', value: 'cirurgia' },
    { label: 'Dermatologia', value: 'dermatologia' },
    { label: 'Oftalmologia', value: 'oftalmologia' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.pet) {
      Alert.alert('Erro', 'Selecione um pet');
      return false;
    }
    if (!formData.specialty) {
      Alert.alert('Erro', 'Selecione uma especialidade');
      return false;
    }
    if (!formData.reason.trim()) {
      Alert.alert('Erro', 'Descreva o motivo da consulta');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      console.log('Dados do formulário:', formData);
      navigation.navigate('SelectVetScreen');
    }
  };

  const formatDate = (date) => date.toLocaleDateString('pt-BR');
  const formatTime = (date) => date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Consultas</Text>
        </View>

        <View style={styles.formContainer}>
          {/* Seletor de Pet */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pet</Text>
            <View style={styles.pickerContainer}>
              {Platform.OS === 'web' ? (
                <select
                  value={formData.pet}
                  onChange={(e) => handleInputChange('pet', e.target.value)}
                  style={styles.webPicker}
                >
                  {pets.map((pet) => (
                    <option key={pet.value} value={pet.value}>{pet.label}</option>
                  ))}
                </select>
              ) : (
                <Picker
                  selectedValue={formData.pet}
                  onValueChange={(value) => handleInputChange('pet', value)}
                  style={styles.picker}
                >
                  {pets.map((pet) => (
                    <Picker.Item key={pet.value} label={pet.label} value={pet.value} />
                  ))}
                </Picker>
              )}
            </View>
          </View>

          {/* Seletor de Especialidade */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Especialidade</Text>
            <View style={styles.pickerContainer}>
              {Platform.OS === 'web' ? (
                <select
                  value={formData.specialty}
                  onChange={(e) => handleInputChange('specialty', e.target.value)}
                  style={styles.webPicker}
                >
                  {specialties.map((specialty) => (
                    <option key={specialty.value} value={specialty.value}>{specialty.label}</option>
                  ))}
                </select>
              ) : (
                <Picker
                  selectedValue={formData.specialty}
                  onValueChange={(value) => handleInputChange('specialty', value)}
                  style={styles.picker}
                >
                  {specialties.map((specialty) => (
                    <Picker.Item key={specialty.value} label={specialty.label} value={specialty.value} />
                  ))}
                </Picker>
              )}
            </View>
          </View>

          {/* Seletor de Data */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Data</Text>
            <TouchableOpacity 
              style={styles.dateTimeButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateTimeText}>{formatDate(formData.date)}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={formData.date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) handleInputChange('date', selectedDate);
                }}
              />
            )}
          </View>

          {/* Seletor de Hora */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Hora</Text>
            <TouchableOpacity 
              style={styles.dateTimeButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.dateTimeText}>{formatTime(formData.time)}</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={formData.time}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (selectedTime) handleInputChange('time', selectedTime);
                }}
              />
            )}
          </View>

          {/* Campo de Motivo */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Motivo da Consulta</Text>
            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={4}
              placeholder="Descreva o motivo da consulta..."
              value={formData.reason}
              onChangeText={(text) => handleInputChange('reason', text)}
            />
          </View>

          {/* Botão Próximo */}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Próximo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollView: { flex: 1, paddingHorizontal: 16 },
  header: { paddingVertical: 20, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#6E59D9' },
  formContainer: { marginTop: 20 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', color: '#4B5563', marginBottom: 8 },
  pickerContainer: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, backgroundColor: '#FFFFFF' },
  picker: { height: 50 },
  dateTimeButton: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 15, backgroundColor: '#FFFFFF' },
  dateTimeText: { fontSize: 16, color: '#4B5563' },
  textInput: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 15, backgroundColor: '#FFFFFF', minHeight: 100, textAlignVertical: 'top' },
  webPicker: { width: '100%', height: 50, border: '1px solid #D1D5DB', borderRadius: 8, padding: '0 15px', backgroundColor: '#FFFFFF', fontSize: 16, color: '#4B5563' },
  nextButton: { backgroundColor: '#A367F0', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  nextButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default ScheduleFormScreen;
