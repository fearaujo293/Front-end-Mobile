import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert
} from 'react-native';

const ReviewScreen = ({ navigation }) => {
  // Dados mockados - serão substituídos pelo estado global posteriormente
  const appointmentData = {
    pet: {
      name: 'Luna',
      image: 'https://images.unsplash.com/photo-1560809453-57b495cce980?w=100&h=100&fit=crop&crop=face'
    },
    specialty: 'Consulta Geral',
    vet: {
      name: 'Dra. Ana Silva',
      specialty: 'Clínica Geral',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face'
    },
    date: '18/09/2025',
    time: '11:30',
    reason: 'Vacina anual e check-up de rotina',
    observations: ['Vacinação', 'Check-up']
  };

  const handleConfirmAppointment = () => {
    // Simulação de envio para API
    console.log('Dados do agendamento:', {
      petId: '123',
      vetId: '456',
      specialty: appointmentData.specialty,
      date: '2025-09-18',
      time: '11:30',
      reason: appointmentData.reason
    });

    // Simulação de sucesso
    Alert.alert(
      'Sucesso',
      'Consulta agendada com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('SuccessScreen')
        }
      ]
    );

    // Em caso de erro (comentado para referência futura):
    // Alert.alert('Erro', 'Erro ao agendar consulta');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Consultas</Text>
        </View>

        {/* Card de Resumo */}
        <View style={styles.summaryCard}>
          {/* Informações do Pet */}
          <View style={styles.petSection}>
            <Image
              source={{ uri: appointmentData.pet.image }}
              style={styles.petImage}
              resizeMode="cover"
            />
            <View style={styles.petInfo}>
              <Text style={styles.petName}>{appointmentData.pet.name}</Text>
              <Text style={styles.specialty}>{appointmentData.specialty}</Text>
            </View>
          </View>

          {/* Veterinário */}
          <View style={styles.vetSection}>
            <Text style={styles.sectionTitle}>Veterinário</Text>
            <View style={styles.vetInfoRow}>
              <Image
                source={{ uri: appointmentData.vet.image }}
                style={styles.vetImage}
                resizeMode="cover"
              />
              <View style={styles.vetDetails}>
                <Text style={styles.vetName}>{appointmentData.vet.name}</Text>
                <Text style={styles.vetSpecialty}>{appointmentData.vet.specialty}</Text>
              </View>
            </View>
          </View>

          {/* Informações Adicionais */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Informações da Consulta</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Data:</Text>
              <Text style={styles.infoValue}>{appointmentData.date}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Hora:</Text>
              <Text style={styles.infoValue}>{appointmentData.time}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Motivo:</Text>
              <Text style={styles.infoValue}>{appointmentData.reason}</Text>
            </View>
          </View>

          {/* Observações (Chips) */}
          {appointmentData.observations && appointmentData.observations.length > 0 && (
            <View style={styles.observationsSection}>
              <Text style={styles.sectionTitle}>Observações</Text>
              <View style={styles.chipsContainer}>
                {appointmentData.observations.map((obs, index) => (
                  <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{obs}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Botão Concluído */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmAppointment}
        >
          <Text style={styles.confirmButtonText}>Concluído</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6E59D9',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  petSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#6B7280',
  },
  vetSection: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  vetInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vetImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  vetDetails: {
    flex: 1,
  },
  vetName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  vetSpecialty: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  observationsSection: {
    marginBottom: 20,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  chipText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#A367F0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReviewScreen;