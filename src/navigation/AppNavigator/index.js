import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'

import { DashboardScreen } from "../../screens/Dashboard/index"
import { ActivityScreen } from '../../screens/Activity'
import { LoginScreen } from '../../screens/Login'
import { ProfileScreen } from '../../screens/Profile'
import { SessionScreen } from '../../screens/Session'
import { SettingsScreen } from '../../screens/Settings'
import { StatsScreen } from '../../screens/Stats'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const DashboardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Activity" component={ActivityScreen} />
      <Stack.Screen name="Session" component={SessionScreen} />
    </Stack.Navigator>
  )
}

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  )
}

const ProfileStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Statistics" component={Stats} />
      </Stack.Navigator>
    )
  }

const LoggedInDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="DashboardStack" component={DashboardStack} options={{ title: 'Dashboard' }} />
      <Drawer.Screen name="SettingsStack" component={SettingsStack} options={{ title: 'Settings' }} />
    </Drawer.Navigator>
  )
}

const LoggedOutDrawer = () => {
    return (
        <Drawer.Navigator>
          <Drawer.Screen name="Dashboard" component={DashboardStack} options={{ title: 'Dashboard' }} />
        </Drawer.Navigator>
      )
}


