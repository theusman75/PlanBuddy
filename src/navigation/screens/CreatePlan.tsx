import { Text } from '@react-navigation/elements';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { usePlanStore } from '../../store';


const timeOptions = [
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'week' },
];


export function CreatePlan() {

  const [goal, setGoal] = useState('')
  const [horizon, setHorizon] = useState<'today' | 'week'>('today');

  const { createPlan, loading, error } = usePlanStore();

  const navigation = useNavigation();
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();

  const handleSubmit = async () => {
    if (!goal.trim()) return alert('Please enter your goal');
    await createPlan(goal, horizon);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 10 }]}>
      <View>
        <Text style={styles.label}>Gaol</Text>
        <TextInput
          placeholder='Write your goal here...'
          placeholderTextColor='gray'
          value={goal}
          onChangeText={setGoal}
          style={styles.goalInput}
          editable={!loading}
        />

        <Text style={styles.label}>Time Horizon</Text>
        <Dropdown
          style={styles.dropdown}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={timeOptions}
          maxHeight={300}
          labelField="label"
          valueField="value"
          value={horizon}
          onChange={item => {
            setHorizon(item.value);
          }}
          disable={loading}
        />

        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      <TouchableOpacity
        style={styles.button}
        disabled={loading}
        onPress={handleSubmit}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonTitle}>Create Plan</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const createStyles = ({ colors }: ReactNavigation.Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingBottom: 10
    },
    label: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      marginLeft: '4%',
      marginTop: 32
    },
    goalInput: {
      height: 52,
      marginHorizontal: '4%',
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      marginTop: 10,
      fontSize: 14,
      color: colors.text
    },
    dropdown: {
      height: 52,
      marginHorizontal: '4%',
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      marginTop: 10
    },
    selectedTextStyle: {
      fontSize: 14,
      color: colors.text
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    button: {
      height: 52,
      marginHorizontal: '4%',
      borderRadius: 8,
      backgroundColor: '#007C2B',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#fff'
    },
    error: {
      color: 'red',
      textAlign: 'center',
      marginBottom: 10,
    },
  });
