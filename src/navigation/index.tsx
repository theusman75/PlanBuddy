import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreatePlan } from './screens/CreatePlan';
import { Plan } from './screens/Plan';


const RootStack = createNativeStackNavigator({
  screens: {
    Plan: {
      screen: Plan,
      options: {
        title: 'Plan'
      }
    },
    CreatePlan: {
      screen: CreatePlan,
      options: {
        title: 'Create Plan'
      }
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
