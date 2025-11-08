import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { usePlanStore } from '../../store';
import { Priority } from '../../store/types';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import { filterTasksByPriority } from '../../utils/taskUtils';


const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];


export function Plan() {

  const { plan, loading, error, toggleTaskCompletion } = usePlanStore();

  const [filter, setFilter] = useState<'all' | Priority>('all');

  const navigation = useNavigation();
  const theme = useTheme();
  const styles = createStyles(theme);

  const filteredTasks = useMemo(() => {
    if (!plan) return [];
    return filterTasksByPriority(plan.tasks, filter);
  }, [plan, filter]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Generating your plan...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!plan) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No plan found</Text>
        <Text
          style={styles.creatPlan}
          onPress={() => navigation.navigate('CreatePlan')}
        >
          Create Plan
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Your Plan</Text>

      <Dropdown
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={filterOptions}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={filter}
        onChange={item => {
          setFilter(item.value);
        }}
        disable={loading}
      />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={filteredTasks.length === 0 ? styles.center : undefined}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks with this priority</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.taskCard, item.completed && styles.taskCardCompleted]}
            onPress={() => toggleTaskCompletion(item.id)}
            activeOpacity={0.8}
          >
            <View style={styles.taskRow}>
              <View style={styles.leftRow}>
                <TouchableOpacity
                  onPress={() => toggleTaskCompletion(item.id)}
                  style={styles.checkboxWrapper}
                >
                  {item.completed ? (
                    <Ionicons name="checkbox-outline" size={24} color="#007AFF" />
                  ) : (
                    <Ionicons name="square-outline" size={24} color="#999" />
                  )}
                </TouchableOpacity>

                <Text
                  style={[
                    styles.taskTitle,
                    item.completed && styles.taskTitleCompleted,
                  ]}
                >
                  {item.emoji ? `${item.emoji} ` : ''}
                  {item.title}
                </Text>
              </View>

              <Text
                style={[
                  styles.priorityBadge,
                  item.priority === 'high'
                    ? styles.priorityHigh
                    : item.priority === 'medium'
                      ? styles.priorityMedium
                      : styles.priorityLow,
                ]}
              >
                {item.priority.toUpperCase()}
              </Text>
            </View>

            <Text style={styles.dueDate}>Due: {item.dueDate}</Text>
            {item.notes ? <Text style={styles.notes}>{item.notes}</Text> : null}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const createStyles = ({ colors }: ReactNavigation.Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 12,
      fontSize: 16,
      color: colors.text,
    },
    errorText: {
      color: 'red',
      fontSize: 16,
    },
    emptyText: {
      color: colors.text,
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
    },
    creatPlan: {
      color: colors.primary,
      fontSize: 16,
      textAlign: 'center',
      marginTop: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    dropdown: {
      height: 52,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      marginVertical: 10
    },
    selectedTextStyle: {
      fontSize: 14,
      color: colors.text
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    taskCard: {
      backgroundColor: colors.card,
      padding: 14,
      borderRadius: 12,
      marginVertical: 6,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    taskCardCompleted: {
      opacity: 0.6,
    },
    leftRow: {
      flex: 1,
      flexDirection: 'row',
    },
    checkboxWrapper: {
      marginRight: 10,
    },
    taskRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10
    },
    taskTitle: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
      flex: 1,
    },
    taskTitleCompleted: {
      textDecorationLine: 'line-through',
      color: colors.text,
    },
    dueDate: {
      fontSize: 13,
      color: colors.text,
      marginTop: 6,
    },
    notes: {
      fontSize: 14,
      color: colors.text,
      marginTop: 4,
    },
    priorityBadge: {
      fontSize: 12,
      fontWeight: '700',
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 8,
      overflow: 'hidden',
      color: '#fff',
      textAlign: 'center',
      minWidth: 70,
    },
    priorityHigh: { backgroundColor: '#e53935' },
    priorityMedium: { backgroundColor: '#fb8c00' },
    priorityLow: { backgroundColor: '#43a047' },
  });
